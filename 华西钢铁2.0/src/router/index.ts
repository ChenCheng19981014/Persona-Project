import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const index = ()=>import('../views/home/index.vue')
import home from '../views/home/home.vue'
import product from "../views/product/product.vue"
import data from "../views/product/data/data.vue"
import manage from "../views/product/manage/manage.vue"
import pool from "../views/product/pool/pool.vue"
import three from "../views/product/three/three.vue"
import equipment from "../views/product/pool/equipment.vue"
import testing from "../views/product/pool/testing.vue"
import Environmental from "../views/product/manage/Environmental.vue"
import video from "../views/product/manage/video.vue"
import scene from "../views/product/scene/scene.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '/',
    component: index,
    meta: { keep: true, showLogo: true, keep1:false},
    redirect:'/home',
    children: [
      {
        path:'/home',
        name:'home',
        component:home,
        meta: { keep: true, showLogo: true, keep1:true},
      },
      {
        path: '/product',
        name: 'product',
        component: product,
        meta: { keep: true, showLogo: true, keep1:true},
        children:[
          {
            path: 'scene',
            name: 'scene',
            component: scene,
            meta: { keep: true, showLogo: true, keep1:true},
            children:[
              {
                path: 'three',
                name: 'three',
                component: three,
                meta: { keep: true, showLogo: true, keep1:true},
              },
              {
                path: 'manage',
                name: 'manage',
                component: manage,
                meta: { keep: true, showLogo: true, keep1:true},
                redirect:{name:'video'},
                children:[
                  {
                    path: 'video',
                    name: 'video',
                    component: video,
                  },
                  {
                    path: 'Environmental',
                    name: 'Environmental',
                    component: Environmental,
                  }
                ]
              },
            ]
          },
          {
            path: 'data',
            name: 'data',
            component: data,
            meta: { keep: false, showLogo: true, keep1:true},
          },
          {
            path: 'pool',
            name: 'pool',
            component: pool,
            meta: { keep: false, showLogo: true, keep1:true},
            redirect:{name:'equipment'},
                children:[
                  {
                    path: 'equipment',
                    name: 'equipment',
                    component: equipment,
                  },
                  {
                    path: 'testing',
                    name: 'testing',
                    component: testing,
                  }
                ]
          },
        ]
    },
  ]
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
