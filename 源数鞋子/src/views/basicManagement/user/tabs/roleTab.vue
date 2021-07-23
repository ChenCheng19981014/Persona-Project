<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="dataList"
      :rowKey="(record)=>record.id"
      :locale="{ emptyText: '   ' }"
      :pagination="false"
    >
      <div slot="roleState" slot-scope="row">{{ row.roleState===1?'启用':'禁用' }}</div>
    </a-table>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      columns: [
        {
          title: '角色名称',
          key: 'roleName',
          dataIndex: 'roleName'
        },
        {
          title: '角色编码',
          key: 'roleNumber',
          dataIndex: 'roleNumber'
        },
        {
          title: '角色描述',
          key: 'description',
          dataIndex: 'description'
        },
        {
          title: '角色状态',
          key: 'roleState',
          scopedSlots: { customRender: 'roleState' }
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
