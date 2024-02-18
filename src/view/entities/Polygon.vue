<script setup>
import { useStore } from "vuex"
import * as Cesium from 'cesium'

const store = useStore()
const LatLng = [-109.080842, 45.002073, -105.91517, 45.002073, -104.058488, 44.996596, -104.053011, 43.002989, -104.053011, 41.003906, -105.728954, 40.998429, -107.919731, 41.003906, -109.04798, 40.998429, -111.047063, 40.998429, -111.047063, 42.000709, -111.047063, 44.476286, -111.05254, 45.002073]
const myPolygon = store.state.viewer.entities.add({
    // viewer.entities 将实体添加到 Cesium的viewer对象中
    name: 'myPolygon',
    polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray(LatLng), //经纬度坐标转换为笛卡尔坐标系
        height: 0, //距离地面的高度
        extrudedHeight: 250000, //拉伸高度
        material: Cesium.Color.RED.withAlpha(0.5),
        outline: true, //边缘线显示
        outlineColor: Cesium.Color.BLACK //边缘线 颜色
    }
})
// 飞到当前图层层级
store.state.viewer.zoomTo(myPolygon)
</script>


<template>
    <div>

    </div>
</template>

<style lang="sass" scoped>

</style>