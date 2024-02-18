<script setup>
import { useStore } from "vuex"
import * as Cesium from 'cesium'

const store = useStore()
const myPolyline = store.state.viewer.entities.add({
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([-77, 35, -77.1, 35]),
        width: 5, //长度
        material: Cesium.Color.RED
    }
})
store.state.viewer.zoomTo(myPolyline)
</script>


<template>
    <div>

    </div>
</template>

<style lang="sass" scoped>

</style>