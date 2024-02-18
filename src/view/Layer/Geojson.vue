<script setup>
import { useStore } from "vuex"
import * as Cesium from 'cesium'

const store = useStore()
const fillMapData = new URL(`@/json/fillMap.geojson`, import.meta.url).href
const geoJson = await Cesium.GeoJsonDataSource.load(fillMapData)
store.state.viewer.dataSources.add(geoJson)

store.state.viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(116.33600347044397, 39.885389358599156, 40000)
})
</script>
