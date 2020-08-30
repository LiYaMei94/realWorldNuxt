<template>
    <div class="article-page">
        <div class="banner">
            <div class="container">
                <h1>{{ article.title }}</h1>

                <ArticleMeta :article="article" @updateArticleDetail="updateArticle"></ArticleMeta>
            </div>
        </div>

        <div class="container page">
            <div class="row article-content">
                <div class="col-md-12" v-html="article.body"></div>
            </div>

            <hr />

            <ArticleMeta :article="article" @updateArticleDetail="updateArticle"></ArticleMeta>
            <hr />
            <div class="row">
                <div class="col-xs-12 col-md-8 offset-md-2">
                    <form class="card comment-form" @click.prevent="">
                        <div class="card-block">
                            <textarea class="form-control" v-model="myCommentStr" placeholder="Write a comment..." rows="3"></textarea>
                        </div>
                        <div class="card-footer">
                            <img :src="article.author.image" class="comment-author-img" />
                            <button class="btn btn-sm btn-primary" @click="addCommentSubmit">
                                Post Comment
                            </button>
                        </div>
                    </form>

                    <div class="card" v-for="item in comments" :key="item.id">
                        <div class="card-block">
                            <p class="card-text">{{ item.body }}</p>
                        </div>
                        <div class="card-footer">
                            <nuxt-link
                                class="comment-author"
                                :to="{
                                    name: 'profile',
                                    params: {
                                        username: item.author.username
                                    }
                                }"
                            >
                                <img class="comment-author-img" :src="item.author.image" />
                            </nuxt-link>
                            &nbsp;
                            <a href="" class="comment-author">{{ item.author.username }}</a>
                            <span class="date-posted">{{ item.createdAt | date('MMM DD, YYYY') }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { articleDetail, getComments, addComments } from '../../network/api';
import ArticleMeta from './components/articleMeta';
import markdownIt from 'markdown-it';
export default {
    middleware: 'authenticated',
    components: {
        ArticleMeta
    },
    name: 'ArticleIndex',
    computed: {
        ...mapState(['auth'])
    },
    async asyncData({ query }) {
        const [{ article }, { comments }] = await Promise.all([articleDetail({ slug: query.slug }), getComments({ slug: query.slug })]);
        // console.log(comments);
        // console.log(article);
        const md = new markdownIt();
        article.body = md.render(article.body);
        return {
            article,
            comments
        };
    },
    data() {
        return {
            myCommentStr: ''
        };
    },
    methods: {
        addCommentSubmit() {
            addComments({ slug: this.article.slug, body: this.myCommentStr }).then(res => {
                this.comments.unshift(res.comment);
                console.log(res);
            });
        },
        updateArticle(data) {
            data.type === 'favorited' ? (this.article = data.data) : (this.article.author = data.data);
        }
    },
    head() {
        return {
            title: this.article.title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: `${this.article.description} - RealWorld`
                }
            ]
        };
    }
};
</script>

<style></style>
