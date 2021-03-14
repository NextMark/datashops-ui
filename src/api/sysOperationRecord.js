import service from '@/utils/request'

export const deleteSysOperationRecord = (data) => {
    return service({
        url: "/sysOperationRecord/deleteSysOperationRecord",
        method: 'delete',
        data
    })
}

export const deleteSysOperationRecordByIds = (data) => {
    return service({
        url: "/sysOperationRecord/deleteSysOperationRecordByIds",
        method: 'delete',
        data
    })
}

export const getSysOperationRecords = (params) => {
    return service({
        url: "/v1/sys/getSysOperations",
        method: 'post',
        data: params
    })
}
