import storage from 'store'
import { login, getUserInfo, logout } from '@/api/login'
import { ACCESS_TOKEN, USER_ID } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    userId: '',
    roles: [],
    info: {},
    currentUserId: '' // 当前登录用户的id
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_USERID: (state, id) => {
      state.userId = id
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_CURRENT_USER_ID: (state, info) => {
      state.currentUserId = info
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          // const result = response.result
          if (response.Code === 0) {
            storage.set(ACCESS_TOKEN, response.Data.accessToken, 7 * 24 * 60 * 60 * 1000)
            storage.set(USER_ID, response.Data.userId, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', response.Data.accessToken)
            commit('SET_CURRENT_USER_ID', response.Data.userId)
          }
          resolve(response)
        }).catch(error => {
          // console.log(error, 'error')
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        let id = storage.get(USER_ID)

        getUserInfo({ id: state.currentUserId ? state.currentUserId : id }).then(response => {
        // getInfo().then(response => {
          // console.log(response, 'response')
          const result = response.Data
          // if (result.role && result.role.permissions.length > 0) {
          //   const role = result.role
          //   role.permissions = result.role.permissions
          //   role.permissions.map(per => {
          //     if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
          //       const action = per.actionEntitySet.map(action => { return action.action })
          //       per.actionList = action
          //     }
          //   })
          //   role.permissionList = role.permissions.map(permission => { return permission.permissionId })
          //   commit('SET_ROLES', result.role)
          // } else {
          //   reject(new Error('getInfo: roles must be a non-null array !'))
          // }
          commit('SET_ROLES', ['a', 'b'])
          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)
          commit('SET_USERID', result.userId)

          resolve(response)
        }).catch(error => {
          console.error(error, 'error')
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
        })
      })
    }

  }
}

export default user
