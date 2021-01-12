import axios from 'axios'; // 引入axios
import { Message } from 'element-ui';
import { store } from '@/store/index'
import context from '@/main.js'
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 99999
})
let acitveAxios = 0
let timer
const showLoading = () => {
    acitveAxios++
    if (timer) {
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        if (acitveAxios > 0) {
            context.$bus.emit("showLoading")
        }
    }, 400);
}

const closeLoading = () => {
        acitveAxios--
        if (acitveAxios <= 0) {
            clearTimeout(timer)
            context.$bus.emit("closeLoading")
        }
    }
    //http request 拦截器
service.interceptors.request.use(
    config => {
        if (!config.donNotShowLoading) {
            showLoading()
        }
        const token = store.getters['user/token']
        const user = store.getters['user/userInfo']
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/json',
            'Authorization': token,
            'x-user-id': user.id
        }
        return config;
    },
    error => {
        closeLoading()
        Message({
            showClose: true,
            message: error,
            type: 'error'
        })
        return error;
    }
);


//http response 拦截器
service.interceptors.response.use(
    response => {
        closeLoading()
        if (response.headers["new-token"]) {
            store.commit('user/setToken', response.headers["new-token"])
        }
        if (response.data.code === 1000) {
            return response.data
        } else {
            Message({
                showClose: true,
                message: response.data.msg,
                type: response.headers.msgtype||'error',
            })
            if (response.data.data && response.data.data.reload) {
                store.commit('user/LoginOut')
            }
            return response.data.msg ? response.data : response
        }
    },
    error => {
        closeLoading()
        if (error && error.response && error.response.status === 401) {
            // Message({
            //     showClose: true,
            //     message: error,
            //     type: 'error'
            // })
            store.commit('user/LoginOut')
        }
        return Promise.reject(error)
    }
)

export default service
