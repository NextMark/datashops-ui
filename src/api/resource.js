import service from '@/utils/request'

export const addProject = (data) => {
    return service({
        url: "/v1/project/addProject",
        method: 'post',
        data
    })
}

export const deleteProject = (data) => {
    return service({
        url: "/v1/project/deleteProject",
        method: 'post',
        data
    })
}

export const getProjectList = (data) => {
    return service({
        url: "/v1/project/getProjectList",
        method: 'post',
        data
    })
}

export const addQueue = (data) => {
    return service({
        url: "/v1/project/addQueue",
        method: 'post',
        data
    })
}

export const deleteQueue = (data) => {
    return service({
        url: "/v1/project/deleteQueue",
        method: 'post',
        data
    })
}

export const getQueueList = (data) => {
    return service({
        url: "/v1/project/getQueueList",
        method: 'post',
        data
    })
}

export const addDataSource = (data) => {
    return service({
        url: "/v1/project/addDataSource",
        method: 'post',
        data
    })
}

export const deleteDataSource = (data) => {
    return service({
        url: "/v1/project/deleteDataSource",
        method: 'post',
        data
    })
}

export const getDataSourceList = (data) => {
    return service({
        url: "/v1/project/getDataSourceList",
        method: 'post',
        data
    })
}

export const getMasterList = (data) => {
    return service({
        url: "/v1/project/getMasterList",
        method: 'post',
        data
    })
}

export const getWorkerList = (data) => {
    return service({
        url: "/v1/project/getWorkerList",
        method: 'post',
        data
    })
}
