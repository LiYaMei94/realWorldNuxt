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
                                path: '/editor/:slug',
                                component: resolve(__dirname, '@/pages/article/createArticle')
                            },
                            {
                                name: 'create',
                                path: '/create',
                                component: resolve(__dirname, '@/pages/article/createArticle')
                            },
                            {
                                name: 'article',
                                path: '/article/:slug',
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
    plugins: [
        '~/plugins/inits/element-ui.init.js',
        '~/plugins/request.js',
        '~/plugins/dayjs.js',
        '~/plugins/components-register'
    ]
};
