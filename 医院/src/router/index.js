import Vue from "vue";
import VueRouter from "vue-router";
import hospital from "../views/hospital/hospital.vue";
import scene from "../views/Scene/scene.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "hospital",
    component: hospital,
    meta: { keep: true, showLogo: true, run: false },
    children: [
      {
        path: "/scene",
        name: "scene",
        component: scene,
        meta: { keep: true, showLogo: true, run: true },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
