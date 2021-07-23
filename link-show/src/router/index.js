import Vue from "vue";
import VueRouter from "vue-router";
import company from "../views/company.vue";
import introduce from "../views/introduce.vue";
import case_info from "../views/case_info.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "company",
    component: company
  },
  {
    path: "/introduce",
    name: "introduce",
    component: introduce,
    meta: { keep: true }
  },
  {
    path: "/case_info",
    name: "case_info",
    component: case_info,
    meta: { keep: true }
  }
];
const router = new VueRouter({
  routes
});

export default router;
