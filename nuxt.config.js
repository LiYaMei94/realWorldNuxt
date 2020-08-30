export default {
    router: {
        linkActiveClass: 'active', // 将nuxt-link-active替换为active
        extendRoutes(routes, resolve) {
            // 清除默认路由
            routes.splice(0);
            routes.push(
                ...[
                    {
                        name: '',
                        path: '/',
                        component: resolve(__dirname, '@/pages/layout/'),
                        children: [
                            {
                                name: 'home',
                                path: '',
                                component: resolve(__dirname, '@/pages/home/')
                            },
                            {
                                name: 'login',
                                path: '/login',
                                component: resolve(__dirname, '@/pages/login/')
                            },
                            {
                                name: 'register',
                                path: '/register',
                                component: resolve(__dirname, '@/pages/login/')
                            },
                            {
                                name: 'settings',
                                path: '/settings',
                                component: resolve(__dirname, '@/pages/settings/')
                            },
                            {
                                name: 'editor',
                                path: '/editor',
                                component: resolve(__dirname, '@/pages/article/createArticle')
                            },
                            {
                                name: 'create',
                                path: '/create',
                                component: resolve(__dirname, '@/pages/article/createArticle')
                            },
                            {
                                name: 'article',
                                path: '/article/',
                                component: resolve(__dirname, '@/pages/article/')
                            },
                            {
                                name: 'profile',
                                path: '/profile/:username',
                                component: resolve(__dirname, '@/pages/profile/')
                            }
                        ]
                    }
                ]
            );
        }
    },
    //处理跨域问题
    // modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],
    // axios: {
    //     //开发模式下开启debug
    //     debug: process.env._ENV == "production" ? false : true,
    //     //设置不同环境的请求地址
    //     baseURL:
    //         process.env._ENV == "production"
    //             ? "http://localhost:3000/api"
    //             : "http://localhost:3000/api",
    //     withCredentials: true,
    // },
    // proxy: {
    //     //开启代理
    //     "/api/": {
    //         target: "http://realworld.api.fed.lagounews.com/",
    //         pathRewrite: { "^/api/": "" }
    //     }
    // },
    plugins: ['~/plugins/inits/element-ui.init.js', '~/plugins/request.js', '~/plugins/dayjs.js']
};
