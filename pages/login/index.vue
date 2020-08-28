<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
                    <p class="text-xs-center">
                        <nuxt-link :to="isLogin ? '/register' : '/login'">{{ isLogin ? 'Need an account?' : 'Have an account?' }}</nuxt-link>
                    </p>

                    <ul class="error-messages">
                        <template v-for="(errs, key) in error">
                            <li v-for="(item, index) in errs" :key="index">{{ key }} {{ item }}</li>
                        </template>
                    </ul>

                    <form @submit.prevent="submit" ref="form">
                        <fieldset class="form-group" v-if="!isLogin">
                            <input v-model="user.username" required class="form-control form-control-lg" type="text" placeholder="Your Name" />
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="user.email" required class="form-control form-control-lg" type="email" placeholder="Email" />
                        </fieldset>
                        <fieldset class="form-group">
                            <input
                                v-model="user.password"
                                required
                                minlength="8"
                                class="form-control form-control-lg"
                                type="password"
                                placeholder="Password"
                            />
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right" @click="submit">
                            {{ isLogin ? 'Sign in' : 'Sign up' }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined;
import { login, register } from '../../network/api';
export default {
    // 如果已经登录在其他页面不能访问登录和注册页面
    middleware: 'notAuthenticated',
    name: 'Login',
    data() {
        return {
            user: {
                username: '',
                email: '',
                password: ''
            },
            error: {}
        };
    },
    watch: {
        // 路由变化错误信息清空
        $route(to, from) {
            this.error = {};
        }
    },
    computed: {
        isLogin() {
            return this.$route.name === 'login';
        },
        // 判断是否执行网络请求
        isSubmit() {
            return (
                (this.user.email !== '' && this.user.password !== '') ||
                (this.user.username !== '' && this.user.password !== '' && this.user.email !== '')
            );
        }
    },
    methods: {
        async submit() {
            let errStr = '';
            let data = null;
            try {
                if (this.isLogin && this.isSubmit) {
                    data = await login({ user: { email: this.user.email, password: this.user.password } });
                } else if (!this.isLogin && this.isSubmit) {
                    data = await register({ user: this.user });
                } else {
                    errStr = this.isLogin ? 'email or password' : 'email or password or username';
                    this.error = { [errStr]: ['is invalid'] };
                }
                // console.log(data);
                // 缓存用户信息
                this.$store.commit('setAuth', data.user); // 客户端使用
                Cookie.set('auth', data.user); // 服务端使用

                this.$router.push('/');
            } catch (err) {
                this.error = err.response.data.errors;
                // console.dir(err);
            }
        }
    }
};
</script>

<style></style>
