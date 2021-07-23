<template>
  <div>
    <a-modal
      :visible.sync="createVisible"
      title="创建部门"
      @cancel="handleCancel"
      :confirm-loading="loading"
      @ok="onSubmit"
      destroyOnClose
      :keyboard="false"
      :maskClosable="false"
    >
      <a-form-model ref="formRef" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
        <a-form-model-item label="部门名称" prop="name">
          <a-input v-model.trim="form.name" />
        </a-form-model-item>
        <a-form-model-item label="部门编码" prop="number">
          <a-input v-model.trim="form.number" :placeholder="isConfigRule?'该编码由系统自动生成':''" :disabled="isConfigRule" @change="changeInput"/>
        </a-form-model-item>
        <a-form-model-item label="上级部门" v-if="currentDepartment.id">
          <a-input v-model.trim="currentDepartment.name" disabled />
        </a-form-model-item>
        <a-form-model-item label="部门负责人" prop="directorName">
          <my-input-search :value="form.directorName" @open-search="openChangeUser" @clear-value="clearValue"></my-input-search>
        </a-form-model-item>
        <a-form-model-item label="部门描述" prop="description">
          <a-input v-model.trim="form.description" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <user-model ref="userModelRef" @change-user="changeUser" select-type="radio"></user-model>
  </div>
</template>

<script>
import MyInputSearch from '@/components/MyInputSearch'
import { addDepartment } from '@/api/user'
import userModel from './userModel'
import { ifConfigRule } from '@/api/common'
export default {
  components: { MyInputSearch, userModel },
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
      isConfigRule: false, // 是否配置了编码规则
      loading: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      currentParentId: '', // 当前操作的文件夹的parentId
      form: {
        parentId: '',
        name: '',
        number: '',
        directorId: '',
        directorName: '',
        description: ''
      },
      checkedUserList: [],
      rules: {
        name: { required: true, message: '部门名称不能为空', trigger: ['change', 'blur'] },
        number: { required: true, validator: validatorNunmber, trigger: ['change', 'blur'] }
      },
      isNumberRepeat: false
    }
  },
  methods: {
    changeInput () {
      this.isNumberRepeat = false
    },
    showForm () {
      this.getIfConfigRule()
      this.createVisible = true
      this.form = {
        parentId: '',
        name: '',
        number: '',
        directorId: '',
        directorName: '',
        description: ''
      }
    },
    changeUser (data) {
      this.form.directorId = data[0].userId
      this.form.directorName = data[0].name
      // this.checkedUserList = data
    },
    handleCancel () {
      this.$refs.formRef.resetFields()
      // this.checkedUserList = []
      this.isNumberRepeat = false
      this.createVisible = false
    },
    openChangeUser () {
      // this.$refs.userModelRef.openModal(this.checkedUserList)
      this.$refs.userModelRef.openModal([])
    },
    clearValue () {
      this.form.directorId = ''
      this.form.directorName = ''
    },
    onSubmit () {
      try {
        this.$refs.formRef.validate(async valid => {
          if (valid) {
            this.loading = true
            this.form.parentId = this.currentDepartment.id ? this.currentDepartment.id : ''
            const res = await addDepartment(this.form)
            if (res.Code === 0) {
              this.handleCancel()
              this.$parent.clearCheckedIds()
              this.$emit('update-tree-list', this.form.parentId)
            } else if (res.Code === 10002) {
              this.isNumberRepeat = true
              this.$refs.formRef.validateField('number')
            } else {
              this.$message.error(res.Message)
              this.handleCancel()
            }
          } else {
            return false
          }
        })
      } catch (error) {

      } finally {
        this.loading = false
      }
    },
    async getIfConfigRule () {
      const res = await ifConfigRule({ kind: 12 })
      if (res.Code === 0) {
        // console.log(res.Data)
        this.isConfigRule = res.Data !== null
        this.rules.number.required = false
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
