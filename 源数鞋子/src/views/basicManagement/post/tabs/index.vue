<template>
  <a-tabs
    @change="changeTab"
    :active-key="activeKey"
  >
    <a-tab-pane
      key="1"
      tab="常规"
    >
      <post-info
        ref="postInfoRef"
        :form-data="currentPostDetail"
        :current-post-id="currentPostId"
        @refresh-list="refreshList"
      />
    </a-tab-pane>
    <a-tab-pane
      key="2"
      tab="包含用户"
    >
      <user-tab :data-list="userList"></user-tab>
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
import PostInfo from './postInfo.vue'
import LogTable from '../../../document/components/LogTable.vue'
import UserTab from './userTab'
import { postInfo, postUserList, operationRecord } from '@/api/user'
export default {
  name: 'DocumentTabs',
  components: {
    PostInfo,
    LogTable,
    UserTab
  },
  props: {
    currentPostId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      activeKey: '1', // 当前激活的tab
      currentPostDetail: {},
      logSearchItem: {
        pageIndex: 1,
        pageSize: 10
      },
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
        this.$refs.postInfoRef.isEdit = true
        this.getPostInfo(this.currentPostId)
      } else if (key === '2') {
        // 包含用户
        this.getPostUserList(this.currentPostId)
      } else if (key === '3') {
        // 操作日志
        this.getOperationList(this.currentPostId)
      }
    },
    async getPostInfo (id) {
      try {
        if (id) {
          const res = await postInfo({ id })
          this.currentPostDetail = res.Data
        }
      } catch (error) {}
    },
    async getPostUserList (id) {
      try {
        if (id) {
          const res = await postUserList({ id })
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
      this.getRelationList(this.currentPostId)
    },
    changeLogPage (pageObj) {
      this.logSearchItem.pageSize = pageObj.limit
      this.logSearchItem.pageIndex = pageObj.page
      this.getOperationList(this.currentPostId)
    }
  }
}
</script>

<style></style>
