import Vue from "vue";
import VueRouter from "vue-router";
import earth from "../views/earth.vue";
import park from "../views/park.vue";
import data from "../views/park/data";
import show from "../views/park/scene/three/show.vue";
import scene from "../views/park/scene.vue";
import monitor from "../views/park/monitor.vue";
import demo from "../views/park/demo.vue";
import information from "../views/park/information.vue";
import equipment from "../views/park/scene/three/equipment.vue";
import three from "../views/park/scene/three/three.vue";
import factory from "../views/park/scene/three/factory.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "earth",
    component: earth,
  },
  {
    path: "/park",
    mame: "park",
    component: park,
    children: [
      { path: "data", name: "data", component: data },
      {
        path: "scene",
        name: "scene",
        component: scene,
        meta: { keep: true },
        children: [
          {
            path: "equipment",
            name: "equipment",
            component: equipment,
            meta: { keep: true, showLogo: true },
          },
          {
            path: "three",
            name: "three",
            component: three,
            meta: { keep: true, showLogo: true },
            children: [
              {
                path: "show",
                name: "show",
                component: show,
                meta: { keep: true, showLogo: true },
              },
              {
                path: "factory",
                name: "factory",
                component: factory,
                meta: { keep: true, showLogo: true },
              },
            ],
          },
        ],
      },
      {
        path: "monitor",
        name: "monitor",
        component: monitor,
        meta: { keep: true, showLogo: true },
      },
      { path: "demo", name: "demo", component: demo },
      { path: "information", name: "information", component: information },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
