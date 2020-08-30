<template>
    <div class="article-meta">
        <nuxt-link
            :to="{
                name: 'profile',
                params: {
                    username: article.author.username
                }
            }"
        >
            <img :src="article.author.image" />
        </nuxt-link>
        <div class="info">
            <a href class="author">{{ article.author.username }}</a>
            <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
        </div>
        <template v-if="auth && article.author.username === auth.username">
            <nuxt-link
                class="btn btn-outline-secondary btn-sm"
                :to="{
                    name: 'editor',
                    query: {
                        slug: article.slug
                    }
                }"
            >
                <i class="ion-edit"></i>
                Edit Article
            </nuxt-link>
            &nbsp;&nbsp;
            <button @click="deleteArticle" class="btn btn-outline-danger btn-sm">
                <i class="ion-trash-a"></i>
                Delete Article
            </button>
        </template>
        <template v-else>
            <button @click="submitFollowUser" class="btn btn-sm btn-outline-secondary" :class="{ active: article.author.following }">
                <i class="ion-plus-round"></i>
                &nbsp; Follow Eric Simons
                <span class="counter">(10)</span>
            </button>
            &nbsp;&nbsp;
            <button @click="submitFavoriteArticle" class="btn btn-sm btn-outline-primary" :class="{ active: article.favorited }">
                <i class="ion-heart"></i>
                &nbsp; Favorite Post
                <span class="counter">(29)</span>
            </button>
        </template>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { followUser, unfollowUser, favoriteArticle, unfavoriteArticle, deleteArticle } from '../../../network/api';
export default {
    props: {
        article: {
            type: Object,
            required: true,
            default: {}
        }
    },
    computed: {
        ...mapState(['auth'])
    },
    methods: {
        submitFollowUser() {
            const submit = this.article.author.following ? unfollowUser : followUser;
            submit({ username: this.article.author.username }).then(res => {
                this.$emit('updateArticleDetail', { type: 'following', data: res.profile });
                // console.log(res);
            });
        },
        submitFavoriteArticle() {
            const submit = this.article.favorited ? unfavoriteArticle : favoriteArticle;
            submit({ slug: this.article.slug }).then(res => {
                this.$emit('updateArticleDetail', { type: 'favorited', data: res.article });
                // console.log(res);
            });
        },
        deleteArticle() {
            deleteArticle({ slug: this.article.slug }).then(res => {
                // console.log(res);
                this.$router.push('/');
            });
        }
    }
};
</script>

<style></style>
