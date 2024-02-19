<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useStore } from "vuex";
import * as Cesium from "cesium";

const store = useStore();
const { viewer } = store.state;

const set3Dtitle3 = async () => {
    // b3dm 格式的 3D Tileset 的 URL
    const tilesetUrl = new URL(`@/3dtiles/tileset.json`, import.meta.url).href
    const tileset = await Cesium.Cesium3DTileset.fromUrl(tilesetUrl)
    // 给b3dm加入颜色
    tileset.style = new Cesium.Cesium3DTileStyle({
        color: 'rgba(255, 0, 0, 0.5)'
    })
    viewer.scene.primitives.add(tileset)
    viewer.zoomTo(tileset)
}

set3Dtitle3();
</script>
<template></template>
<style lang="less" scoped></style>
