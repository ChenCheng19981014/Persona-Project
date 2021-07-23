<template>
  <div>
    <a-modal
      :visible.sync="createVisible"
      title="创建角色"
      width="1300px"
      @cancel="handleCancel"
      @ok="onSubmit"
      destroyOnClose
      :confirm-loading="confirmLoading"
      :keyboard="false"
      :maskClosable="false">
      <div class="max-modal-height">
        <a-tabs type="card" @change="changeTab" :activeKey="activeKey">
          <a-tab-pane key="1" tab="常规">
            <a-form-model ref="formRef" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
              <a-form-model-item label="角色名称" prop="roleName">
                <a-input v-model.trim="form.roleName" />
              </a-form-model-item>
              <a-form-model-item label="角色编码" prop="roleNumber">
                <a-input v-model.trim="form.roleNumber" :placeholder="isConfigRule?'该编码由系统自动生成':''" :disabled="isConfigRule" @change="changeInput"/>
              </a-form-model-item>
              <a-form-model-item label="角色描述" prop="description">
                <a-input v-model.trim="form.description" />
              </a-form-model-item>
            </a-form-model>
          </a-tab-pane>
          <a-tab-pane key="2" tab="包含权限">
            <a-tree
              v-model="checkedPermissionKeys"
              checkable
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
          <a-tab-pane key="3" tab="包含用户">
            <div class="margin-bottom text-right">
              <a-button type="primary" class="margin-right-xs" @click="openModal('user')">添加用户</a-button>
              <a-button :disabled="checkedUserIds.length===0" @click="deleteData('user')">移除用户</a-button>
            </div>
            <user-table
              :data-list="userList"
              :data-columns="userColumns"
              :checked-user-ids="checkedUserIds"
              :show-pagination="false"
              @select-row="selectUserRow"
            ></user-table>
          </a-tab-pane>
          <a-tab-pane key="4" tab="包含岗位">
            <div class="margin-bottom text-right">
              <a-button type="primary" class="margin-right-xs" @click="openModal('post')">添加岗位</a-button>
              <a-button :disabled="checkedPostIds.length===0" @click="deleteData('post')">移除岗位</a-button>
            </div>
            <post-table
              :data-list="postList"
              :data-columns="postColumns"
              :checked-post-ids="checkedPostIds"
              :show-pagination="false"
              @select-row="selectPostRow"
            ></post-table>
          </a-tab-pane>
          <a-tab-pane key="5" tab="包含部门">
            <div class="margin-bottom text-right">
              <a-button type="primary" class="margin-right-xs" @click="openModal('department')">添加部门</a-button>
              <a-button :disabled="checkedDepartmentIds.length===0" @click="deleteData('department')">移除部门</a-button>
            </div>
            <a-table
              :columns="departmentColumns"
              :data-source="departmentList"
              :pagination="false"
              :rowKey="(record)=>record.id"
              :row-selection="rowSelection"
              :customRow="rowClick">
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-modal>
    <user-model ref="userModelRef" @change-user="changeUser" select-type="checkbox"></user-model>
    <department-model ref="departmentModelRef" @change-department="changeDepartment" select-type="checkbox"></department-model>
    <post-model ref="postModelRef" @change-post="changepost"></post-model>
  </div>
</template>

<script>
import { addRole } from '@/api/user'
import { permissionList } from '@/api/permission'
import { ifConfigRule } from '@/api/common'
import userTable from '../user/list'
import postTable from '../post/list'
import departmentTable from '../department/list'
import userModel from '../department/userModel'
import departmentModel from '../post/departmentModel'
import postModel from '../user/postModel'
export default {
  components: {
    userTable, postTable, departmentTable, userModel, departmentModel, postModel
  },
  props: {
    currentDepartment: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    let validatorNunmber = (rule, value, callback) => {
      if (!this.isConfigRule && value === '') {
        callback(new Error('编码不能为空'))
      } else if (this.isNumberRepeat) {
        callback(new Error('编码不可重复'))
      } else callback()
    }
    return {
      createVisible: false,
      isConfigRule: false,
      activeKey: '1',
      confirmLoading: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      currentParentId: '', // 当前操作的文件夹的parentId
      form: {
        roleName: '',
        roleNumber: '',
        description: ''
      },
      rules: {
        roleName: { required: true, message: '角色名称不能为空', trigger: ['change', 'blur'] },
        roleNumber: { required: true, validator: validatorNunmber, trigger: ['change', 'blur'] }
      },
      isNumberRepeat: false,
      userList: [], // 选择得用户列表
      selectUserIds: [], // 选择得用户的id列表
      postList: [],
      departmentList: [],
      checkedUserIds: [],
      checkedPostIds: [],
      checkedDepartmentIds: [],
      permissionData: [],
      checkedPermissionKeys: [],
      userColumns: [
        {
          title: '用户姓名',
          key: 'name',
          dataIndex: 'name'
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
          key: 'name',
          dataIndex: 'name'
        },
        {
          title: '部门编码',
          key: 'number',
          dataIndex: 'number'
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
    openModal (type) {
      if (type === 'user') {
        this.$refs.userModelRef.openModal(this.userList)
      } else if (type === 'post') {
        this.$refs.postModelRef.openModal(this.postList)
      } else {
        this.$refs.departmentModelRef.openModal(this.departmentList)
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
            this.checkedUserIds.forEach(item => {
              this.userList = this.userList.filter(item2 => item2.userId !== item)
            })
          } else if (type === 'post') {
            this.checkedPostIds.forEach(item => {
              this.postList = this.postList.filter(item2 => item2.id !== item)
            })
          } else {
            this.checkedDepartmentIds.forEach(item => {
              this.departmentList = this.departmentList.filter(item2 => item2.id !== item)
            })
          }
        }
      })
    },
    onSelect (selectedKeys) {
      // console.log('selectedKeys', selectedKeys)
      this.checkedPermissionKeys = selectedKeys
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
    changeUser (list) {
      this.userList = list
    },
    changeDepartment (list) {
      this.departmentList = list
    },
    changepost (list) {
      this.postList = list
    },
    changeInput () {
      this.isNumberRepeat = false
    },
    showForm () {
      this.getIfConfigRule()
      this.activeKey = '1'
      this.checkedPermissionKeys = []
      this.userList = []
      this.postList = []
      this.departmentList = []
      this.createVisible = true
      this.getPermissionList()
    },
    changeTab (value) {
      this.activeKey = value
    },
    handleCancel () {
      this.$refs.formRef.resetFields()
      this.isNumberRepeat = false
      this.createVisible = false
    },
    onSubmit () {
      try {
        this.$refs.formRef.validate(async valid => {
          if (valid) {
            this.confirmLoading = true
            if (this.checkedPermissionKeys.length === 0) {
              this.activeKey = '2'
              this.$message.error('请设置角色')
            } else if (this.userList.length === 0) {
              this.activeKey = '3'
              this.$message.error('请选择用户')
            } else if (this.postList.length === 0) {
              this.activeKey = '4'
              this.$message.error('请选择岗位')
            } else if (this.departmentList.length === 0) {
              this.activeKey = '5'
              this.$message.error('请选择部门')
            } else {
              let users = this.userList.map(item => {
                return item.userId
              })
              let posts = this.postList.map(item => {
                return item.id
              })
              let departments = this.departmentList.map(item => {
                return item.id
              })
              let data = { ...this.form, permissions: this.checkedPermissionKeys, users, posts, departments }
              const res = await addRole(data)
              if (res.Code === 0) {
                this.handleCancel()
                this.$parent.getList()
              } else if (res.Code === 10002) {
                this.isNumberRepeat = true
                this.$refs.formRef.validateField('roleNumber')
                this.activeKey = '1'
              } else {
                this.$message.error(res.Message)
                this.handleCancel()
              }
            }
          } else {
            this.activeKey = '1'
          }
        })
      } catch (error) {

      } finally {
        this.confirmLoading = false
      }
    },
    rowClick (record, index) {
      return {
        on: {
          click: event => {
            this.id = record.id
            this.selectedDepartmentRow({ ids: [this.id], rows: [record] })
          }
        },
        // 自定义属性，也就是官方文档中的props，可通过条件来控制样式
        style: {
          'background-color': record.id === this.id ? this.$store.getters.tableSelectColor : index % 2 !== 0 ? this.$store.getters.tableZebraColor : '#fff',
          cursor: 'pointer'
        }
      }
    },
    async getPermissionList () {
      try {
        const res = await permissionList({})
        if (res.Code === 0) {
          this.permissionData = res.Data
        }
      } catch (error) {
        return error
      }
    },
    async getIfConfigRule () {
      const res = await ifConfigRule({ kind: 13 })
      if (res.Code === 0) {
        this.isConfigRule = res.Data !== null
        this.rules.number.required = false
      }
    }
  }
}
</script>
