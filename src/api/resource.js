import service from '@/utils/request'

export const addProject = (data) => {
    return service({
        url: "/v1/resource/addProject",
        method: 'post',
        data
    })
}

export const deleteProject = (data) => {
    return service({
        url: "/v1/resource/deleteProject",
        method: 'post',
        data
    })
}

export const getProjectList = (data) => {
    return service({
        url: "/v1/resource/getProjectList",
        method: 'post',
        data
    })
}

export const addQueue = (data) => {
    return service({
        url: "/v1/resource/addQueue",
        method: 'post',
        data
    })
}

export const deleteQueue = (data) => {
    return service({
        url: "/v1/resource/deleteQueue",
        method: 'post',
        data
    })
}

export const getQueueList = (data) => {
    return service({
        url: "/v1/resource/getQueueList",
        method: 'post',
        data
    })
}

export const addDataSource = (data) => {
    return service({
        url: "/v1/resource/addDataSource",
        method: 'post',
        data
    })
}

export const deleteDataSource = (data) => {
    return service({
        url: "/v1/resource/deleteDataSource",
        method: 'post',
        data
    })
}

export const getDataSourceList = (data) => {
    return service({
        url: "/v1/resource/getDataSourceList",
        method: 'post',
        data
    })
}
