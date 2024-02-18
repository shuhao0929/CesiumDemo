
<script setup>
import * as Cesium from "cesium";
import { useStore } from "vuex"
import { onUnmounted, ref } from "vue"
let showBox = ref(false)
const store = useStore()
const { viewer } = store.state;

// 加载模型
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

</script>

<template>
    <div class="container">
        <el-button type="primary" @click="aircraftMotionPath()">开始</el-button>
        <el-button type="primary" @click="chongzhi()">重置</el-button>
    </div>
</template>
<style lang="scss" scoped>
.container {
    position: absolute;
    z-index: 100;
}
</style>