<template>
    <div class="settings-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Your Settings</h1>

                    <form @click.prevent="">
                        <fieldset>
                            <fieldset class="form-group">
                                <input v-model="userInfo.image" class="form-control" type="text" placeholder="URL of profile picture" />
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="userInfo.username" class="form-control form-control-lg" type="text" placeholder="Your Name" />
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea
                                    v-model="userInfo.bio"
                                    class="form-control form-control-lg"
                                    rows="8"
                                    placeholder="Short bio about you"
                                ></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="userInfo.email" class="form-control form-control-lg" type="text" placeholder="Email" />
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="password" class="form-control form-control-lg" type="password" placeholder="New Password" />
                            </fieldset>
                            <button class="btn btn-lg btn-primary pull-xs-right" @click="updateSettings">
                                Update Settings
                            </button>
                        </fieldset>
                    </form>

                    <hr />
                    <button class="btn btn-outline-danger" @click="logout">
                        Or click here to logout.
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined;
import { mapState, mapMutations } from 'vuex';
import { updateUser } from '../../network/api';
export default {
    middleware: 'authenticated',
    name: 'SettingPage',
    computed: {
        ...mapState(['auth']),
        userInfo() {
            let users = {
                bio: this.auth.bio,
                email: this.auth.email,
                image: this.auth.image,
                username: this.auth.username
            };
            if (this.password !== '') {
                users.password = this.password;
            }
            return users;
        }
    },
    data() {
        return {
            password: ''
        };
    },
    methods: {
        ...mapMutations(['setAuth']),
        updateSettings() {
            updateUser({ user: this.userInfo }).then(res => {
                this.setAuth(res.user);
                Cookie.set('auth', res.user); // 服务端使用
                this.$router.push(`/profile/${this.userInfo.username}`);
            });
        },
        logout() {
            // 缓存用户信息
            this.setAuth('');
            Cookie.set('auth', ''); // 服务端使用
            this.$router.push('/login');
        }
    }
};
</script>

<style></style>
