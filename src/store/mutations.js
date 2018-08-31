export default {
    // 设置关键字
    setKeyword(state, data) {
        state.keyword = data
    },
    // 设置登录弹框显示隐藏
    setLoginDialog(state, data) {
        state.loginDialogVisible = data
    },
    // 设置注册弹框显示隐藏
    setRegistDialog(state, data) {
        state.registDialogVisible = data
    },
    // 设置用户名
    setUserName(state, data) {
        state.userName = data
    },
    // 设置账户
    setAccount(state, data) {
        state.account = data
    }
}