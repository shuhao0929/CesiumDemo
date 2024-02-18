<script setup>
import { useStore } from "vuex"
import * as Cesium from 'cesium'

const store = useStore()
const myPoint = store.state.viewer.entities.add({
    name: 'myPoint',
    position: Cesium.Cartesian3.fromDegrees(119, 20), //坐标系 转换笛卡尔坐标
    point: {
        pixelSize: 10, //像素大小
        Color: Cesium.Color.BLUE //颜色
    }
})
// 飞到当前图层层级
store.state.viewer.zoomTo(myPoint)
</script>


<template>
    <div>

    </div>
</template>

<style lang="sass" scoped>

</style>