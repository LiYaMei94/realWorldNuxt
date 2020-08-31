# nuxt-realworld

`nuxt` 实现同构渲染

### realWorld 案例

1. 案例文档地址

    - [realworld 的 api 文档](https://github.com/gothinkster/realworld/tree/master/api)

    - [realworld 的页面模板文档](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md)

1. [realWorld 在线预览：http://yamei94.gitee.io/nuxt-realworld](http://yamei94.gitee.io/nuxt-realworld)

#### 初始化项目

1. 新建`package.json`文件：`yarn init --yes`
2. 配置`package.json`文件：

    ```json
    "scripts": {
        "dev": "nuxt"
     }
    ```

3. 安装`nuxt`：`yarn add nuxt --save`
4. 新建`pages`文件夹

#### 导入项目资源和页面

1. 自定义`html`模板

    - 在项目根目录下新建`app.html`，内容如下所示：

    - 使用`CDN`工具[jsdelivr](https://www.jsdelivr.com/)把国外库的链接换成国内的

    ```html
    <!DOCTYPE html>
    <html {{ HTML_ATTRS }}>
        <head {{ HEAD_ATTRS }}>
            {{ HEAD }}
            <link href="https://cdn.jsdelivr.net/npm/ionicons@2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css" />
            <link
                href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Sour ce+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
                rel="stylesheet"
                type="text/css"
            />
            <link rel="stylesheet" href="/main.css" />
        </head>

        <body {{ BODY_ATTRS }}>
            {{ APP }}
        </body>
    </html>
    ```

1. 把页面放入`pages`文件夹中

#### 配置路由

1. 自定义路由，新建`nuxt.config.js`文件

    - [extendRoutes](https://zh.nuxtjs.org/guides/configuration-glossary/configuration-router/#extendroutes)

    - 路由配置

        ```js
        export default {
            router: {
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
                                        name: '',
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
                                        path: '/editor/:id',
                                        component: resolve(__dirname, '@/pages/article/createArticle')
                                    },
                                    {
                                        name: 'create',
                                        path: '/create',
                                        component: resolve(__dirname, '@/pages/article/createArticle')
                                    },
                                    {
                                        name: 'article',
                                        path: '/article/:id',
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
            }
        };
        ```

#### 设置页面路由跳转

-   处理顶部导航链接
-   把`a`标签换成`nuxt-link`，并设置路由地址
-   设置高亮

#### 缓存用户信息

-   `Nuxt.js`通过外部`API`服务[jsonwebtoken](https://zh.nuxtjs.org/examples/auth-external-jwt/)进行身份验证
-   安装插件：

    -   [`js-cookie`](https://github.com/js-cookie/js-cookie)：操作浏览器端的`cookie`

    -   [`cookieparser`](https://github.com/expressjs/cookie-parser)：解析服务端返回的`cookie`

    ```
    yarn add js-cookie --save
    yarn add cookieparser --save
    ```

-   `js-cookie`设置客户端`cookie`，并存储在`vuex`中

    ![客户端存储`cookie`](https://img-blog.csdnimg.cn/20200827110623848.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODIzMzU0OQ==,size_16,color_FFFFFF,t_70#pic_center)

-   `cookieparser`解析服务端返回的`cookie`

    ![`cookie-parser`解析服务端返回的`cookie`](https://img-blog.csdnimg.cn/20200827110736949.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODIzMzU0OQ==,size_16,color_FFFFFF,t_70#pic_center)

#### 其他

-   使用[路由中间件：middleware](https://zh.nuxtjs.org/guide/routing/#%E4%B8%AD%E9%97%B4%E4%BB%B6)设置页面访问权限

-   使用[插件](https://www.nuxtjs.cn/guide/plugins)可以统一设置`token`、过滤器，以及按需引入第三方组件库

-   使用`dayjs`处理时间格式

-   使用[markdown-it](https://github.com/markdown-it/markdown-it)把`Markdown`转换成`html`

-   使用`components`，在`nuxt.config.js`文件中设置`components`为`true`

-   在`nuxt.config.js`文件中设置 `generate`，自定义`nuxt generate`命令生成的静态页面的位置
-   设置基本路由

    ```
    router: {
        base: "/nuxt-realworld",// 生成静态网页时使用，不然部署在web服务器上引入的资源地址不准确
    }
    ```

-   `generate`设置

    ```
    generate: {
        dir: 'docs',//nuxt generate 生成的目录名称
        subFolders: false,// 运行nuxt generate将为每个路由创建一个目录并生成index.html文件
        fallback: 'index.html'// 默认是200.html
    },
    ```

-   使用`nuxt generate`之前先把之前生成的`.nuxt`文件夹删除

-   `nuxt`[发布或部署命令](https://www.nuxtjs.cn/guide/commands)
    ![`nuxt`发布或部署命令](https://img-blog.csdnimg.cn/20200831183218835.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODIzMzU0OQ==,size_16,color_FFFFFF,t_70#pic_center)

#### 部署到码云

-   新建`nuxt-realworld`仓库

-   使用`nuxt generate`命令生成的静态页面

-   把代码上传到远程仓库

-   使用`gitee pages`

    ![`gitee pages`](https://img-blog.csdnimg.cn/20200831183148477.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODIzMzU0OQ==,size_16,color_FFFFFF,t_70#pic_center)

-   部署成功

    ![部署成功](https://img-blog.csdnimg.cn/20200831183105675.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODIzMzU0OQ==,size_16,color_FFFFFF,t_70#pic_center)
