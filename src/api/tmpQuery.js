import service from '@/utils/request'

export const addTmpQuery = (data) => {
    return service({
        url: "/v1/temQuery/addTmpQuery",
        method: 'post',
        data
    })
}

export const deleteTmpQuery = (data) => {
    return service({
        url: "/v1/temQuery/deleteTmpQuery",
        method: 'post',
        data
    })
}

export const getTmpQueryList = (data) => {
    return service({
        url: "/v1/temQuery/getTmpQueryList",
        method: 'post',
        data
    })
}

export const getTmpQueryById = (params) => {
    return service({
        url: "/v1/temQuery/getTmpQueryById",
        method: 'get',
        params
    })
}
