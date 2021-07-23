// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout, WalshLayout } from '@/layouts'
import {
  document
  // material,
  // productConfig,
  // superBom
} from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'walsh',
    // component: BasicLayout,
    component: WalshLayout,
    meta: { title: 'menu.walsh' },
    redirect: '/walsh/work-space',
    children: [
      {
        path: '/walsh/work-space',
        name: 'walsh',
        component: RouteView,
        meta: { title: 'menu.walsh', keepAlive: true, icon: document, permission: ['dashboard'] },
        children: [
          {
            path: '/walsh/work-space',
            name: 'work-space',
            component: () => import('@/views/walsh/workSpace/index'),
            meta: { title: 'menu.walsh.work-space', keepAlive: true, permission: ['dashboard'] }
          }
          // ,
          // {
          //   path: '/walsh/recycle',
          //   name: 'recycle',
          //   component: () => import('@/views/document/recycle/index'),
          //   meta: { title: 'menu.document.recycle', keepAlive: true, permission: ['dashboard'] }
          // }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  // {
  //   path: '/user',
  //   component: UserLayout,
  //   redirect: '/user/login',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'login',
  //       name: 'login',
  //       component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
  //     },
  //     {
  //       path: 'register',
  //       name: 'register',
  //       component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
  //     },
  //     {
  //       path: 'register-result',
  //       name: 'registerResult',
  //       component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
  //     },
  //     {
  //       path: 'recover',
  //       name: 'recover',
  //       component: undefined
  //     }
  //   ]
  // },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
