<template>
  <div class="container">
    <height-drag>
      <div slot="top" class="full-height flex flex-column">
        <div>
          <div class="page-title">角色管理</div>
          <div class="flex margin-bottom justify-between align-center">
            <div class="flex btn-box">
              <a-button type="primary" class="margin-right-xs" @click="handleCreate">
                <my-icon type="icon-xinjian" class="btn-icon-size"></my-icon>
                新建角色
              </a-button>
              <a-button
                class="margin-right-xs"
                :disabled="checkedRoleIds.length===0"
                @click="handleDelete"
              >
                <my-icon type="icon-shanchu" class="btn-icon-size"></my-icon>
                删除角色
              </a-button>
              <a-button
                class="margin-right-xs"
                :disabled="enableDisable('2')"
                @click="handleForbidden(true)"
              >
                <my-icon type="icon-qiyongyonghu" class="btn-icon-size"></my-icon>
                启用角色
              </a-button>
              <a-button
                :disabled="enableDisable('1')"
                @click="handleForbidden(false)"
              >
                <my-icon type="icon-jinyongyonghu" class="btn-icon-size"></my-icon>
                禁用角色
              </a-button>
            </div>
            <my-search default-value="nameFilter" :list="searchLabel" @handle-search="handleSearch"></my-search>
          </div>
          <div style="flex:1">
            <list
              :is-loading="isLoading"
              :data-list="allRoleList"
              :search-item="searchItem"
              :total-nums="totalNums"
              :checked-role-ids="checkedRoleIds"
              @select-row="selectRow"
              @change-page="changePage"
              @handle-filters="handleFilters"
            ></list>
          </div>
        </div>
      </div>
      <div slot="bottom">
        <tabs
          ref="roleTabsRef"
          :current-role-id="currentRoleId"
          :is-possible-edit="infoIsPossibleEdit"
          @refresh-list="roleInfoUpdate"
        ></tabs>
      </div>
    </height-drag>
    <create-role ref="createRoleRef" :current-role="currentRole"></create-role>
  </div>
</template>

<script>
import HeightDrag from '@/components/HeightDrag'
import MySearch from '@/components/MySearch'
import List from './list'
import Tabs from './tabs/index'
import SearchForm from './searchForm'
import CreateRole from './createRole'
import { roleList, deleteRole, enableRole } from '@/api/user'
export default {
  name: 'Error',
  components: { HeightDrag, MySearch, List, Tabs, SearchForm, CreateRole },
  data () {
    return {
      searchLabel: [
        {
          name: '角色名称',
          value: 'nameFilter'
        },
        {
          name: '角色编码',
          value: 'numberFilter'
        },
        {
          name: '修改用户',
          value: 'updateUser'
        }
      ],
      isLoading: false,
      infoIsPossibleEdit: false,
      allRoleList: [],
      totalNums: 0,
      currentRoleId: '',
      checkedRoleIds: [],
      checkedRoleList: [],
      currentRole: {},
      searchItem: {
        pageIndex: 1,
        pageSize: 10
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    selectRow (obj) {
      this.checkedRoleIds = obj.ids
      this.currentRoleId = obj.ids[0]
      this.checkedRoleList = obj.rows
      if (this.checkedRoleIds.length === 1) {
        this.currentRole = obj.rows[0]
        if (this.$refs.roleTabsRef.activeKey === '1') {
          // 常规信息
          this.$refs.roleTabsRef.$refs.roleInfoRef.isEdit = true
          this.$refs.roleTabsRef.getRoleInfo(this.currentRoleId)
        } else if (this.$refs.roleTabsRef.activeKey === '2') {
          // 包含权限
          this.$refs.roleTabsRef.getRoleList(this.currentRoleId)
        } else if (this.$refs.roleTabsRef.activeKey === '3') {
          // 包含用户
          this.$refs.roleTabsRef.getRoleUserList(this.currentRoleId)
        } else if (this.$refs.roleTabsRef.activeKey === '4') {
          // 包含岗位
          this.$refs.roleTabsRef.getRolePostList(this.currentRoleId)
        } else if (this.$refs.roleTabsRef.activeKey === '5') {
          // 包含部门
          this.$refs.roleTabsRef.getRoleDepartmentList(this.currentRoleId)
        } else {
          // 操作日志
          this.$refs.roleTabsRef.getOperationList(this.currentRoleId)
        }
      } else if (this.checkedRoleIds.length === 0) {
        this.clearCheckedIds()
      }
    },
    handleCreate () {
      this.$refs.createRoleRef.showForm()
    },
    handleDelete () {
      this.$confirm({
        title: '删除角色',
        content: `确认要把[${this.checkedRoleIds.length}]个角色删除吗？`,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.removeRole()
        }
      })
    },
    enableDisable (type) {
      if (this.checkedRoleIds.length > 0) {
        if (type === '1') {
          let flag = this.checkedRoleList.some(item => {
            return item.roleState === 2
          })
          if (flag) {
            return true
          } else {
            return false
          }
        } else {
          let flag = this.checkedRoleList.some(item => {
            return item.roleState === 1
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
        title: '启用/禁用角色',
        content: `确认要${flag ? '启用' : '禁用'}[${this.checkedRoleIds.length}]个角色吗？`,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.handleEnable(flag)
        }
      })
    },
    roleInfoUpdate () {
      this.clearCheckedIds()
      this.getList()
    },
    handleSearch (data) {
      this.searchItem.nameFilter = ''
      this.searchItem.numberFilter = ''
      this.searchItem.updateUser = ''
      this.searchItem[data.searchCondition] = data.inputValue
      this.searchItem.pageIndex = 1
      this.clearCheckedIds()
      this.getList()
    },
    handleFilters (data) {
      // this.searchItem.roleState = data.roleState === null ? null : data.roleState.length === 0 ? null : data.roleState[0]
      this.searchItem.roleState = data.roleState[0]
      this.getList()
    },
    changePage (pageObj) {
      this.clearCheckedIds()
      this.searchItem.pageSize = pageObj.limit
      this.searchItem.pageIndex = pageObj.page
      this.getList()
    },
    clearCheckedIds () {
      this.checkedRoleIds = []
      this.checkedRoleList = []
      this.currentRoleId = ''
      this.currentRole = {}
      this.$refs.roleTabsRef.currentRoleDetail = {}
      this.$refs.roleTabsRef.allRoleUserList = []
      this.$refs.roleTabsRef.allRolePostList = []
      this.$refs.roleTabsRef.allRoleDepartmentList = []
      this.$refs.roleTabsRef.logData = []
      this.$refs.roleTabsRef.logListTotalNums = 0
    },
    async getList () {
      try {
        this.isLoading = true
        const res = await roleList(this.searchItem)
        this.allRoleList = res.Data.rows
        this.totalNums = res.Data.totalCount
      } catch (error) {

      } finally {
        this.isLoading = false
      }
    },
    async removeRole () {
      try {
        const res = await deleteRole(this.checkedRoleIds)
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
        const res = await enableRole({ roleIds: this.checkedRoleIds, isEnable: flag })
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
      const totalPage = Math.ceil((this.totalNums - this.checkedRoleIds.length) / this.searchItem.pageSize)
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
