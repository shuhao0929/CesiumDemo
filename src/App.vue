<template>
  <div class="layout">
    <el-container>
      <Menu></Menu>
      <el-main>
        <div id="cesiumContainer"></div>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import Menu from '@/components/Menu.vue'
import * as Cesium from 'cesium'
import { onMounted, ref, reactive } from 'vue'
import store from "@/store/store.js";
onMounted(() => {
  init();
});
const init = () => {
  // 加载离线地球
  const viewer = new Cesium.Viewer('cesiumContainer', {
    baseLayer: Cesium.ImageryLayer.fromProviderAsync(
      Cesium.TileMapServiceImageryProvider.fromUrl(
        Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII")
      )
    ),
    infoBox: false, // 禁用沙箱，解决默认的控制台报错
    baseLayerPicker: false, // 去掉底图选择器
    sceneModePicker: false, // 去掉场景模式选择器 （3D，2D）
    homeButton: false, // 去掉起始点按钮
    geocoder: false, // 去掉地理代码搜索
    navigationHelpButton: false, // 去掉导航帮助按钮
    animation: true, // 取消动画按钮
    // timeline: false, // 去掉时间线
    fullscreenButton: false, // 去掉全屏按钮
    selectionIndicator: false, // 去掉选择指示器
    // terrain: Cesium.Terrain.fromWorldTerrain({
    //   requestWaterMask: true, // 添加光照和阴影效果
    //   requestVertexNormals: true //添加 3DTileset 水流
    // })
  });
  // 去除logo
  viewer.cesiumWidget.creditContainer.style.display = "none";
  window.viewer = viewer;

  store.commit("initViewer", viewer);
  // 监听点击事件，拾取坐标
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction((e) => {
    const clickPosition = viewer.scene.camera.pickEllipsoid(e.position);
    const randiansPos = Cesium.Cartographic.fromCartesian(clickPosition);
    console.log(
      "经度：" +
      Cesium.Math.toDegrees(randiansPos.longitude) +
      ", 纬度：" +
      Cesium.Math.toDegrees(randiansPos.latitude)
    );
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

</script>
<style lang="scss">
* {
  margin: 0px;
  padding: 0px;
}

#cesiumContainer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.el-header {
  height: 30px;
}

.el-container {
  height: 100vh;
}

.el-main {
  padding: 0 !important;
  position: relative;
}
</style>