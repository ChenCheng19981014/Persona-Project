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
          title: '岗位名称',
          key: 'postName',
          dataIndex: 'postName'
        },
        {
          title: '岗位编码',
          key: 'postNumber',
          dataIndex: 'postNumber'
        },
        {
          title: '岗位描述',
          key: 'postDescription',
          dataIndex: 'postDescription'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
