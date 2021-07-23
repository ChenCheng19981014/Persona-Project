<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="dataList"
      :rowKey="(record)=>record.userId"
      :locale="{ emptyText: '   ' }"
      :pagination="false"
    >
      <div slot="postNames" slot-scope="row">{{ renderArr(row.postNames) }}</div>
      <div slot="departmentNames" slot-scope="row">{{ renderArr(row.departmentNames) }}</div>
      <div slot="roleNames" slot-scope="row">{{ renderArr(row.roleNames) }}</div>
      <div slot="userState" slot-scope="row">{{ row.userState===1?'启用':'禁用' }}</div>
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
          title: '员工姓名',
          key: 'name',
          dataIndex: 'userName'
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '员工编码',
          key: 'userNumber',
          dataIndex: 'userNumber'
        },
        {
          title: '用户名',
          key: 'account',
          dataIndex: 'account'
        },
        {
          title: '所属角色',
          key: 'roleNames',
          scopedSlots: { customRender: 'roleNames' }
        },
        {
          title: '所属岗位',
          key: 'postNames',
          scopedSlots: { customRender: 'postNames' }
        },
        {
          title: '所属部门',
          key: 'departmentNames',
          scopedSlots: { customRender: 'departmentNames' }
        },
        {
          title: '用户状态',
          key: 'userState',
          scopedSlots: { customRender: 'userState' }
        },
        {
          title: '直属领导',
          key: 'leader',
          dataIndex: 'leader'
        },
        {
          title: '固定电话',
          key: 'fixedTelephone',
          dataIndex: 'fixedTelephone'
        },
        {
          title: '移动电话',
          key: 'mobilePhone',
          dataIndex: 'mobilePhone'
        },
        {
          title: 'Email',
          key: 'email',
          dataIndex: 'email'
        },
        {
          title: '联系地址',
          key: 'address',
          dataIndex: 'address'
        }
      ]
    }
  },
  computed: {
    renderArr () {
      return function (list) {
        let str = ''
        let len = list.length - 1
        list.forEach((item, index) => {
          str += (index < len ? `${item}，` : `${item}`)
        })
        return str
      }
    }
  }
}
</script>

<style scoped>

</style>
