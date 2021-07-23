<template>
  <div class="" id="searchBox">
    <a-form-model layout="inline" :model="form" @submit="handleSubmit" @submit.native.prevent>
      <a-form-model-item>
        <a-input v-model="form.nameFilter" placeholder="请输入用户姓名" allowClear></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="form.userNumberFilter" placeholder="请输入用户编码" allowClear></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="form.jobNumber" placeholder="请输入用户工号" allowClear></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="form.accountFilter" placeholder="请输入登录名" allowClear></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="form.roleName" placeholder="请输入所属角色" allowClear></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="form.postName" placeholder="请输入所属岗位" allowClear></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="form.departmentName" placeholder="请输入所属部门" allowClear></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-select style="width: 200px" v-model="form.userState" allowClear placeholder="全部用户状态">
          <a-select-option :value="0">全部用户状态</a-select-option>
          <a-select-option :value="1">启用</a-select-option>
          <a-select-option :value="2">禁用</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="form.leader" placeholder="请输入直属领导" allowClear></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          html-type="submit"
        >
          搜索
        </a-button>
      </a-form-model-item>
      <!-- <a-button type="text" style="margin-left:10px" id="closeSearchBtn" @click="closeSearch">
        {{ word }}
        <a-icon :type="showAll?'up':'down'" />
      </a-button> -->
    </a-form-model>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showAll: true, // 是否展开全部
      form: {
        nameFilter: '',
        userNumberFilter: '',
        jobNumber: '',
        accountFilter: '',
        roleName: '',
        postName: '',
        departmentName: '',
        userState: 0,
        leader: ''
      }
    }
  },
  computed: {
    word: function () {
      if (this.showAll === false) {
        // 对文字进行处理
        return '展开'
      } else {
        return '收起'
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$emit('handle-search', { ...this.form, userState: this.form.userState === 0 ? null : this.form.userState === 1 ? 1 : 2 })
    },
    closeSearch () {
      this.showAll = !this.showAll
      var searchBoxHeght = document.getElementById('searchBox')
      if (this.showAll === false) {
        searchBoxHeght.style.height = 60 + 'px'
      } else {
        searchBoxHeght.style.height = 'auto'
      }
    }

  }
}
</script>

<style lang="less" scoped>
  #searchBox {
    overflow: hidden;
  }
</style>
