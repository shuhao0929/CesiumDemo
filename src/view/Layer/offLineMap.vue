<script setup>
import sm2 from '@/lib/sm21'
import { getAuthKey, managerLogin } from '@/api/gis'
import { onMounted, reactive } from 'vue'
import { useStore } from "vuex"
import * as Cesium from "cesium";

const store = useStore()
onMounted(() => {
    getAuthKeyToken()
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(118.65179314406008, 77.32608408502125, 40000)
    })
})

const tokenInfo = reactive({
    a: '',
    r: '',
    u: '',
})


// 矢量平台token接口
const getAuthKeyToken = async () => {
    const res = await getAuthKey()
    tokenInfo.a = res.data.a
    tokenInfo.r = res.data.r
    tokenInfo.u = res.data.u
    Login()
}

// 矢量平台登录接口
const Login = async () => {
    const params = new FormData()
    params.append('user', 'sdqjpt')
    params.append('pwd', sm2, doEncrypt('Sdqjpt@123456', tokenInfo.u))
    params.append('rand', tokenInfo.a)
    const res = await managerLogin(params)
    //添加底图远端服务
    viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
        url: new Cesium.Resource({
            url: `http://25.41.42.74:18091/api/oss/SLPT/TILE/TIANDITU/SD/2023/IMG/{z}/{y}/{x}?suid=dwyjqx&auth=${tokenInfo.a}`,
            isCrossOriginUrl: true,
        })
    }))
}

</script>


<template>
    <div></div>
</template>

<style lang="scss"></style>