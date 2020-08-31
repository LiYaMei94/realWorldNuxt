<template>
    <div class="header">
        <nav class="navbar navbar-light">
            <div class="container">
                <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
                <ul class="nav navbar-nav pull-xs-right">
                    <li class="nav-item">
                        <!-- 使用exact严格匹配 -->
                        <nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
                    </li>

                    <template v-if="auth">
                        <li class="nav-item">
                            <nuxt-link class="nav-link" :class="{ active: $route.query.slug && $route.name === 'editor' }" to="/create">
                                <i class="ion-compose"></i>
                                &nbsp;New Article
                            </nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/settings">
                                <i class="ion-gear-a"></i>
                                &nbsp;Settings
                            </nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link
                                class="nav-link"
                                :to="{
                                    name: 'profile',
                                    params: {
                                        username: auth.username
                                    }
                                }"
                            >
                                <img v-show="auth.image" class="user-pic" :src="auth.image" />
                                {{ auth.username }}
                            </nuxt-link>
                        </li>
                    </template>

                    <template v-else>
                        <li class="nav-item" v-show="!auth">
                            <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
                        </li>
                        <li class="nav-item" v-show="!auth">
                            <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
                        </li>
                    </template>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'LayoutHeader',
    computed: {
        ...mapState(['auth'])
    },
    created() {}
};
</script>

<style></style>
