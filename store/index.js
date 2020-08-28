const cookieparser = process.server ? require('cookieparser') : undefined

// 为了防止冲突，把state定义成一个函数，返回对象
export const state = () => {
    return {
        auth: null
    }
}

export const mutations = {
    setAuth(state, auth) {
        state.auth = auth
    }
}

export const actions = {
    // nuxtServerInit：只会在服务端渲染期间自动执行
    // 作用：初始化容器，传递数据给客户端使用
    nuxtServerInit({ commit }, { req }) {
        let auth = null
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                auth = JSON.parse(parsed.auth)
            } catch (err) {
                // No valid cookie found
            }
        }
        // console.log(auth)
        commit('setAuth', auth)
    }
}