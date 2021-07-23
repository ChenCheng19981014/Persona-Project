<template>
  <a-tabs
    @change="changeTab"
    :active-key="activeKey"
  >
    <a-tab-pane
      key="1"
      tab="常规"
    >
      <department-info
        ref="departmentInfoRef"
        :form-data="currentDepartmentDetail"
        :current-department-id="currentDepartmentId"
        @refresh-list="refreshList"
      />
    </a-tab-pane>
    <a-tab-pane
      key="2"
      tab="包含岗位"
    >
      <post-tab :data-list="postList"></post-tab>
    </a-tab-pane>
    <a-tab-pane
      key="3"
      tab="包含用户"
    >
      <user-tab :data-list="userList"></user-tab>
    </a-tab-pane>
    <a-tab-pane
      key="4"
      tab="操作日志"
    >
      <log-table
        :table-data="logData"
        :table-columns="logTableColumns"
        :search-item="logSearchItem"
        :total-nums="logListTotalNums"
        @change-page="changeLogPage"/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import DepartmentInfo from './departmentInfo.vue'
import LogTable from '../../../document/components/LogTable.vue'
import PostTab from './postTab'
import UserTab from './userTab'
import { departmentInfo, departmentPostList, departmentUserList, operationRecord } from '@/api/user'
export default {
  name: 'DocumentTabs',
  components: {
    DepartmentInfo,
    LogTable,
    PostTab,
    UserTab
  },
  props: {
    currentDepartmentId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      activeKey: '1', // 当前激活的tab
      currentDepartmentDetail: {},
      logSearchItem: {
        pageIndex: 1,
        pageSize: 10
      },
      postList: [],
      userList: [],
      logData: [],
      logListTotalNums: 0,
      logTableColumns: [
        {
          title: '用户',
          dataIndex: 'operator',
          key: 'operator'
        },
        {
          title: '时间',
          // dataIndex: 'operationTime',
          key: 'operationTime',
          scopedSlots: { customRender: 'operationTime' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action'
        },
        {
          title: '名称',
          dataIndex: 'objectName',
          key: 'objectName'
        },
        {
          title: '编码',
          dataIndex: 'objectNumber',
          key: 'objectNumber'
        },
        {
          title: '结果',
          dataIndex: 'result',
          key: 'result'
        }
      ]
    }
  },
  methods: {
    setActiveKey (key) {
      this.activeKey = key
    },
    emptyChecked () {
      if (this.$refs.historyTableRef) this.$refs.historyTableRef.emptyChecked()
    },
    refreshList () {
      this.$emit('refresh-list')
    },
    refreshTree () {
      this.$emit('refresh-tree')
    },
    changeTab (key) {
      this.setActiveKey(key)
      if (key === '1') {
        // 常规
        this.$refs.departmentInfoRef.isEdit = true
        this.getDepartmentInfo(this.currentDepartmentId)
      } else if (key === '2') {
        // 包含岗位
        this.getPostList(this.currentDepartmentId)
      } else if (key === '3') {
        // 包含用户
        this.getUserList(this.currentDepartmentId)
      } else if (key === '4') {
        // 操作日志
        this.getOperationList(this.currentDepartmentId)
      }
    },
    async getDepartmentInfo (id) {
      try {
        if (id) {
          const res = await departmentInfo({ id })
          this.currentDepartmentDetail = res.Data
        }
      } catch (error) {}
    },
    async getPostList (id) {
      try {
        if (id) {
          const res = await departmentPostList({ id })
          this.postList = res.Data
        }
      } catch (error) {}
    },
    async getUserList (id) {
      try {
        if (id) {
          const res = await departmentUserList({ id })
          this.userList = res.Data
        }
      } catch (error) {}
    },
    async getOperationList (id) {
      try {
        if (id) {
          const res = await operationRecord({ objectId: id, ...this.logSearchItem })
          if (res.Code === 0) {
            this.logData = res.Data.rows
            this.logListTotalNums = res.Data.totalCount
          } else {
            this.$message.error(res.Message)
          }
        }
      } catch (error) {
        return error
      }
    },
    changeRelationPage (pageObj) {
      this.relationSearchItem.pageSize = pageObj.limit
      this.relationSearchItem.pageIndex = pageObj.page
      this.getRelationList(this.currentDepartmentId)
    },
    changeLogPage (pageObj) {
      this.logSearchItem.pageSize = pageObj.limit
      this.logSearchItem.pageIndex = pageObj.page
      this.getOperationList(this.currentDepartmentId)
    }
  }
}
</script>

<style></style>
