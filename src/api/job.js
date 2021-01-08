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

export const getJobGraphList = (data) => {
    return service({
        url: "/v1/job/getJobGraphList",
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
        params
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
