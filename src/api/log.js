import service from '@/utils/request'

export const rollReadLog = (data) => {
    return service({
        url: "/v1/log/rollReadLog",
        method: 'get',
        data
    })
}
