import request from "./request";


/**
 * 登录
 * @param {*} options 
 */
export function login(options) {
    return request({
        url: '/api/users/login',
        method: 'POST',
        options
    });
}

/**
 * 注册
 * @param {*} options 
 */
export function register(options) {
    return request({
        url: '/api/users',
        method: 'POST',
        options
    })
}

/**
 * 获取当前用户
 * @param {*} options 
 */
export function getUser(options) {
    return request({
        url: '/api/users',
        method: 'GET',
        options
    })
}

/**
 * 修改当前用户信息
 * @param {*} options 
 */
export function updateUser(options) {
    return request({
        url: '/api/users',
        method: 'PUT',
        options
    })
}


/**
 * 获取用户简介信息
 * @param {*} options 
 */
export function getProfiles(options) {
    return request({
        url: '/api/profiles/:username',
        method: 'GET',
        options
    })
}


/**
 * 
 * @param {*} options 
 */
export function followUser(options) {
    return request({
        url: '/api/profiles/:username/follow',
        method: 'POST',
        options
    })
}


/**
 * 
 * @param {*} options 
 */
export function unfollowUser(options) {
    return request({
        url: '/api/profiles/:username/follow',
        method: 'DELETE',
        options
    })
}


/**
 * 文章列表
 * @param {*} options 
 */
export function getArticlesList(options) {
    // console.log(options)
    return request({
        url: '/api/articles',
        method: 'GET',
        options
    });
}


/**
 * 
 * @param {*} options 
 */
export function articlesFeed(options) {
    return request({
        url: '/api/articles/feed',
        method: 'GET',
        options
    });
}

/**
 * 文章详情
 * @param {*} options 
 */
export function articleDetail(options) {
    return request({
        url: '/api/articles/:slug',
        method: 'GET',
        options
    });
}


/**
 * 创建文章
 * @param {*} options 
 */
export function createArticle(options) {
    return request({
        url: '/api/articles',
        method: 'POST',
        options
    });
}


/**
 * 修改文章
 * @param {*} options 
 */
export function updateArticle(options) {
    return request({
        url: '/api/articles/:slug',
        method: 'PUT',
        options
    });
}


/**
 * 删除文章
 * @param {*} options 
 */
export function deleteArticle(options) {
    return request({
        url: '/api/articles/:slug',
        method: 'DELETE',
        options
    });
}

/**
 * 添加评论
 * @param {*} options 
 */
export function addComments(options) {
    return request({
        url: '/api/articles/:slug/comments',
        method: 'POST',
        options
    });
}


/**
 * 获取一个文章的评论
 * @param {*} options 
 */
export function getComments(options) {
    return request({
        url: '/api/articles/:slug/comments',
        method: 'GET',
        options
    });
}


/**
 * 删除评论
 * @param {*} options 
 */
export function deleteComment(options) {
    return request({
        url: '/api/articles/:slug/comments/:id',
        method: 'DELETE',
        options
    });
}

/**
 * 点赞
 * @param {*} options 
 */
export function favoriteArticle(options) {
    return request({
        url: '/api/articles/:slug/favorite',
        method: 'POST',
        options
    });
}

/**
 * 取消点赞
 * @param {*} options 
 */
export function unfavoriteArticle(options) {
    return request({
        url: '/api/articles/:slug/favorite',
        method: 'DELETE',
        options
    });
}



/**
 * 获取标签
 * @param {*} options 
 */
export function getTags(options) {
    return request({
        url: '/api/tags',
        method: 'GET',
        options
    });
}
