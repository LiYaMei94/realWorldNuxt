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
                    <ArticlePreview
                        @favorited="favorited"
                        :articles="articles"
                        :articlesCount="articlesCount"
                        :pageLimit="pageLimit"
                        :tag="tag"
                        :tab="tab"
                        :page="page"
                    ></ArticlePreview>
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
// import ArticlePreview from '../../components/articlePreview';
export default {
    name: 'HomeIndex',
    components: {
        // ArticlePreview
    },
    // 使用watchQuery属性可以监听参数字符串的更改。 如果定义的字符串发生变化，将调用所有组件方法(asyncData, fetch, validate, layout, ...)
    watchQuery: ['page', 'tag', 'tab', 'pageLimit'],
    async asyncData({ query }) {
        let page = Number.parseInt(query.page || 1);
        let pageLimit = 10;
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
        return { articles, articlesCount, tags, pageLimit, pageOffset, tab, tag, page };
    },
    data() {
        return {};
    },
    computed: {
        ...mapState(['auth'])
    },
    mounted() {},
    methods: {
        favorited({ article, index }) {
            this.$set(this.articles, index, article);
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
