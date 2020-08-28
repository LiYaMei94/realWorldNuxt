// 在路由匹配组件渲染之前会执行中间件
// 中间件接收 context 作为第一个参数
export default function ({ store, redirect }) {
    // 如果用户未登录就跳转登录
    if (!store.state.auth) {
        return redirect('/login')
    }
}
