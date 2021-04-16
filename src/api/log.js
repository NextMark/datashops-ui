import service from '@/utils/request'

export const rollReadLog = (params) => {
    return service({
        url: "/v1/log/rollReadLog",
        method: 'get',
        params
    })
}

export const readYarnLog = (params) => {
    return service({
        url: "/v1/log/readYarnLog",
        method: 'get',
        params
    })
}
