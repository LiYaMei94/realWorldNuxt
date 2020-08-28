export default function ({ store, redirect }) {
    // 如果用户已经登录
    if (store.state.auth) {
        return redirect('/')
    }
}
