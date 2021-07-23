<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="dataList"
      :rowKey="(record)=>record.id"
      :locale="{ emptyText: '   ' }"
      :pagination="false"
    >
      <div slot="updateTime" slot-scope="row">{{ row.updateTime | dateFormat('YYYY-MM-DD HH:mm:ss') }}</div>
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
          key: 'postName',
          dataIndex: 'userName'
        },
        {
          title: '角色编码',
          key: 'postNumber',
          dataIndex: 'userName'
        },
        {
          title: '角色描述',
          key: 'description',
          dataIndex: 'description'
        },
        {
          title: '角色状态',
          key: 'status',
          dataIndex: 'status'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
