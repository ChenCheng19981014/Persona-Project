<template>
  <div>
    <a-tabs
      @change="changeTab"
      :active-key="activeKey"
    >
      <a-tab-pane
        key="1"
        tab="常规"
      >
        <role-info
          ref="roleInfoRef"
          :form-data="currentRoleDetail"
          :current-role-id="currentRoleId"
          @refresh-list="refreshList"
        />
      </a-tab-pane>
      <a-tab-pane
        key="2"
        tab="包含权限"
      >
        <div class="operation-box margin-bottom">
          <a-button v-if="isEdit" type="primary" class="flex align-center" :disabled="currentRoleId===''" @click="isEdit=false">
            编辑
          </a-button>
          <div v-else>
            <a-button type="primary" @click="handleUpdatePermission" class="margin-right">保存</a-button>
            <a-button @click="cancelUpdate">取消</a-button>
          </div>
        </div>
        <a-tree
          v-model="checkedPermissionKeys"
          checkable
          :disabled="isEdit"
          v-if="permissionData.length"
          defaultExpandAll
          :auto-expand-parent="true"
          :selectable="false"
          :tree-data="permissionData"
          :replaceFields="{
            children:'childList',
            title:'operationName',
            key:'operationId'
          }"
          @select="onSelect"
        />
      </a-tab-pane>
      <a-tab-pane
        key="3"
        tab="包含用户"
      >
        <div class="margin-bottom text-right">
          <a-button type="primary" class="margin-right-xs" @click="openModal('user')" :disabled="currentRoleId===''">添加用户</a-button>
          <a-button :disabled="checkedUserIds.length===0" @click="deleteData('user')">移除用户</a-button>
        </div>
        <user-table
          :data-list="allRoleUserList"
          :data-columns="userColumns"
          :checked-user-ids="checkedUserIds"
          :show-pagination="false"
          id-field="userRoleId"
          @select-row="selectUserRow"
        ></user-table>
      </a-tab-pane>
      <a-tab-pane
        key="4"
        tab="包含岗位"
      >
        <div class="margin-bottom text-right">
          <a-button type="primary" class="margin-right-xs" :disabled="currentRoleId===''" @click="openModal('post')">添加岗位</a-button>
          <a-button :disabled="checkedPostIds.length===0" @click="deleteData('post')">移除岗位</a-button>
        </div>
        <post-table
          :data-list="allRolePostList"
          :data-columns="postColumns"
          :checked-post-ids="checkedPostIds"
          :show-pagination="false"
          id-field="postRoleId"
          @select-row="selectPostRow"
        ></post-table>
      </a-tab-pane>
      <a-tab-pane
        key="5"
        tab="包含部门"
      >
        <div class="margin-bottom text-right">
          <a-button type="primary" class="margin-right-xs" :disabled="currentRoleId===''" @click="openModal('department')">添加部门</a-button>
          <a-button :disabled="checkedDepartmentIds.length===0" @click="deleteData('department')">移除部门</a-button>
        </div>
        <a-table
          :columns="departmentColumns"
          :data-source="allRoleDepartmentList"
          :pagination="false"
          :rowKey="(record)=>record.roleDepartmentId"
          :row-selection="rowSelection"
          :customRow="rowClick">
        </a-table>
      </a-tab-pane>
      <a-tab-pane
        key="6"
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
    <user-model ref="userModelRef" @change-user="selectUser" select-type="checkbox"></user-model>
    <department-model ref="departmentModelRef" @change-department="selectDepartment" select-type="checkbox"></department-model>
    <post-model ref="postModelRef" @change-post="selectPost"></post-model>
  </div>
</template>

<script>
import RoleInfo from './roleInfo.vue'
import UserTable from '../../user/list'
import PostTable from '../../post/list'
import LogTable from '../../../document/components/LogTable.vue'
import departmentTab from './departmentTab'
import permissionTab from './permissionTab'
import userModel from '../../department/userModel'
import departmentModel from '../../post/departmentModel'
import postModel from '../../user/postModel'
import { roleInfo, operationRecord, roleUserList, addRoleUser, delRoleUser, rolePostList, addRolePost, delrolepost, roleDepartmentList, addRoleDepartment, delRoleDepartment } from '@/api/user'
import { permissionList, updatePermission } from '@/api/permission'
export default {
  name: 'DocumentTabs',
  components: {
    RoleInfo,
    UserTable,
    PostTable,
    LogTable,
    departmentTab,
    permissionTab,
    userModel,
    departmentModel,
    postModel
  },
  props: {
    currentRoleId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      id: '',
      isEdit: true,
      activeKey: '1', // 当前激活的tab
      currentRoleDetail: {},
      logSearchItem: {
        pageIndex: 1,
        pageSize: 10
      },
      allRoleUserList: [],
      allRolePostList: [],
      allRoleDepartmentList: [],
      logData: [],
      logListTotalNums: 0,
      permissionData: [],
      checkedPermissionKeys: [],
      checkedUserIds: [],
      checkedPostIds: [],
      checkedDepartmentIds: [],
      userColumns: [
        {
          title: '用户姓名',
          key: 'userName',
          dataIndex: 'userName'
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '用户编码',
          key: 'userNumber',
          dataIndex: 'userNumber'
        },
        {
          title: '用户工号',
          key: 'jobNumber',
          dataIndex: 'jobNumber'
        },
        {
          title: '登录名',
          key: 'account',
          dataIndex: 'account'
        },
        {
          title: '所属角色',
          key: 'roleNames',
          dataIndex: 'roleNames'
        },
        {
          title: '所属岗位',
          key: 'postNames',
          dataIndex: 'postNames'
        },
        {
          title: '所属部门',
          key: 'departmentNames',
          dataIndex: 'departmentNames'
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
      ],
      postColumns: [
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
          title: '所属部门',
          key: 'departmentName',
          dataIndex: 'departmentName'
        },
        {
          title: '岗位描述',
          key: 'description',
          dataIndex: 'description'
        }
      ],
      departmentColumns: [
        {
          title: '部门名称',
          key: 'departmenName',
          dataIndex: 'departmenName'
        },
        {
          title: '部门编码',
          key: 'departmentNumber',
          dataIndex: 'departmentNumber'
        },
        {
          title: '部门负责人',
          key: 'director',
          dataIndex: 'director'
        },
        {
          title: '部门描述',
          key: 'description',
          dataIndex: 'description'
        }
      ],
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
  computed: {
    rowSelection () {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
          this.selectedDepartmentRow({ ids: selectedRowKeys, rows: selectedRows })
        },
        selectedRowKeys: this.checkedDepartmentIds,
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name
          }
        })
      }
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
      this.isEdit = true
      if (key === '1') {
        // 常规
        this.$refs.roleInfoRef.isEdit = true
        this.getRoleInfo(this.currentRoleId)
      } else if (key === '2') {
        // 权限
        this.getRoleList(this.currentRoleId)
      } else if (key === '3') {
        // 用户
        this.getRoleUserList(this.currentRoleId)
      } else if (key === '4') {
        // 岗位
        this.getRolePostList(this.currentRoleId)
      } else if (key === '5') {
        // 部门
        this.getRoleDepartmentList(this.currentRoleId)
      } else if (key === '6') {
        // 操作日志
        this.getOperationList(this.currentRoleId)
      }
    },
    openModal (type) {
      if (type === 'user') {
        this.$refs.userModelRef.openModal([])
      } else if (type === 'post') {
        this.$refs.postModelRef.openModal([])
      } else {
        this.$refs.departmentModelRef.openModal([])
      }
    },
    deleteData (type) {
      this.$confirm({
        title: type === 'user' ? '删除用户' : type === 'post' ? '删除岗位' : '删除部门',
        content: `确认要把[${type === 'user' ? this.checkedUserIds.length : type === 'post' ? this.checkedPostIds.length : this.checkedDepartmentIds.length}]个${type === 'user' ? '用户' : type === 'post' ? '岗位' : '部门'}删除吗？`,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          if (type === 'user') {
            this.delUser()
          } else if (type === 'post') {
            this.delPost()
          } else {
            this.delDepartment()
          }
        }
      })
    },
    selectedDepartmentRow (obj) {
      this.checkedDepartmentIds = obj.ids
    },
    selectUserRow (obj) {
      this.checkedUserIds = obj.ids
    },
    selectPostRow (obj) {
      this.checkedPostIds = obj.ids
    },
    onSelect (selectedKeys) {
      // console.log('selectedKeys', selectedKeys)
      this.checkedPermissionKeys = selectedKeys
    },
    async handleUpdatePermission () {
      try {
        const res = await updatePermission({ roleId: this.currentRoleId, checkedIds: this.checkedPermissionKeys })
        if (res.Code === 0) {
          this.isEdit = true
        } else {
          this.$message.error(res.Message)
        }
      } catch (error) {}
    },
    cancelUpdate () {
      this.isEdit = true
      this.getRoleList(this.currentRoleId)
    },
    selectUser (list) {
      let ids = list.map(item => {
        return item.userId
      })
      this.addUser(ids)
    },
    selectDepartment (list) {
      let ids = list.map(item => {
        return item.id
      })
      this.addDepartment(ids)
    },
    selectPost (list) {
      let ids = list.map(item => {
        return item.id
      })
      this.addPost(ids)
    },
    async getRoleInfo (id) {
      try {
        if (id) {
          const res = await roleInfo({ id })
          this.currentRoleDetail = res.Data
        }
      } catch (error) {}
    },
    async getRoleList (id) {
      try {
        if (id) {
          const res = await permissionList({ roleIds: id })
          this.permissionData = res.Data
          this.checkedPermissionKeys = this.findCheckedPermission(res.Data, [])
        }
      } catch (error) {}
    },
    async getRoleUserList (id) {
      try {
        if (id) {
          const res = await roleUserList({ id })
          this.allRoleUserList = res.Data
        }
      } catch (error) {}
    },
    async addUser (ids) {
      try {
        const res = await addRoleUser({ userIds: ids, roleId: this.currentRoleId })
        if (res.Code === 0) {
          this.$message.success('添加成功')
          this.getRoleUserList(this.currentRoleId)
        } else {
          this.$message.error(res.Message)
        }
      } catch (error) {}
    },
    async delUser () {
      try {
        const res = await delRoleUser(this.checkedUserIds)
        if (res.Code === 0) {
          this.$message.success('删除成功')
          this.getRoleUserList(this.currentRoleId)
        } else {
          this.$message.error(res.Message)
        }
      } catch (error) {}
    },
    async getRolePostList (id) {
      try {
        if (id) {
          const res = await rolePostList({ id })
          this.allRolePostList = res.Data
        }
      } catch (error) {}
    },
    async addPost (ids) {
      try {
        const res = await addRolePost({ postIds: ids, roleId: this.currentRoleId })
        if (res.Code === 0) {
          this.$message.success('添加成功')
          this.getRolePostList(this.currentRoleId)
        } else {
          this.$message.error(res.Message)
        }
      } catch (error) {}
    },
    async delPost () {
      try {
        const res = await delrolepost(this.checkedPostIds)
        if (res.Code === 0) {
          this.$message.success('删除成功')
          this.getRolePostList(this.currentRoleId)
        } else {
          this.$message.error(res.Message)
        }
      } catch (error) {}
    },
    async getRoleDepartmentList (id) {
      try {
        if (id) {
          const res = await roleDepartmentList({ id })
          this.allRoleDepartmentList = res.Data
        }
      } catch (error) {}
    },
    async addDepartment (ids) {
      try {
        const res = await addRoleDepartment({ departmentIds: ids, roleId: this.currentRoleId })
        if (res.Code === 0) {
          this.$message.success('添加成功')
          this.getRoleDepartmentList(this.currentRoleId)
        } else {
          this.$message.error(res.Message)
        }
      } catch (error) {}
    },
    async delDepartment () {
      try {
        const res = await delRoleDepartment(this.checkedDepartmentIds)
        if (res.Code === 0) {
          this.$message.success('删除成功')
          this.getRoleDepartmentList(this.currentRoleId)
        } else {
          this.$message.error(res.Message)
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
    findCheckedPermission (list, checkedIds) {
      list.forEach(item => {
        if (item.isChosen) {
          checkedIds.push(item.operationId)
          if (item.hasChild) {
            this.findCheckedPermission(item.childList, checkedIds)
          }
        }
      })
      return checkedIds
    },
    rowClick (record, index) {
      return {
        on: {
          click: event => {
            this.id = record.roleDepartmentId
            this.selectedDepartmentRow({ ids: [this.id], rows: [record] })
          }
        },
        // 自定义属性，也就是官方文档中的props，可通过条件来控制样式
        style: {
          'background-color': record.roleDepartmentId === this.id ? this.$store.getters.tableSelectColor : index % 2 !== 0 ? this.$store.getters.tableZebraColor : '#fff',
          cursor: 'pointer'
        }
      }
    },
    changeRelationPage (pageObj) {
      this.relationSearchItem.pageSize = pageObj.limit
      this.relationSearchItem.pageIndex = pageObj.page
      this.getRelationList(this.currentRoleId)
    },
    changeLogPage (pageObj) {
      this.logSearchItem.pageSize = pageObj.limit
      this.logSearchItem.pageIndex = pageObj.page
      this.getOperationList(this.currentRoleId)
    }
  }
}
</script>

<style></style>
