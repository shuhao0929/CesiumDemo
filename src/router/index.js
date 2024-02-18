const EmptyRouterView = () =>
    import("@/view/routerViews/emptyRouterViews.vue");
const routes = [
    {
        path: "/particle",
        component: EmptyRouterView,
        meta: {
            title: "粒子效果",
        },
        children: [
            {
                path: "snow",
                name: "particle_snow",
                component: () => import("@/view/particle/snow.vue"),
                meta: {
                    title: "下雪",
                    activePath: "/particle/snow",
                },
            },
            {
                path: "rain",
                name: "particle_rain",
                component: () => import("@/view/particle/rain.vue"),
                meta: {
                    title: "下雨",
                    activePath: "/particle/rain",
                },
            },
            {
                path: "fog",
                name: "particle_fog",
                component: () => import("@/view/particle/fog.vue"),
                meta: {
                    title: "大雾",
                    activePath: "/particle/fog",
                },
            },
            {
                path: "fire",
                name: "particle_fire",
                component: () => import("@/view/particle/fire.vue"),
                meta: {
                    title: "火焰",
                    activePath: "/particle/fire",
                },
            },
            {
                path: "flyTo",
                name: "flyTo",
                component: () => import("@/view/particle/flyTo.vue"),
                meta: {
                    title: "相机飞行",
                    activePath: "/particle/flyTo",
                },
            },
        ],
    },
    {
        path: "/entities",
        component: EmptyRouterView,
        meta: {
            title: "点线面",
        },
        children: [
            {
                path: "Point",
                name: "entities_Point",
                component: () => import("@/view/entities/Point.vue"),
                meta: {
                    title: "实体点",
                    activePath: "/entities/Point",
                },
            },
            {
                path: "Polyline",
                name: "entities_Polyline",
                component: () => import("@/view/entities/Polyline.vue"),
                meta: {
                    title: "实体线",
                    activePath: "/entities/Polyline",
                },
            },
            {
                path: "Polygon",
                name: "entities_Polygon",
                component: () => import("@/view/entities/Polygon.vue"),
                meta: {
                    title: "实体面",
                    activePath: "/entities/Polygon",
                },
            },
        ],
    },
    {
        path: "/czml",
        component: EmptyRouterView,
        meta: {
            title: "GLB绘制",
        },
        children: [
            {
                path: "aircraftMotionPath",
                name: "czml_aircraftMotionPath",
                component: () => import("@/view/czml/aircraftMotionPath.vue"),
                meta: {
                    title: "机器人轨迹移动",
                    activePath: "/czml/aircraftMotionPath",
                },
            },
            {
                path: "Cesium",
                name: "czml_Cesium",
                component: () => import("@/view/czml/Cesium.vue"),
                meta: {
                    title: "测试集合",
                    activePath: "/czml/Cesium",
                },
            },
        ],
    },
    {
        path: "/Layer",
        component: EmptyRouterView,
        meta: {
            title: "矢量平台地图",
        },
        children: [
            {
                path: "offLineMap",
                name: "Layer_offLineMap",
                component: () => import("@/view/Layer/offLineMap.vue"),
                meta: {
                    title: "离线地图",
                    activePath: "/Layer/offLineMap",
                },
            },
            {
                path: "Geojson",
                name: "Layer_Geojson",
                component: () => import("@/view/Layer/Geojson.vue"),
                meta: {
                    title: "Geojson格式数据",
                    activePath: "/Layer/Geojson",
                },
            },
        ],
    },
];

export default routes;
