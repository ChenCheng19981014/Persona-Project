
const state = {
  rootMaterial: {}, // 根物料
  bomInfo: {}, // 根物料详情信息
  bindBom: {}, // 配置绑定得超级bom
  configInfo: {}, // 销售配置详情
  configList: [], // 配置列表
  bomList: [], // 物料树结构列表
  deleteList: [], // 删除的附属物料列表
  ruleList: [], // 物料约束规则列表
  firstMaterialList: [] // 配置约束规则时供选择的列表
}

const mutations = {
  setRoot (state, material) {
    state.rootMaterial = material
  },
  setInfo: (state, info) => {
    state.bomInfo = info
  },
  setCheckedBom: (state, bomInfo) => {
    state.bindBom = bomInfo
  },
  setConfig: (state, info) => {
    state.configInfo = info
  },
  setList: (state, list) => {
    state.bomList = list
  },
  setConfigList: (state, list) => {
    state.configList = list
  },
  setDelete: (state, list) => {
    state.deleteList = list
  },
  setRule: (state, list) => {
    state.ruleList = list
  },
  setFirstMaterial: (state, list) => {
    state.firstMaterialList = list
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
