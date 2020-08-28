import axios from 'axios'

const Axios = axios.create({
    baseURL: 'http://realworld.api.fed.lagounews.com/'
})

// 请求拦截器
Axios.interceptors.request.use((config) => {
    // console.log(config)
    // 除了登录之外都需要token
    if (config.url !== '/api/users/login') {
    }

    return config;
}, (error) => {
    // console.log('错误的传参')
    return Promise.reject(error);
});


// 响应拦截器
Axios.interceptors.response.use((res) => {
    // 对响应数据做些事
    if (res) {
        // console.log(res)
        if (res.status === 200) {
            return Promise.resolve(res.data);
        } else {
            return Promise.reject(res.statusText);
        }
    }
    return res;
}, (err) => {
    // console.log(err)
    return Promise.reject(err);
});


function request({ url, method, options }) {
    // console.log(url)
    // console.log(method)
    // console.log(options)
    return new Promise((resolve, reject) => {
        Axios({
            url: url,
            method: method,
            params: method !== 'POST' ? options : {},
            data: options
        })
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })

}

export default request