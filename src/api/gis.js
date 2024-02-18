import request from "@/http/http.js";

// 示例平台登录接口
export async function managerLogin(data = {}) {
    return await request({
        method: 'post',
        url: '/dw2gis/api/manager/system/user/login',
        data: data
    })
}

//矢量平台公私钥 
export async function getAuthKey() {
    return await request({
        method: 'post',
        url: '/dw2gis/api/manager/system/user/getAuthKey'
    })
}