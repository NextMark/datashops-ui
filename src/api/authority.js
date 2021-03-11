import service from '@/utils/request'


export const asyncRoles = (data) => {
    return service({
        url: "/v1/role/asyncRoles",
        method: 'post',
        data
    })
}


export const deleteRole = (data) => {
    return service({
        url: "/v1/role/delete",
        method: 'post',
        data
    })
}

export const modifyRole = (data) => {
    return service({
        url: "/v1/role/modifyRole",
        method: 'post',
        data
    })
}

export const setDataAuthority = (data) => {
    return service({
        url: "/v1/role/setDataRole",
        method: 'post',
        data
    })
}
