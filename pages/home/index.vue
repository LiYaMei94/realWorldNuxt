<template>
    <div class="home-page">
        <div class="banner">
            <div class="container">
                <h1 class="logo-font">conduit</h1>
                <p>A place to share your knowledge.</p>
            </div>
        </div>

        <div class="container page">
            <div class="row">
                <div class="col-md-9">
                    <div class="feed-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item" v-if="auth">
                                <nuxt-link
                                    class="nav-link"
                                    :class="{ active: tab === 'Your_Feed' }"
                                    exact
                                    :to="{
                                        name: 'home',
                                        query: {
                                            tab: 'Your_Feed'
                                        }
                                    }"
                                >
                                    Your Feed
                                </nuxt-link>
                                <!-- <a :class="{ 'nav-link': true, disabled: auth }" href="">Your Feed</a> -->
                            </li>
                            <li class="nav-item">
                                <nuxt-link
                                    class="nav-link"
                                    :class="{ active: tab === 'Global_Feed' }"
                                    exact
                                    :to="{
                                        name: 'home',
                                        query: {
                                            tab: 'Global_Feed'
                                        }
                                    }"
                                >
                                    Global Feed
                                </nuxt-link>
                            </li>
                            <li class="nav-item" v-if="tab === 'tag'">
                                <nuxt-link
                                    class="nav-link"
                                    :class="{ active: tab === 'tag' }"
                                    exact
                                    :to="{
                                        name: 'home',
                                        query: {
                                            tab: tab
                                        }
                                    }"
                                >
                                    # {{ tag }}
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <!-- 文章列表 -->
                    <div class="article-preview" v-for="item in articles" :key="item.slug">
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
                                <span class="date">{{ item.createdAt }}</span>
                            </div>
                            <button
                                :disabled="item.favoriteDisabled"
                                @click="favorited($event, item)"
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
                        </nuxt-link>
                    </div>

                    <!-- 分页 -->
                    <el-pagination
                        background
                        v-if="articlesCount > pageLimit"
                        layout="sizes,prev, pager, next"
                        :total="articlesCount"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageLimit"
                        @prev-click="pageChange"
                        @next-click="pageChange"
                        @current-change="pageChange"
                        @size-change="sizeChange"
                    ></el-pagination>
                </div>

                <div class="col-md-3">
                    <div class="sidebar">
                        <p>Popular Tags</p>

                        <div class="tag-list">
                            <nuxt-link
                                v-for="(item, index) in tags"
                                :key="index"
                                class="tag-pill tag-default"
                                :to="{
                                    name: 'home',
                                    query: {
                                        tag: item,
                                        tab: 'tag'
                                    }
                                }"
                            >
                                {{ item }}
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getTags, getArticlesList, articlesFeed, favoriteArticle, unfavoriteArticle } from '../../network/api';
import { mapState } from 'vuex';
import axios from 'axios';
export default {
    name: 'HomeIndex',
    // 使用watchQuery属性可以监听参数字符串的更改。 如果定义的字符串发生变化，将调用所有组件方法(asyncData, fetch, validate, layout, ...)
    watchQuery: ['page', 'tag', 'tab', 'pageLimit'],
    async asyncData({ query }) {
        let page = Number.parseInt(query.page || 1);
        let pageLimit = 20;
        let pageOffset = (page - 1) * pageLimit;
        const tab = query.tab || 'Global_Feed';
        const tag = query.tag || '';
        let params = {
            limit: pageLimit,
            offset: pageOffset
        };
        if (tag !== '') {
            params.tag = tag;
        }
        const getArticles = tab === 'Your_Feed' ? articlesFeed : getArticlesList;
        const [{ articles, articlesCount }, { tags }] = await Promise.all([getArticles(params), getTags()]);
        // 设置点赞按钮是否禁用
        articles.forEach(item => (item.favoriteDisabled = false));
        return { articles, articlesCount, tags, pageLimit, pageOffset, tab, tag };
    },
    data() {
        return {};
    },
    computed: {
        ...mapState(['auth'])
    },
    mounted() {},
    methods: {
        pageChange(page) {
            const query = {
                page: page,
                tab: this.tab
            };
            if (this.tag !== '') {
                query.tag = this.tag;
            }
            this.$router.push({ name: 'home', query: query });
        },
        sizeChange(size) {
            this.pageLimit = size;
        },
        favorited($event, article) {
            article.favoriteDisabled = true;
            const submit = article.favorited ? unfavoriteArticle : favoriteArticle;
            submit({ slug: article.slug }).then(res => {
                console.log(res);
                article.favoriteDisabled = false;
            });
            console.log(article);
        }
    }
};
</script>

<style>
.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #5cb85c;
    border-color: #5cb85c;
}
.el-select-dropdown__item.selected {
    color: #5cb85c;
}
</style>
