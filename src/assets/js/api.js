// 设置axios,process.env值是根据用户是测试还是生产来读取config中的dev.env和pro.env中的配置
import axios from 'axios'
import { Message } from "element-ui";
axios.defaults.baseURL = process.env.API_ROOT
    //axios.defaults.baseURL = "http://192.168.1.128:1030/fjs/";
axios.defaults.headers.common['Authorization'] = process.env.API_TOKEN
    //axios.defaults.headers.common['Authorization'] = 'Bearer c92dcc04-e3c1-4628-899f-f9c26a4f7746'; //process.env.API_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    // 测试
    // let baseURL = "http://192.168.1.124:1030";
axios.interceptors.request.use(function(request) {
    // 判断本地是否有token值，有则从新设置token，没有使用token默认配置
    let moveToken = sessionStorage.getItem('token')
    if (moveToken) {
        request.headers.Authorization = `${moveToken}`
    };
    return request
}, function(error) {
    // 请求错误时做些事
    return Promise.reject(error)
})
export default axios
const getAxios = (method, url, params) => {
    switch (method) {
        case 'get':
            return axios[method](url, { params: params }).catch((error) => {
                if (error.response) {
                    let message = error.response.data.error
                    Message({
                        showClose: true,
                        message,
                        type: "error",
                        duration: 2000
                    });
                    console.log('请求已发出，但服务器响应的状态码不在 2xx 范围内')
                    return error.response
                } else {
                    console.log('Error', error.message)
                }
                console.log(error.config)
            })
        case 'post':
            return axios[method](url, params, { emulateJson: true }).catch((error) => {
                if (error.response) {
                    let message = error.response.data.error
                    Message({
                        showClose: true,
                        message,
                        type: "error",
                        duration: 2000
                    });
                    console.log('请求已发出，但服务器响应的状态码不在 2xx 范围内')
                    return error.response
                } else {
                    console.log('Error', error.message)
                }
                console.log(error.config)
            })
        case 'put':
            return axios[method](url, params, { emulateJson: true }).catch((error) => {
                if (error.response) {
                    return error.response
                } else {
                    console.log('Error', error.message)
                }
                console.log(error.config)
            })
        default:
            return axios[method](url, { params: params }).catch((error) => {
                if (error.response) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    console.log('请求已发出，但服务器响应的状态码不在 2xx 范围内')
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message)
                }
                console.log(error.config)
            })
    }
}

// 后台接口配置
const config = {
    temp: 'http://127.0.0.1:3000'
}

//设置响应数据为文件流
var instance = axios.create({
    responseType: 'blob' //返回数据的格式，可选值为arraybuffer,blob,document,json,text,stream，默认值为json
});

export const instance1 = axios.create({
    responseType: 'blob' //返回数据的格式，可选值为arraybuffer,blob,document,json,text,stream，默认值为json
});


// 首页
export const allBlogs = params => {
    return getAxios('get', '/api/allBlogs', params).then(res => res.data)
}

// 博客详情
export const detailBlog = params => {
    return getAxios('get', '/api/detailBlog', params).then(res => res.data)
}

// 首页轮播图
export const carousel = params => {
    return getAxios('get', '/api/carousel', params).then(res => res.data)
}

// 前端（爬虫）
export const frontEndBlog = params => {
    return getAxios('get', '/api/frontEndBlog', params).then(res => res.data)
}

// 后端（爬虫）
export const backEndBlog = params => {
    return getAxios('get', '/api/backEndBlog', params).then(res => res.data)
}

// 区块链（爬虫）
export const chainBlog = params => {
    return getAxios('get', '/api/chainBlog', params).then(res => res.data)
}

// 活动推荐（爬虫）
export const activities = params => {
    return getAxios('get', '/api/activities', params).then(res => res.data)
}

// 搜索
export const searchKeyword = params => {
    return getAxios('post', '/api/searchKeyword', params).then(res => res.data)
}

// 登录
export const loginC = params => {
    return getAxios('post', '/api/loginC', params).then(res => res.data)
}

// 注册
export const registC = params => {
    return getAxios('post', '/api/registC', params).then(res => res.data)
}

// 用户信息
export const getUserInfoC = params => {
    return getAxios('get', '/api/getUserInfoC', params).then(res => res.data)
}

// 退出
export const logoutC = params => {
    return getAxios('get', '/api/logoutC', params).then(res => res.data)
}

// 添加评论
export const addMark = params => {
    return getAxios('post', '/api/addMark', params).then(res => res.data)
}

// 点赞文章
export const praiseBlog = params => {
    return getAxios('post', '/api/praiseBlog', params).then(res => res.data)
}