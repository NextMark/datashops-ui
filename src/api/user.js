import service from '@/utils/request'

export const login = (data) => {
    return service({
        url: "/v1/user/login",
        method: 'post',
        data: data
    })
}

export const register = (data) => {
    return service({
        url: "/v1/user/register",
        method: 'post',
        data: data
    })
}

export const changePassword = (data) => {
    return service({
        url: "/user/changePassword",
        method: 'post',
        data: data
    })
}

export const getUserList = (data) => {
    return service({
        url: "/v1/user/getUserList",
        method: 'post',
        data: data
    })
}


export const changeRole = (data) => {
    return service({
        url: "/v1/role/changeRole",
        method: 'post',
        data: data
    })
}


export const deleteUser = (data) => {
    return service({
        url: "/v1/user/delete",
        method: 'delete',
        data: data
    })
}

export const setUserInfo = (data) => {
    return service({
        url: "/user/setUserInfo",
        method: 'put',
        data: data
    })
}
