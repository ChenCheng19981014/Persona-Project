<template>
  <div>
    <a-form-model layout="inline" :model="form" @submit="handleSubmit" @submit.native.prevent>
      <a-form-model-item>
        <a-input v-model="form.nameFilter" placeholder="请输入部门名称" allowClear></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="form.numberFilter" placeholder="请输入部门编码" allowClear></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="form.director" placeholder="请输入部门负责人" allowClear></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="form.updateUser" placeholder="请输入修改用户" allowClear></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          html-type="submit"
        >
          搜索
        </a-button>
      </a-form-model-item>
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
        numberFilter: '',
        director: '',
        updateUser: ''
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$emit('handle-search', this.form)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
