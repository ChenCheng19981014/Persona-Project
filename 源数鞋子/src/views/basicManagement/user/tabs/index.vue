<template>
  <a-tabs
    @change="changeTab"
    :active-key="activeKey"
  >
    <a-tab-pane
      key="1"
      tab="常规"
    >
      <user-info
        ref="userInfoRef"
        :form-data="currentUserDetail"
        :current-user-id="currentUserId"
        @refresh-list="refreshList"
      />
    </a-tab-pane>
    <a-tab-pane
      key="2"
      tab="所属角色"
    >
      <role-tab :data-list="userRoleList"></role-tab>
    </a-tab-pane>
    <a-tab-pane
      key="3"
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
import UserInfo from './userInfo.vue'
import LogTable from '../../../document/components/LogTable.vue'
import RoleTab from './roleTab'
import { userInfo, userRoleList, operationRecord } from '@/api/user'
export default {
  name: 'DocumentTabs',
  components: {
    UserInfo,
    LogTable,
    RoleTab
  },
  props: {
    currentUserId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      activeKey: '1', // 当前激活的tab
      currentUserDetail: {},
      logSearchItem: {
        pageIndex: 1,
        pageSize: 10
      },
      userRoleList: [],
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
        this.$refs.userInfoRef.isEdit = true
        this.getUserInfo(this.currentUserId)
      } else if (key === '2') {
        // 角色
        this.getRoleList(this.currentUserId)
      } else if (key === '3') {
        // 操作日志
        this.getOperationList(this.currentUserId)
      }
    },
    async getUserInfo (id) {
      try {
        if (id) {
          const res = await userInfo({ id })
          this.currentUserDetail = res.Data
        }
      } catch (error) {}
    },
    async getRoleList (id) {
      try {
        if (id) {
          const res = await userRoleList({ id })
          this.userRoleList = res.Data
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
      this.getRelationList(this.currentUserId)
    },
    changeLogPage (pageObj) {
      this.logSearchItem.pageSize = pageObj.limit
      this.logSearchItem.pageIndex = pageObj.page
      this.getOperationList(this.currentUserId)
    }
  }
}
</script>

<style></style>
