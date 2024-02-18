<script setup>
import { onBeforeUnmount } from 'vue'
import { useStore } from "vuex"
import * as Cesium from 'cesium'

const store = useStore()
const flyTo = () => {
    //Cesium提供的方法,用于将经纬度坐标转换为笛卡尔坐标系中的Cartesian3对象。 1500是目标位置的高程  单位(米)
    var targetPosition = Cesium.Cartesian3.fromDegrees(119, 36, 4000)
    // 相机的水平方向旋转 90 度。
    var heading = Cesium.Math.toRadians(90.0)
    // 相机的向下俯视 45 度。
    var pitch = Cesium.Math.toRadians(-45.0)
    // 相机的不进行侧向旋转。
    var roll = Cesium.Math.toRadians(0.0)
    // 相机飞到目标点
    store.state.viewer.camera.flyTo({
        destination: targetPosition, // X Y Z 轴
        orientation: {
            heading: heading,
            pitch: pitch,
            roll: roll
        },
        duration: 3 // 飞行动画时长 单位(秒)
    })
}
flyTo()


</script>
