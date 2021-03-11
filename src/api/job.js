import service from '@/utils/request'

export const modifyJobGraph = (data) => {
    return service({
        url: "/v1/job/modifyJobGraph",
        method: 'post',
        data
    })
}

export const modifyJob = (data) => {
    return service({
        url: "/v1/job/modifyJob",
        method: 'post',
        data
    })
}

export const saveHiveSql = (data) => {
    return service({
        url: "/v1/job/saveHiveSql",
        method: 'post',
        data
    })
}

export const addNewJob = (data) => {
    return service({
        url: "/v1/job/addNewJob",
        method: 'post',
        data
    })
}

export const getJobGraphList = (data) => {
    return service({
        url: "/v1/job/getJobGraphList",
        method: 'post',
        data: data
    })
}

export const getJobList = (data) => {
    return service({
        url: "/v1/job/getJobList",
        method: 'post',
        data: data
    })
}

export const addJobToGraph = (data) => {
    return service({
        url: "/v1/job/addJobToGraph",
        method: 'post',
        data: data
    })
}

export const deleteJobGraph = (data) => {
    return service({
        url: "/v1/job/deleteJobGraph",
        method: 'post',
        data: data
    })
}


export const deleteJob = (params) => {
    return service({
        url: "/v1/job/deleteJob",
        method: 'post',
        data: params
    })
}

export const modifySchedulerStatus = (params) => {
    return service({
        url: "/v1/job/modifySchedulerStatus",
        method: 'post',
        data: params
    })
}

export const getJobGraphById = (params) => {
    return service({
        url: "/v1/job/getJobGraphById",
        method: 'get',
        params
    })
}

export const getJobGraphByMaskId = (params) => {
    return service({
        url: "/v1/job/getJobGraphByMaskId",
        method: 'get',
        params
    })
}


export const modifyPosition = (params) => {
    return service({
        url: "/v1/job/modifyPosition",
        method: 'post',
        data: params
    })
}

export const addNewJobToGraph = (params) => {
    return service({
        url: "/v1/job/addNewJobToGraph",
        method: 'post',
        data: params
    })
}

export const getJobByMaskId = (params) => {
    return service({
        url: "/v1/job/getJobByMaskId",
        method: 'get',
        params
    })
}

export const getJobDependency = (params) => {
    return service({
        url: "/v1/job/dependency/getJobDependency",
        method: 'post',
        data: params
    })
}

export const addDependency = (params) => {
    return service({
        url: "/v1/job/dependency/addDependency",
        method: 'post',
        data: params
    })
}

export const getJobInstanceList = (params) => {
    return service({
        url: "/v1/job/instance/getJobInstanceList",
        method: 'post',
        data: params
    })
}

export const getJobGraph = (params) => {
    return service({
        url: "/v1/job/getJobGraph",
        method: 'get',
        params
    })
}
