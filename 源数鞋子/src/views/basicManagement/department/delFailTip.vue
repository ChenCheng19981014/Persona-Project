<template>
  <a-modal
    title="删除部门"
    :visible="visible"
    @ok="handleCancel"
    @cancel="handleCancel">
    <p>以下部门还有下级部门或岗位，不能被删除：</p>
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
  </a-modal>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
