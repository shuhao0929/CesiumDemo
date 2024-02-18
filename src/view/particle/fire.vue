<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import FireEffect from "@/utils/CesiumCtrl/fire.js"
import { useStore } from 'vuex';
import * as Cesium from "cesium"
import { sleep } from "@/utils/CesiumCtrl/utils"


const store = useStore()
const { viewer } = store.state

let fire
const onInit = async () => {
  viewer.camera.flyTo({
    // 从以度为单位的经度和纬度值返回笛卡尔3位置。
    destination: Cesium.Cartesian3.fromDegrees(120.361, 36.0885, 80),
    orientation: {
      direction: new Cesium.Cartesian3(0.7458181136018, -0.4270255968894706, 0.5112773034515067),
      up: new Cesium.Cartesian3(-0.19274344830978868, 0.5963500021825172, 0.7792410654159365)
    },
    duration: 3, // 飞行时间（s）
  })
  await sleep(3000)
  fire = new FireEffect(viewer)

}

const onClear = () => {
  fire.remove()
}
onUnmounted(() => {
  fire.remove()
})

</script>
<template>
  <div class="container">
    <el-button type="primary" @click="onInit">渲染火焰</el-button>
    <el-button type="primary" @click="onClear">清除</el-button>
  </div>
</template>
<style lang='scss' scoped>
.container {
  position: absolute;
  z-index: 100;
}
</style>