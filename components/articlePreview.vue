<template>
    <div>
        <!-- 文章列表 -->
        <div class="article-preview" v-for="(item, index) in articles" :key="item.slug">
            <div class="article-meta">
                <nuxt-link
                    :to="{
                        name: 'profile',
                        params: {
                            username: item.author.username
                        }
                    }"
                >
                    <img :src="item.author.image" />
                </nuxt-link>
                <div class="info">
                    <nuxt-link
                        class="author"
                        :to="{
                            name: 'profile',
                            params: {
                                username: item.author.username
                            }
                        }"
                    >
                        {{ item.author.username }}
                    </nuxt-link>
                    <span class="date">{{ item.createdAt | date('MMM DD, YYYY') }}</span>
                </div>
                <button
                    :disabled="item.favoriteDisabled"
                    @click="favorited($event, item, index)"
                    class="btn btn-outline-primary btn-sm pull-xs-right"
                    :class="{ active: item.favorited }"
                >
                    <i class="ion-heart"></i>
                    {{ item.favoritesCount }}
                </button>
            </div>
            <nuxt-link
                class="preview-link"
                :to="{
                    name: 'article',
                    params: {
                        slug: item.slug
                    }
                }"
            >
                <h1>{{ item.title }}</h1>
                <p>{{ item.description }}</p>
                <span>Read more...</span>
                <!-- v-if="auth && item.author.username === auth.username" -->
                <ul class="tag-list">
                    <li v-for="(tag, index) in item.tagList" :key="index" class="tag-default tag-pill tag-outline">
                        {{ tag }}
                    </li>
                </ul>
            </nuxt-link>
        </div>
        <div class="article-preview" v-if="articles.length === 0">No articles are here... yet.</div>
        <!-- 分页 -->
        <el-pagination
            background
            v-if="articlesCount > pageLimit"
            layout="prev, pager, next"
            :total="articlesCount"
            :page-size="pageLimit"
            :current-page="page"
            @prev-click="pageChange"
            @next-click="pageChange"
            @current-change="pageChange"
        ></el-pagination>
    </div>
</template>

<script>
import { favoriteArticle, unfavoriteArticle } from '../network/api';
import { mapState } from 'vuex';
export default {
    name: 'ArticlePreview',
    computed: {
        ...mapState(['auth'])
    },
    props: {
        articles: {
            type: Array,
            required: true,
            default: []
        },
        articlesCount: {
            type: Number,
            required: true,
            default: 0
        },
        pageLimit: {
            type: Number,
            required: true,
            default: 10
        },
        page: {
            type: Number,
            required: true,
            default: 1
        },
        tag: {
            type: String,
            required: true,
            default: ''
        },
        tab: {
            type: String,
            required: true,
            default: ''
        }
    },
    methods: {
        pageChange(page) {
            const query = {
                page: page,
                tab: this.tab
            };
            if (this.tag !== '') {
                query.tag = this.tag;
            }
            this.$router.push({ name: this.$route.name, query: query });
        },
        favorited($event, article, index) {
            article.favoriteDisabled = true;
            const submit = article.favorited ? unfavoriteArticle : favoriteArticle;
            submit({ slug: article.slug }).then(res => {
                // console.log(res);
                article.favoriteDisabled = false;
                this.$emit('favorited', { article: { ...res.article, favoriteDisabled: false }, index: index });
            });
        }
    }
};
</script>

<style></style>
