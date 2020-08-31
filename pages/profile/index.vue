<template>
    <div class="profile-page">
        <div class="user-info">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <img :src="profile.image" class="user-img" />
                        <h4>{{ profile.username }}</h4>
                        <p>{{ profile.bio }}</p>
                        <nuxt-link
                            v-if="auth && profile.username === auth.username"
                            class="btn btn-sm btn-outline-secondary action-btn"
                            to="/settings"
                        >
                            <i class="ion-gear-a"></i>
                            Edit Profile Settings
                        </nuxt-link>
                        <button
                            v-if="auth && profile.username !== auth.username"
                            @click="submitFollowUser"
                            class="btn btn-sm btn-outline-secondary action-btn"
                        >
                            <i class="ion-plus-round"></i>
                            &nbsp; {{ profile.following ? 'Unfollow' : 'Follow' }} {{ profile.username }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-md-10 offset-md-1">
                    <div class="articles-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item">
                                <nuxt-link
                                    class="nav-link"
                                    :class="{ active: tab === 'MyArticles' }"
                                    exact
                                    :to="{
                                        naem: 'profile',
                                        query: {
                                            tab: 'MyArticles'
                                        }
                                    }"
                                >
                                    My Articles
                                </nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link
                                    class="nav-link"
                                    :class="{ active: tab === 'FavoritedArticles' }"
                                    exact
                                    :to="{
                                        naem: 'profile',
                                        query: {
                                            tab: 'FavoritedArticles'
                                        }
                                    }"
                                >
                                    Favorited Articles
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <ArticlePreview
                        @favorited="favorited"
                        :articles="articles"
                        tag=""
                        :tab="tab"
                        :page="page"
                        :articlesCount="articlesCount"
                        :pageLimit="pageLimit"
                    ></ArticlePreview>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { getProfiles, unfollowUser, followUser, getArticlesList } from '../../network/api';
import ArticlePreview from '../../components/articlePreview';
export default {
    middleware: 'authenticated',
    name: 'ProfilePage',
    components: {
        ArticlePreview
    },
    watchQuery: ['tab', 'page'],
    async asyncData({ params, query }) {
        let page = Number.parseInt(query.page || 1);
        let pageLimit = 10;
        let pageOffset = (page - 1) * pageLimit;

        let tab = query.tab || 'MyArticles';
        // console.log(query.tab);
        let articleParams = {
            limit: pageLimit,
            offset: pageOffset
        };
        tab === 'MyArticles' ? (articleParams.author = params.username) : (articleParams.favorited = params.username);
        const [{ profile }, { articles, articlesCount }] = await Promise.all([
            getProfiles({ username: encodeURI(params.username) }),
            getArticlesList(articleParams)
        ]);
        return {
            profile,
            articlesCount,
            pageLimit,
            articles,
            tab,
            page
        };
    },
    computed: {
        ...mapState(['auth'])
    },
    methods: {
        submitFollowUser() {
            const submit = this.profile.following ? unfollowUser : followUser;
            submit({ username: encodeURI(this.$route.params.username) }).then(res => {
                this.profile = res.profile;
            });
        },
        favorited({ article, index }) {
            this.$set(this.articles, index, article);
        }
    }
};
</script>

<style></style>
