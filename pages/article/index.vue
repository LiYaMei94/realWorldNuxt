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
            <ul class="tag-list" v-if="article.tagList.length !== 0">
                <li v-for="(item, index) in article.tagList" :key="index" class="tag-default tag-pill tag-outline">
                    {{ item }}
                </li>
            </ul>
            <hr />
            <div class="article-actions">
                <ArticleMeta :article="article" @updateArticleDetail="updateArticle"></ArticleMeta>
            </div>

            <div class="row" v-if="!auth">
                <div class="col-xs-12 col-md-8 offset-md-2">
                    <nuxt-link to="/login">Sign in</nuxt-link>
                    or
                    <nuxt-link to="/register">sign up</nuxt-link>
                    to add comments on this article.
                </div>
            </div>

            <template v-else>
                <hr />
                <div class="row">
                    <div class="col-xs-12 col-md-8 offset-md-2">
                        <form class="card comment-form" @click.prevent="">
                            <div class="card-block">
                                <textarea class="form-control" v-model="myCommentStr" placeholder="Write a comment..." rows="3"></textarea>
                            </div>
                            <div class="card-footer">
                                <img :src="auth.image" class="comment-author-img" />
                                <button class="btn btn-sm btn-primary" @click="addCommentSubmit">
                                    Post Comment
                                </button>
                            </div>
                        </form>

                        <div class="card" v-for="(item, index) in comments" :key="item.id">
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
                                <span class="mod-options" v-if="auth && item.author.username === auth.username">
                                    <i class="ion-trash-a" @click="deleteCb(item, index)"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { articleDetail, getComments, addComments, deleteComment } from '../../network/api';
import ArticleMeta from './components/articleMeta';
import markdownIt from 'markdown-it';
export default {
    components: {
        ArticleMeta
    },
    name: 'ArticleIndex',
    computed: {
        ...mapState(['auth'])
    },
    async asyncData({ params }) {
        const [{ article }, { comments }] = await Promise.all([articleDetail({ slug: params.slug }), getComments({ slug: params.slug })]);
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
        },
        deleteCb(item, index) {
            deleteComment({ slug: this.article.slug, id: item.id }).then(res => {
                console.log(res);
                this.comments.splice(index, 1);
            });
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
