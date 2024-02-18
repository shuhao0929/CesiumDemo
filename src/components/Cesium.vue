<template>
  <div class="cesium-box">
    <div class="top-box">
      <el-space>
        <el-button type="primary" @click="handelCesium('flyTo')">飞行过渡相机</el-button>
        <el-dropdown type="primary">
          <el-button type="primary"> 运动轨迹 </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handelCesium('aircraftMotionPath')">飞机运动轨迹</el-dropdown-item>
              <el-dropdown-item @click="handelCesium('chongzhi')">重置</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown type="primary">
          <el-button type="primary"> 添加点线面 </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handelCesium('addXYZPoint')">通过xyz轴 添加一个实体点</el-dropdown-item>
              <el-dropdown-item @click="handelCesium('addPoint')">添加一个实体点</el-dropdown-item>
              <el-dropdown-item @click="handelCesium('addPolyline')">添加一个实体线</el-dropdown-item>
              <el-dropdown-item @click="handelCesium('addPolygon')">添加一个实体面</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown type="primary">
          <el-button type="primary"> 自定义图层(数据源) </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handelCesium('addMapboxLayer')">切换mapBox图层</el-dropdown-item>
              <el-dropdown-item @click="handelCesium('Geojson')">加载Geojson图层数据</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-dropdown type="primary">
          <el-button type="primary"> 加载三维 </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handelCesium('multipleModels')">加载多个模型</el-dropdown-item>
              <el-dropdown-item @click="handelCesium('addTopographic')">把建模加载到3D地形图上</el-dropdown-item>
              <el-dropdown-item @click="handelCesium('addGlb')">加载一个Blender绘制的glb格式三维图形</el-dropdown-item>
              <el-dropdown-item @click="handelCesium('addGltf')">加载一个gltf格式三维图形</el-dropdown-item>
              <el-dropdown-item @click="handelCesium('thisLocalityTileset')">通过本地加载3DTileset</el-dropdown-item>
              <el-dropdown-item @click="handelCesium('thisAuthorityTileset')">通过官方加载3DTileset</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-space>
    </div>
    <div id="cesiumContainer" ref="cesiumContainer"></div>
  </div>
</template>
<script setup>
import * as Cesium from 'cesium'
import { onMounted, ref, reactive } from 'vue'
let showBox = ref(false)
// vite无法使用require来引用json 使用此方法解决
const cesiumContainer = ref(null)
let viewer = null
// 申请cesium Token
const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1YzE5Y2FhZi05NTkzLTQzYjktOGI3ZC1lOWVmMjJlOGJmNmIiLCJpZCI6MTgzNjQ1LCJpYXQiOjE3MDIyNjU0NDN9.HuUj095DzpbfLpsPf4rfY48_T4DzXDG26jwZIvP2AYc'
onMounted(async () => {
  viewer = new Cesium.Viewer(cesiumContainer.value, {
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
    terrain: Cesium.Terrain.fromWorldTerrain({
      requestWaterMask: true, // 添加光照和阴影效果
      requestVertexNormals: true //添加 3DTileset 水流
    })
  });
})

const handelCesium = method => {
  switch (method) {
    case 'flyTo':
      flyTo()
      break
    case 'Geojson':
      Geojson()
      break
    case 'addPolygon':
      addPolygon()
      break
    case 'addPoint':
      addPoint()
      break
    case 'addPolyline':
      addPolyline()
      break
    case 'addMapboxLayer':
      addMapboxLayer()
      break
    case 'addGlb':
      addGlb()
      break
    case 'WorldTerrain':
      WorldTerrain()
      break
    case 'addGltf':
      addGltf()
      break
    case 'addXYZPoint':
      addXYZPoint()
      break
    case 'thisLocalityTileset':
      thisLocalityTileset()
      break
    case 'thisAuthorityTileset':
      thisAuthorityTileset()
      break
    case 'addTopographic':
      addTopographic()
      break

    case 'multipleModels':
      multipleModels()
      break
    case 'aircraftMotionPath':
      aircraftMotionPath()
      break
    case 'chongzhi':
      chongzhi()
      break
  }
}

//----------------
const MultipartVehicle_part1 = new URL(`@/czml/MultipartVehicle_part1.czml`, import.meta.url).href
const MultipartVehicle_part2 = new URL(`@/czml/MultipartVehicle_part2.czml`, import.meta.url).href
const MultipartVehicle_part3 = new URL(`@/czml/MultipartVehicle_part3.czml`, import.meta.url).href
const MultipartVehicle_part6 = new URL(`@/czml/MultipartVehicle_part6.czml`, import.meta.url).href
const MultipartVehicle_part4 = new URL(`@/czml/MultipartVehicle_part4.czml`, import.meta.url).href
const MultipartVehicle_part5 = new URL(`@/czml/MultipartVehicle_part5.czml`, import.meta.url).href
const partsToLoad = [
  {
    url: MultipartVehicle_part1,
    range: [0, 400],
    requested: false,
    loaded: false
  },
  {
    url: MultipartVehicle_part2,
    range: [400, 600],
    requested: false,
    loaded: false
  },
  {
    url: MultipartVehicle_part3,
    range: [600, 900],
    requested: false,
    loaded: false
  },
  {
    url: MultipartVehicle_part6,
    range: [900, 1100],
    requested: false,
    loaded: false
  },
  {
    url: MultipartVehicle_part4,
    range: [1100, 1230],
    requested: false,
    loaded: false
  },
  {
    url: MultipartVehicle_part5,
    range: [1230, 1800],
    requested: false,
    loaded: false
  }
]
const dataSource = new Cesium.CzmlDataSource()
let vehicleEntity = null
// 飞机运动轨迹
const aircraftMotionPath = async () => {
  const Cesium_Air = new URL(`@/demoGlb/变电站.glb`, import.meta.url).href
  const myCesium_Air = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(117.22587112410369, 36.22003661195254),
    model: {
      uri: Cesium_Air,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      clampToGround: true
    }
  })
  viewer.trackedEntity = myCesium_Air
  // 相机视角
  viewer.camera.setView({
    destination: new Cesium.Cartesian3(-2356753.5262582996, 4580940.730398803, 3748141.791920506),
    orientation: new Cesium.HeadingPitchRoll(2.2797928360617863, -0.41880403174923275, 6.2775908263207585),
    endTransform: Cesium.Matrix4.IDENTITY
  })
  // viewer.camera.flyTo({
  //   destination: Cesium.Cartesian3.fromDegrees(117.22587112410369, 36.22003661195254, 800),
  //   orientation: {
  //     heading: Cesium.Math.toRadians(2.2797928360617863),
  //     pitch: Cesium.Math.toRadians(-0.41880403174923275),
  //     roll: 6.2775908263207585
  //   }
  // })
  // // 加载变电站

  const preloadTimeInSeconds = 100

  viewer.dataSources.add(dataSource)

  await processPart(partsToLoad[0])
  //监听viewer.clock的onTick事件，每当时钟更新时触发
  viewer.clock.onTick.addEventListener(async function (clock) {
    const timeOffset = Cesium.JulianDate.secondsDifference(clock.currentTime, clock.startTime)
    // 使用 Promise.all 来确保所有部分都加载完成
    await Promise.all(
      partsToLoad
        .filter(function (part) {
          return !part.requested && timeOffset >= part.range[0] - preloadTimeInSeconds && timeOffset <= part.range[1]
        })
        .map(async function (part) {
          showBox.value = true
          if (part.range[0] == '400') {
            ElNotification({
              dangerouslyUseHTMLString: true,
              title: '电压设备',
              message: '电压:  200 V<br>电流:  300 A<br>功率:  300 W',
              type: 'warning'
            })
          } else if (part.range[0] == '900') {
            ElNotification({
              dangerouslyUseHTMLString: true,
              title: '警告',
              message: '电量不足请及时充电!!',
              type: 'warning'
            })
          } else if (part.range[0] == '1230') {
            ElNotification({
              dangerouslyUseHTMLString: true,
              title: '提示',
              message: '充电完毕!!',
              type: 'success'
            })
          }
          await processPart(part)
        })
    )
  })
}
//重置
const chongzhi = () => {
  viewer.clock.currentTime = viewer.clock.startTime
  viewer.clock.shouldAnimate = true

  partsToLoad.forEach(function (part) {
    part.requested = false
    part.loaded = false
  })
  dataSource.entities.removeAll()
  processPart(partsToLoad[0])
}
//用于处理每个CZML文件的加载
const processPart = part => {
  part.requested = true
  //使用dataSource.process方法加载CZML文件
  return dataSource.process(part.url).then(function () {
    const entity = dataSource.entities.getById('Vehicle')
    if (entity) {
      if (!viewer.trackedEntity) {
        viewer.trackedEntity = vehicleEntity = entity
      }
    }
  })
}
// 加载多个模型
const multipleModels = () => {
  const entities = []
  const lonIncrement = 0.00025
  const numberOfModels = 5
  const baseLon = -122.1958
  const url = new URL(`@/three/Cesium_Air.glb`, import.meta.url).href
  for (let i = 0; i < numberOfModels; ++i) {
    const lon = baseLon + i * lonIncrement
    const position = Cesium.Cartesian3.fromDegrees(lon, 46.1915)
    let myCesium_Air = viewer.entities.add({
      position: position,
      model: {
        uri: url,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        minimumPixelSize: 128,
        maximumScale: 100
      }
    })
    entities.push(myCesium_Air)
  }
  viewer.zoomTo(entities)
}

// 把建模 加载到3D 地形图上
const addTopographic = () => {
  const Cesium_Air = new URL(`@/demoGlb/bdz.glb`, import.meta.url).href
  const myCesium_Air = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-117.0218831617401, 34.89556157300627),
    model: {
      uri: Cesium_Air,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      clampToGround: true
    }
  })
  viewer.trackedEntity = myCesium_Air
}

// 通过本地加载 3D Tileset
const thisLocalityTileset = async () => {
  const tilesettest = await Cesium.Cesium3DTileset.fromIonAssetId(75343)
  viewer.scene.primitives.add(tilesettest)
  // b3dm 格式的 3D Tileset 的 URL
  const tilesetUrl = new URL(`@/tilesetJson/tileset.json`, import.meta.url).href
  const tileset = await Cesium.Cesium3DTileset.fromUrl(tilesetUrl)
  // 给b3dm加入颜色
  tileset.style = new Cesium.Cesium3DTileStyle({
    color: 'rgba(255, 0, 0, 0.5)'
  })
  viewer.scene.primitives.add(tileset)
  viewer.zoomTo(tileset)
}

// 通过官方加载3DTileset
const thisAuthorityTileset = async () => {
  const initialPosition = Cesium.Cartesian3.fromDegrees(-74.01881302800248, 40.69114333714821, 753)
  const initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(21.27879878293835, -21.34390550872461, 0.0716951918898415)
  viewer.scene.camera.setView({
    destination: initialPosition,
    orientation: initialOrientation,
    endTransform: Cesium.Matrix4.IDENTITY
  })
  // Cesium.Cesium3DTileset.fromIonAssetId 方法，加载来自官方的3DTilesTileset(3D建筑)
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(75343)
  viewer.scene.primitives.add(tileset)
}

// 通过 xyz 轴 添加点
const addXYZPoint = () => {
  let entities = []
  let data = [{ x: 10, y: 20, z: 30 }]
  data.forEach(function (point) {
    let entity = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(point.x, point.y, point.z),
      point: {
        pixelSize: 20,
        color: Cesium.Color.RED
      }
    })
    entities.push(entity)
  })
  viewer.zoomTo(entities)
}

// 飞行方法
const flyTo = () => {
  //Cesium提供的方法,用于将经纬度坐标转换为笛卡尔坐标系中的Cartesian3对象。 1500是目标位置的高程  单位(米)
  var targetPosition = Cesium.Cartesian3.fromDegrees(-75.62898254394531, 40.02804946899414, 1500)
  // 相机的水平方向旋转 90 度。
  var heading = Cesium.Math.toRadians(90.0)
  // 相机的向下俯视 45 度。
  var pitch = Cesium.Math.toRadians(-45.0)
  // 相机的不进行侧向旋转。
  var roll = Cesium.Math.toRadians(0.0)
  // 相机飞到目标点
  viewer.camera.flyTo({
    destination: targetPosition, // X Y Z 轴
    orientation: {
      heading: heading,
      pitch: pitch,
      roll: roll
    },
    duration: 3 // 飞行动画时长 单位(秒)
  })
}

// 加载Geojson数据
const Geojson = async () => {
  const fillMapData = new URL(`@/json/fillMap.geojson`, import.meta.url).href
  const geoJson = await Cesium.GeoJsonDataSource.load(fillMapData)
  viewer.dataSources.add(geoJson)
}

// 添加实体面
const addPolygon = () => {
  const LatLng = [-109.080842, 45.002073, -105.91517, 45.002073, -104.058488, 44.996596, -104.053011, 43.002989, -104.053011, 41.003906, -105.728954, 40.998429, -107.919731, 41.003906, -109.04798, 40.998429, -111.047063, 40.998429, -111.047063, 42.000709, -111.047063, 44.476286, -111.05254, 45.002073]
  let myPolygon = viewer.entities.add({
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
  viewer.zoomTo(myPolygon)
}

//添加自定义点
const addPoint = () => {
  let myPoint = viewer.entities.add({
    name: 'myPoint',
    position: Cesium.Cartesian3.fromDegrees(119, 20), //坐标系 转换笛卡尔坐标
    point: {
      pixelSize: 10, //像素大小
      Color: Cesium.Color.BLUE //颜色
    }
  })
  // 飞到当前图层层级
  viewer.zoomTo(myPoint)
}

// 添加自定义线
const addPolyline = () => {
  let myPolyline = viewer.entities.add({
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([-77, 35, -77.1, 35]),
      width: 5, //长度
      material: Cesium.Color.RED
    }
  })
  viewer.zoomTo(myPolyline)
}
// 切换mapBox地图
const addMapboxLayer = () => {
  const mapboxAccessToken = 'pk.eyJ1IjoibW9yZ2Vua2FmZmVlIiwiYSI6ImNpeHJmNXNmZTAwNHIycXBid2NqdTJibjMifQ.Dv1-GDpTWi0NP6xW9Fct1w'
  const mapboxUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=${mapboxAccessToken}`
  const mapboxProvider = new Cesium.UrlTemplateImageryProvider({
    url: mapboxUrl
  })
  viewer.imageryLayers.addImageryProvider(mapboxProvider)
}

// 加载一个Blender绘制的三维图形
const addGlb = () => {
  const BlenderGlb = new URL(`@/three/feiji.glb`, import.meta.url).href
  // const BlenderGlb = new URL(`@/three/aaa.glb`, import.meta.url).href;
  let position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706) // 笛卡尔坐标系
  let heading = Cesium.Math.toRadians(45.0) //相机水平方向旋转45度
  let pitch = Cesium.Math.toRadians(0.0) //相机向下俯视
  let roll = Cesium.Math.toRadians(0.0) //相机不进行侧向旋转
  // 计算四元数，表示给定位置的方向
  let orientation = Cesium.Transforms.headingPitchRollQuaternion(position, new Cesium.HeadingPitchRoll(heading, pitch, roll))
  let myBlenderGlb = viewer.entities.add({
    position: position,
    orientation: orientation,
    model: {
      uri: BlenderGlb,
      color: Cesium.Color.RED, // 设置颜色为红色
      silhouetteColor: Cesium.Color.BLUE, // 设置轮廓颜色为蓝色
      silhouetteSize: 2.0, // 设置轮廓大小
      scale: 2.0 // 设置缩放大小
    }
  })
  viewer.trackedEntity = myBlenderGlb
}

// 加载一个gltf类型三维图形
const addGltf = () => {
  const gltf = new URL(`@/three/baoma.gltf`, import.meta.url).href
  let position = Cesium.Cartesian3.fromDegrees(119, 36)
  let heading = Cesium.Math.toRadians(45.0)
  let pitch = Cesium.Math.toRadians(0.0)
  let roll = Cesium.Math.toRadians(0.0)
  let orientation = Cesium.Transforms.headingPitchRollQuaternion(position, new Cesium.HeadingPitchRoll(heading, pitch, roll))
  let mygltf = viewer.entities.add({
    position: position,
    orientation: orientation,
    model: {
      uri: gltf,
      // 样式设置
      color: Cesium.Color.RED, // 设置颜色为红色
      silhouetteColor: Cesium.Color.BLUE, // 设置轮廓颜色为蓝色
      silhouetteSize: 2.0, // 设置轮廓大小
      scale: 2.0 // 设置缩放大小
    }
  })
  viewer.trackedEntity = mygltf
}
</script>
<style lang="scss">
.cesium-box {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

#cesiumContainer {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.top-box {
  z-index: 1;
  position: absolute;
  top: 20px;
  width: 60%;
}

.info {
  height: 100%;
  width: 150px;
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;

  .close-btn {
    float: right;
    cursor: pointer;
    width: 30px;
    height: 30px;
    font-size: 18px;
  }
}
</style>
