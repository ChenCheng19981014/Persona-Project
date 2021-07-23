<template>
  <a-modal
    :visible.sync="visible"
    title="用户列表"
    @cancel="handleCancel"
    @ok="handleOK"
    destroyOnClose
    :width="1000"
    :keyboard="false"
    :maskClosable="false">
    <div class="max-modal-height">
      <div class="margin-bottom text-right">
        <my-search default-value="nameFilter" :list="searchLabel" @handle-search="handleSearch"></my-search>
      </div>
      <user-table
        ref="departmentListRef"
        :is-loading="isLoading"
        :data-list="allUserList"
        :search-item="searchItem"
        :total-nums="totalNums"
        :checked-user-ids="checkedUserIds"
        :data-columns="columns"
        :select-type="selectType"
        @select-row="selectRow"
        @change-page="changePage"
      >
      </user-table>
    </div>
  </a-modal>
</template>

<script>
import MySearch from '@/components/MySearch'
import userTable from '../user/list.vue'
import { userList } from '@/api/user'
import { mergeArray, spliceArray } from '@/utils/util.js'
export default {
  components: { userTable, MySearch },
  props: {
    selectType: {
      type: String,
      default: 'checkbox'
    }
  },
  data () {
    return {
      searchLabel: [
        {
          name: '用户名称',
          value: 'nameFilter'
        },
        {
          name: '用户编码',
          value: 'userNumberFilter'
        },
        {
          name: '用户工号',
          value: 'jobNumber'
        },
        {
          name: '登录名',
          value: 'accountFilter'
        },
        {
          name: '所属角色',
          value: 'roleName'
        },
        {
          name: '所属岗位',
          value: 'postName'
        },
        {
          name: '所属部门',
          value: 'departmentName'
        },
        {
          name: '直属领导',
          value: 'leader'
        }
      ],
      visible: false,
      isLoading: false,
      allUserList: [],
      searchItem: {
        nameFilter: '',
        userNumberFilter: '',
        jobNumber: '',
        accountFilter: '',
        roleName: '',
        postName: '',
        departmentName: '',
        leader: '',
        pageIndex: 1,
        pageSize: 10
      },
      totalNums: 0,
      checkedUserIds: [],
      checkedUserList: [],
      checkedRows: [],
      columns: [
        {
          title: '用户姓名',
          key: 'name',
          dataIndex: 'name',
          width: 150
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '用户编码',
          key: 'userNumber',
          dataIndex: 'userNumber',
          width: 150
        },
        {
          title: '用户工号',
          key: 'jobNumber',
          dataIndex: 'jobNumber',
          width: 150
        },
        {
          title: '登录名',
          key: 'account',
          dataIndex: 'account',
          width: 150
        },
        {
          title: '所属角色',
          key: 'roleNames',
          dataIndex: 'roleNames',
          width: 150
        },
        {
          title: '所属岗位',
          key: 'postNames',
          dataIndex: 'postNames',
          width: 300
        },
        {
          title: '所属部门',
          key: 'departmentNames',
          dataIndex: 'departmentNames',
          width: 150
        },
        {
          title: '用户状态',
          key: 'userState',
          scopedSlots: { customRender: 'userState' },
          width: 150
        },
        {
          title: '直属领导',
          key: 'leader',
          dataIndex: 'leader',
          width: 150
        },
        {
          title: '固定电话',
          key: 'fixedTelephone',
          dataIndex: 'fixedTelephone',
          width: 150
        },
        {
          title: '移动电话',
          key: 'mobilePhone',
          dataIndex: 'mobilePhone',
          width: 150
        },
        {
          title: 'Email',
          key: 'email',
          dataIndex: 'email',
          width: 150
        },
        {
          title: '联系地址',
          key: 'address',
          dataIndex: 'address',
          width: 300
        }
      ]
    }
  },
  methods: {
    openModal (list) {
      this.getList()
      if (list.length > 0) {
        this.checkedUserIds = list.map(item => {
          return item.userId
        })
        this.checkedUserList = [...list]
        this.checkedRows = [...list]
      } else {
        this.checkedUserIds = []
        this.checkedUserList = []
      }
      this.searchItem = {
        nameFilter: '',
        userNumberFilter: '',
        jobNumber: '',
        accountFilter: '',
        roleName: '',
        postName: '',
        departmentName: '',
        leader: '',
        pageIndex: 1,
        pageSize: 10
      }
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    },
    handleOK () {
      if (this.checkedUserIds.length > 0) {
        this.$emit('change-user', this.checkedRows)
        this.handleCancel()
      } else {
        this.$message.error('请选择所属部门')
      }
    },
    selectRow (obj) {
      this.checkedUserIds = obj.ids
      this.checkedUserList = obj.rows
      if (this.checkedRows.length > 0) {
        let uniqueArr = mergeArray(this.checkedRows, this.checkedUserList, 'userId')
        this.checkedRows = spliceArray(uniqueArr, this.checkedUserIds, 'userId')
      } else {
        this.checkedRows = this.checkedUserList
      }
      // this.checkedUserIds = obj.ids
      // this.checkedUserList = this.checkedRows
    },
    async getList () {
      try {
        this.isLoading = true
        const res = await userList(this.searchItem)
        // this.$refs.departmentListRef.expandedRowKeys = []
        this.allUserList = res.Data.rows
        this.totalNums = res.Data.totalCount
      } catch (error) {

      } finally {
        this.isLoading = false
      }
    },
    handleSearch (data) {
      this.searchItem.nameFilter = ''
      this.searchItem.userNumberFilter = ''
      this.searchItem.jobNumber = ''
      this.searchItem.accountFilter = ''
      this.searchItem.roleName = ''
      this.searchItem.postName = ''
      this.searchItem.departmentName = ''
      this.searchItem.leader = ''
      this.searchItem[data.searchCondition] = data.inputValue
      this.searchItem.pageIndex = 1
      this.checkedUserIds = []
      this.getList()
    },
    changePage (pageObj) {
      // this.checkedUserIds = []
      this.searchItem.pageSize = pageObj.limit
      this.searchItem.pageIndex = pageObj.page
      this.getList()
    }
  }
}
</script>
