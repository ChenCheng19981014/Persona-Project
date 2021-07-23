<template>
  <div class="container">
    <height-drag>
      <div slot="top" class="full-height flex flex-column">
        <div>
          <div class="page-title">用户管理</div>
          <div class="flex margin-bottom justify-between align-center">
            <div class="flex btn-box">
              <a-button type="primary" class="margin-right-xs" @click="handleCreate">
                <my-icon type="icon-xinjian" class="btn-icon-size"></my-icon>
                新建用户
              </a-button>
              <a-button
                class="margin-right-xs"
                :disabled="checkedUserIds.length===0"
                @click="handleDelete"
              >
                <my-icon type="icon-shanchu" class="btn-icon-size"></my-icon>
                删除用户
              </a-button>
              <a-button
                :disabled="enableDisable('2')"
                class="margin-right-xs"
                @click="handleForbidden(true)"
              >
                <my-icon type="icon-qiyongyonghu" class="btn-icon-size"></my-icon>
                启用用户
              </a-button>
              <a-button
                :disabled="enableDisable('1')"
                class="margin-right-xs"
                @click="handleForbidden(false)"
              >
                <my-icon type="icon-jinyongyonghu" class="btn-icon-size"></my-icon>
                禁用用户
              </a-button>
              <a-button
                :disabled="checkedUserIds.length===0 || checkedUserIds.length>1"
                @click="handleResetPassword"
              >
                <my-icon type="icon-zhongzhimima" class="btn-icon-size"></my-icon>
                重置密码
              </a-button>
            </div>
            <my-search default-value="nameFilter" :list="searchLabel" @handle-search="handleSearch"></my-search>
          </div>
        </div>
        <div style="flex:1">
          <list
            :is-loading="isLoading"
            :data-list="userList"
            :data-columns="columnList"
            :search-item="searchItem"
            :total-nums="totalNums"
            :checked-user-ids="checkedUserIds"
            :show-pagination="true"
            @select-row="selectRow"
            @change-page="changePage"
            @handle-filters="handleFilters"
          ></list>
        </div>
      </div>
      <div slot="bottom">
        <tabs
          ref="userTabsRef"
          :current-user-id="currentUserId"
          :is-possible-edit="infoIsPossibleEdit"
          @refresh-list="userInfoUpdate"
        ></tabs>
      </div>
    </height-drag>
    <create-user ref="createUserRef"></create-user>
    <reset-password ref="resetPasswordRef" :current-user-id="currentUserId"></reset-password>
  </div>
</template>

<script>
import HeightDrag from '@/components/HeightDrag'
import MySearch from '@/components/MySearch'
import List from './list'
import Tabs from './tabs/index'
import SearchForm from './searchForm'
import CreateUser from './createUser'
import ResetPassword from './resetPassward'
import { userList, deleteUser, enableUser } from '@/api/user'
export default {
  name: 'Error',
  components: { HeightDrag, MySearch, List, Tabs, SearchForm, CreateUser, ResetPassword },
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
      isLoading: false,
      infoIsPossibleEdit: false,
      userList: [],
      totalNums: 0,
      currentUserId: '',
      checkedUserIds: [],
      checkedUserList: [],
      checkedUser: {},
      searchItem: {
        userState: null,
        pageIndex: 1,
        pageSize: 10
      },
      filteredInfo: {}
    }
  },
  computed: {
    columnList () {
      const columns = [
        {
          title: '用户姓名',
          key: 'name',
          dataIndex: 'name',
          width: 120,
          ellipsis: true,
          fixed: 'left'
        },
        {
          title: '用户编码',
          key: 'userNumber',
          dataIndex: 'userNumber',
          width: 200,
          ellipsis: true
        },
        {
          title: '用户工号',
          key: 'jobNumber',
          dataIndex: 'jobNumber',
          width: 150,
          ellipsis: true
        },
        {
          title: '登录名',
          key: 'account',
          dataIndex: 'account',
          width: 150,
          ellipsis: true
        },
        {
          title: '所属角色',
          key: 'roleNames',
          scopedSlots: { customRender: 'roleNames' },
          width: 200,
          ellipsis: true
        },
        {
          title: '所属岗位',
          key: 'postNames',
          scopedSlots: { customRender: 'postNames' },
          width: 200,
          ellipsis: true
        },
        {
          title: '所属部门',
          key: 'departmentNames',
          scopedSlots: { customRender: 'departmentNames' },
          width: 200,
          ellipsis: true
        },
        {
          title: '用户状态',
          key: 'userState',
          scopedSlots: { customRender: 'userState' },
          filterMultiple: false,
          filters: [
            { text: '启用', value: 1 },
            { text: '禁用', value: 2 }
          ],
          filteredValue: this.filteredInfo.userState || null,
          width: 100
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
          width: 150,
          ellipsis: true
        },
        {
          title: '修改用户',
          key: 'updateUser',
          dataIndex: 'updateUser',
          width: 120
        },
        {
          title: '修改时间',
          key: 'updateTime',
          scopedSlots: { customRender: 'updateTime' },
          width: 150
        }
      ]
      return columns
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    selectRow (obj) {
      this.checkedUserIds = obj.ids
      this.currentUserId = obj.ids[0]
      this.checkedUserList = obj.rows
      if (this.checkedUserIds.length === 1) {
        this.checkedUser = obj.rows[0]
        if (this.$refs.userTabsRef.activeKey === '1') {
          // 常规信息
          this.$refs.userTabsRef.$refs.userInfoRef.isEdit = true
          this.$refs.userTabsRef.getUserInfo(this.currentUserId)
        } else if (this.$refs.userTabsRef.activeKey === '2') {
          // 角色列表
          this.$refs.userTabsRef.getRoleList(this.currentUserId)
        } else {
          // 操作日志
          this.$refs.userTabsRef.getOperationList(this.currentUserId)
        }
      } else if (this.checkedUserIds.length === 0) {
        this.clearCheckedIds()
      }
    },
    handleCreate () {
      this.$refs.createUserRef.showForm()
    },
    handleDelete () {
      this.$confirm({
        title: '删除BOM',
        content: `确认要把[${this.checkedUserIds.length}]个用户删除吗？`,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.removeUser()
        }
      })
    },
    enableDisable (type) {
      if (this.checkedUserIds.length > 0) {
        if (type === '1') {
          let flag = this.checkedUserList.some(item => {
            return item.userState === 2
          })
          if (flag) {
            return true
          } else {
            return false
          }
        } else {
          let flag = this.checkedUserList.some(item => {
            return item.userState === 1
          })
          if (flag) {
            return true
          } else {
            return false
          }
        }
      } else {
        return true
      }
    },
    handleForbidden (flag) {
      this.$confirm({
        title: '启用/禁用用户',
        content: `确认要${flag ? '启用' : '禁用'}[${this.checkedUserIds.length}]个用户吗？`,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.handleEnable(flag)
        }
      })
    },
    handleResetPassword () {
      this.$refs.resetPasswordRef.openModal(this.checkedUser.name, false)
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
      this.clearCheckedIds()
      this.getList()
    },
    userInfoUpdate () {
      this.clearCheckedIds()
      this.getList()
    },
    handleFilters (data) {
      this.filteredInfo = data
      this.searchItem.userState = data.userState[0]
      this.getList()
    },
    changePage (pageObj) {
      this.clearCheckedIds()
      this.searchItem.pageSize = pageObj.limit
      this.searchItem.pageIndex = pageObj.page
      this.getList()
    },
    clearCheckedIds () {
      this.checkedUserIds = []
      this.checkedUserList = []
      this.currentUserId = ''
      this.checkedUser = {}
      this.$refs.userTabsRef.currentUserDetail = {}
      this.$refs.userTabsRef.userRoleList = []
      this.$refs.userTabsRef.logData = []
      this.$refs.userTabsRef.logListTotalNums = 0
    },
    async getList () {
      try {
        this.isLoading = true
        const res = await userList(this.searchItem)
        this.userList = res.Data.rows
        this.totalNums = res.Data.totalCount
      } catch (error) {

      } finally {
        this.isLoading = false
      }
    },
    async removeUser () {
      try {
        const res = await deleteUser(this.checkedUserIds)
        if (res.Code === 0) {
          this.$message.success('删除成功')
        } else {
          this.$message.error(res.Message)
        }
        this.setPageIndex()
        this.getList()
        this.clearCheckedIds()
      } catch (error) {}
    },
    async handleEnable (flag) {
      try {
        const res = await enableUser({ userIds: this.checkedUserIds, isEnable: flag })
        if (res.Code === 0) {
          this.$message.success('操作成功')
          this.clearCheckedIds()
          this.getList()
        } else {
          this.$message.error(res.Message)
        }
      } catch (error) {}
    },
    setPageIndex () {
      const totalPage = Math.ceil((this.totalNums - this.checkedUserIds.length) / this.searchItem.pageSize)
      const currentPage = this.searchItem.pageIndex > totalPage ? totalPage : this.searchItem.pageIndex
      this.searchItem.pageIndex = currentPage < 1 ? 1 : currentPage
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    height:calc(100vh - 84px);
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
</style>
