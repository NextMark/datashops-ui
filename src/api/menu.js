import service from '@/utils/request'

export const asyncMenu = () => {
    return service({
        url: "/v1/menu/asyncMenu",
        method: 'post',
    })
}

export const getMenuList = (data) => {
    return service({
        url: "/v1/menu/getMenuList",
        method: 'post',
        data
    })
}


export const addBaseMenu = (data) => {
    return service({
        url: "/v1/menu/addBaseMenu",
        method: 'post',
        data
    })
}

export const getBaseMenuTree = () => {
    return service({
        url: "/v1/menu/getMenuTree",
        method: 'post',
    })
}

export const addRoleAuthority = (data) => {
    return service({
        url: "/v1/role/addRoleAuthority",
        method: 'post',
        data
    })
}

export const getRoleMenu = (data) => {
    return service({
        url: "/v1/menu/getRoleMenu",
        method: 'post',
        data
    })
}

export const deleteBaseMenu = (data) => {
    return service({
        url: "/menu/deleteBaseMenu",
        method: 'post',
        data
    })
}


export const updateBaseMenu = (data) => {
    return service({
        url: "/v1/menu/modifyMenu",
        method: 'post',
        data
    })
}


export const getBaseMenuById = (data) => {
    return service({
        url: "/v1/menu/getBaseMenuById",
        method: 'post',
        data
    })
}
