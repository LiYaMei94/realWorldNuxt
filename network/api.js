import { request } from '../plugins/request';

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
    });
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
    });
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
    });
}

/**
 * 获取用户简介信息
 * @param {*} options
 */
export function getProfiles(options) {
    return request({
        url: `/api/profiles/${options.username}`,
        method: 'GET',
        options
    });
}

/**
 * 关注作者
 * @param {*} options
 */
export function followUser(options) {
    return request({
        url: `/api/profiles/${options.username}/follow`,
        method: 'POST'
    });
}

/**
 * 取消关注
 * @param {*} options
 */
export function unfollowUser(options) {
    return request({
        url: `/api/profiles/${options.username}/follow`,
        method: 'DELETE'
    });
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
 * 用户喜欢的文章列表
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
        url: `/api/articles/${options.slug}`,
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
        url: `/api/articles/${options.slug}`,
        method: 'PUT',
        options: {
            article: options.article
        }
    });
}

/**
 * 删除文章
 * @param {*} options
 */
export function deleteArticle(options) {
    return request({
        url: `/api/articles/${options.slug}`,
        method: 'DELETE'
    });
}

/**
 * 添加评论
 * @param {*} options
 */
export function addComments(options) {
    return request({
        url: `/api/articles/${options.slug}/comments`,
        method: 'POST',
        options: {
            comment: {
                body: options.body
            }
        }
    });
}

/**
 * 获取一个文章的评论
 * @param {*} options
 */
export function getComments(options) {
    return request({
        url: `/api/articles/${options.slug}/comments`,
        method: 'GET'
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
        url: `/api/articles/${options.slug}/favorite`,
        method: 'POST'
    });
}

/**
 * 取消点赞
 * @param {*} options
 */
export function unfavoriteArticle(options) {
    return request({
        url: `/api/articles/${options.slug}/favorite`,
        method: 'DELETE'
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
