<template>
    <div class="profile-page">
        <div class="user-info">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <img :src="profile.image" class="user-img" />
                        <h4>{{ profile.username }}</h4>
                        <p>{{ profile.bio }}</p>
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
                                <a class="nav-link active" href="">My Articles</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="">Favorited Articles</a>
                            </li>
                        </ul>
                    </div>

                    <div class="article-preview">
                        <div class="article-meta">
                            <a href=""><img src="../../static/images/5b201b8dc08efa5ba5ede60e0cf1db1.jpg" /></a>
                            <div class="info">
                                <a href="" class="author">Eric Simons</a>
                                <span class="date">January 20th</span>
                            </div>
                            <button class="btn btn-outline-primary btn-sm pull-xs-right">
                                <i class="ion-heart"></i>
                                29
                            </button>
                        </div>
                        <a href="" class="preview-link">
                            <h1>How to build webapps that scale</h1>
                            <p>This is the description for the post.</p>
                            <span>Read more...</span>
                        </a>
                    </div>

                    <div class="article-preview">
                        <div class="article-meta">
                            <a href=""><img src="../../static/images/d6cc88e96800437b471a6ac930d4580.jpg" /></a>
                            <div class="info">
                                <a href="" class="author">Albert Pai</a>
                                <span class="date">January 20th</span>
                            </div>
                            <button class="btn btn-outline-primary btn-sm pull-xs-right">
                                <i class="ion-heart"></i>
                                32
                            </button>
                        </div>
                        <a href="" class="preview-link">
                            <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
                            <p>This is the description for the post.</p>
                            <span>Read more...</span>
                            <ul class="tag-list">
                                <li class="tag-default tag-pill tag-outline">Music</li>
                                <li class="tag-default tag-pill tag-outline">Song</li>
                            </ul>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { getProfiles, unfollowUser, followUser } from '../../network/api';
export default {
    middleware: 'authenticated',
    name: 'ProfilePage',
    async asyncData({ params }) {
        const { profile } = await getProfiles({ username: params.username });
        return {
            profile
        };
    },
    computed: {
        ...mapState(['auth'])
    },
    methods: {
        submitFollowUser() {
            const submit = this.profile.following ? unfollowUser : followUser;
            submit({ username: this.$route.params.username }).then(res => {
                this.profile = res.profile;
                // this.$emit('updateArticleDetail', { type: 'following', data: res.profile });
                // console.log(res);
            });
        }
    }
};
</script>

<style></style>
