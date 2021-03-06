export default {
    router: {
        // base: "/nuxt-realworld",// 生成静态网页时使用
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
    server: {
        "host": "0.0.0.0",
        "port": "8011"
    },
    // 生成静态网页时使用
    generate: {
        dir: 'docs',//nuxt generate 生成的目录名称
        subFolders: false,// 运行nuxt generate将为每个路由创建一个目录并生成index.html文件
        fallback: 'index.html'// 默认是200.html
    },
    components: true,
    plugins: [
        '~/plugins/inits/element-ui.init.js',
        '~/plugins/request.js',
        '~/plugins/dayjs.js'
    ]
};
