import axios from 'axios';

const Axios = axios.create({
    // baseURL: 'http://realworld.api.fed.lagounews.com',
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://conduit.productionready.io'
});

// 插件的导出必须使用默认导出
export default ({ store }) => {
    // 请求拦截器
    Axios.interceptors.request.use(
        config => {
            // 设置token
            const { auth } = store.state;
            if (auth && auth.token) {
                config.headers.Authorization = `Token ${auth.token}`;
            }

            return config;
        },
        error => {
            // console.log('错误的传参')
            return Promise.reject(error);
        }
    );

    // 响应拦截器
    Axios.interceptors.response.use(
        res => {
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
        },
        err => {
            // console.log(err)
            return Promise.reject(err);
        }
    );
};

export function request({ url, method, options }) {
    // console.log(url);
    // console.log(method);
    // console.log(options);
    const methodStr = ['POST', 'PUT'];
    let newOptions = {
        url: url,
        method: method,
        data: options,
        params: methodStr.indexOf(method) === -1 ? options : {}
    };
    return new Promise((resolve, reject) => {
        Axios(newOptions)
            .then(
                response => {
                    resolve(response);
                },
                err => {
                    reject(err);
                }
            )
            .catch(error => {
                reject(error);
            });
    });
}

// export default request
