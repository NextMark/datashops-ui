import service from '@/utils/request'

// @Summary 用户登录 获取动态路由
// @Produce  application/json
// @Param 可以什么都不填 调一下即可
// @Router /menu/getMenu [post]
export const asyncMenu = () => {
    return service({
        url: "/v1/menu/asyncMenu",
        method: 'post',
    })
}

// @Summary 获取menu列表
// @Produce  application/json
// @Param {
//  page     int
//	pageSize int
// }
// @Router /menu/getMenuList [post]
export const getMenuList = (data) => {
    return service({
        url: "/v1/menu/getMenuList",
        method: 'post',
        data
    })
}


// @Summary 新增基础menu
// @Produce  application/json
// @Param menu Object
// @Router /menu/getMenuList [post]
export const addBaseMenu = (data) => {
    return service({
        url: "/v1/menu/addBaseMenu",
        method: 'post',
        data
    })
}

// @Summary 获取基础路由列表
// @Produce  application/json
// @Param 可以什么都不填 调一下即可
// @Router /menu/getBaseMenuTree [post]
export const getBaseMenuTree = () => {
    return service({
        url: "/v1/menu/getMenuTree",
        method: 'post',
    })
}

// @Summary 添加用户menu关联关系
// @Produce  application/json
// @Param menus Object authorityId string
// @Router /menu/getMenuList [post]
export const addRoleAuthority = (data) => {
    return service({
        url: "/v1/role/addRoleAuthority",
        method: 'post',
        data
    })
}

// @Summary 获取用户menu关联关系
// @Produce  application/json
// @Param authorityId string
// @Router /menu/getMenuAuthority [post]
export const getRoleMenu = (data) => {
    return service({
        url: "/v1/menu/getRoleMenu",
        method: 'post',
        data
    })
}

// @Summary 获取用户menu关联关系
// @Produce  application/json
// @Param ID float64
// @Router /menu/deleteBaseMenu [post]
export const deleteBaseMenu = (data) => {
    return service({
        url: "/menu/deleteBaseMenu",
        method: 'post',
        data
    })
}


// @Summary 修改menu列表
// @Produce  application/json
// @Param menu Object
// @Router /menu/updateBaseMenu [post]
export const updateBaseMenu = (data) => {
    return service({
        url: "/v1/menu/modifyMenu",
        method: 'post',
        data
    })
}


// @Tags menu
// @Summary 根据id获取菜单
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body api.GetById true "根据id获取菜单"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /menu/getBaseMenuById [post]
export const getBaseMenuById = (data) => {
    return service({
        url: "/v1/menu/getBaseMenuById",
        method: 'post',
        data
    })
}
