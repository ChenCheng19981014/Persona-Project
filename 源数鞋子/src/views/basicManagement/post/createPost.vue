<template>
  <div>
    <a-modal
      :visible.sync="createVisible"
      title="创建岗位"
      @cancel="handleCancel"
      :confirm-loading="loading"
      @ok="onSubmit"
      :keyboard="false"
      :maskClosable="false"
    >
      <a-form-model ref="formRef" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
        <a-form-model-item label="岗位名称" prop="name">
          <a-input v-model.trim="form.name" />
        </a-form-model-item>
        <a-form-model-item label="岗位编码" prop="number">
          <a-input v-model.trim="form.number" @change="changeInput" :placeholder="isConfigRule?'该编码由系统自动生成':''" :disabled="isConfigRule" />
        </a-form-model-item>
        <a-form-model-item label="所属部门" prop="departmentName">
          <my-input-search :value="form.departmentName" @open-search="openChangeDepartment" @clear-value="clearValue"></my-input-search>
        </a-form-model-item>
        <a-form-model-item label="岗位描述" prop="description">
          <a-input v-model.trim="form.description" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <department-model ref="departmentModelRef" @change-department="changeDepartment" select-type="radio"></department-model>
  </div>
</template>

<script>
import MyInputSearch from '@/components/MyInputSearch'
import { createPost } from '@/api/user'
import { ifConfigRule } from '@/api/common'
import departmentModel from './departmentModel'
export default {
  components: { MyInputSearch, departmentModel },
  data () {
    let validatorNunmber = (rule, value, callback) => {
      if (!this.isConfigRule && value === '') {
        callback(new Error('编码不能为空'))
      }
      if (this.isNumberRepeat) {
        callback(new Error('编码不可重复'))
      } else callback()
    }
    // let validatorDepartment = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('所属部门不能为空'))
    //   } else callback()
    // }
    return {
      createVisible: false,
      isConfigRule: false, // 是否配置了编码规则
      loading: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      currentParentId: '', // 当前操作的文件夹的parentId
      form: {
        name: '',
        number: '',
        departmentId: undefined,
        departmentName: '',
        description: ''
      },
      rules: {
        name: { required: true, message: '岗位名称不能为空', trigger: ['change', 'blur'] },
        number: { required: true, validator: validatorNunmber, trigger: ['change', 'blur'] },
        // department: [{ required: true, validator: validatorDepartment, trigger: ['change'] }]
        departmentName: { required: true, message: '所属部门不能为空', trigger: ['change'] }
      },
      isNumberRepeat: false
    }
  },
  methods: {
    changeInput () {
      this.isNumberRepeat = false
    },
    openChangeDepartment () {
      this.$refs.departmentModelRef.openModal([])
    },
    showForm () {
      this.getIfConfigRule()
      this.createVisible = true
      let paw = this.mathRand()
      this.form.password = paw
    },
    changeDepartment (data) {
      this.form.departmentId = data[0].id
      this.form.departmentName = data[0].name
      this.$refs.formRef.clearValidate('departmentName')
    },
    clearValue () {
      this.form.departmentId = ''
      this.form.departmentName = ''
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
            this.loading = true
            const res = await createPost(this.form)
            if (res.Code === 0) {
              this.handleCancel()
              this.$parent.getList()
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
    mathRand () {
      let num = ''
      for (var i = 0; i < 6; i++) {
        num += Math.floor(Math.random() * 10)
      }
      return num
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

<style lang="less" scoped></style>
