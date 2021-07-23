<template>
  <div>
    <a-modal
      :visible.sync="createVisible"
      title="创建用户"
      @cancel="handleCancel"
      :confirm-loading="loading"
      @ok="onSubmit"
      :width="1300"
      destroyOnClose
      :keyboard="false"
      :maskClosable="false"
    >
      <a-form-model ref="formRef" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="用户姓名" prop="name">
              <a-input v-model.trim="form.name" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="用户编码" prop="number">
              <a-input v-model.trim="form.number" :placeholder="isConfigRule?'该编码由系统自动生成':''" :disabled="isConfigRule" @change="changeInput('number')" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="用户工号" prop="jobNumber">
              <a-input v-model.trim="form.jobNumber" @change="changeInput('jobNumber')">
              </a-input></a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="登录名" prop="account">
              <a-input v-model.trim="form.account" @change="changeInput('account')" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="密码" prop="password">
              <a-input v-model.trim="form.password" disabled />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="确认密码" prop="password">
              <a-input v-model.trim="form.password" disabled />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="所属岗位" prop="postNames">
              <my-input-search :value="form.postNames" @open-search="openChangePost" @clear-value="clearValue('post')"></my-input-search>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="直属领导" prop="leaderName">
              <my-input-search :value="form.leaderName" @open-search="openChangeUser" @clear-value="clearValue('user')"></my-input-search>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="固定电话" prop="fixedTelephone">
              <a-input v-model.trim="form.fixedTelephone" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="移动电话" prop="mobilePhone">
              <a-input v-model.trim="form.mobilePhone" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="Email" prop="email">
              <a-input v-model.trim="form.email" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="联系地址" prop="address">
              <a-input v-model.trim="form.address" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-modal>
    <user-model ref="userModelRef" @change-user="changeUser" select-type="radio"></user-model>
    <post-model ref="postModelRef" @change-post="changepost"></post-model>
  </div>
</template>

<script>
import MyInputSearch from '@/components/MyInputSearch'
import { addUser } from '@/api/user'
import { ifConfigRule } from '@/api/common'
import userModel from '../department/userModel'
import postModel from './postModel'
export default {
  components: { MyInputSearch, userModel, postModel },
  data () {
    let validatorAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('登录名不能为空'))
      } else if (value.length > 30) {
        callback(new Error('登录名长度不能大于30个字符'))
      } else if (this.isAccountRepeat) {
        callback(new Error('登录名不可重复'))
      } else callback()
    }
    let validatorNumber = (rule, value, callback) => {
      if (!this.isConfigRule && value === '') {
        callback(new Error('用户编码不能为空'))
      } else if (this.isNumberRepeat) {
        callback(new Error('编码不可重复'))
      } else callback()
    }
    let validatorJobNumber = (rule, value, callback) => {
      if (this.isJobNumberRepeat) {
        callback(new Error('工号不可重复'))
      } else callback()
    }
    return {
      createVisible: false,
      isConfigRule: false,
      loading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      currentParentId: '', // 当前操作的文件夹的parentId
      selectPostList: [],
      form: {
        name: '',
        number: '',
        jobNumber: '',
        account: '',
        password: '',
        postIds: [],
        postNames: '',
        leaderId: '',
        leaderName: '',
        fixedTelephone: '',
        mobilePhone: '',
        email: '',
        address: ''
      },
      rules: {
        name: { required: true, message: '用户姓名不能为空', trigger: 'blur' },
        account: { required: true, validator: validatorAccount, trigger: ['change', 'blur'] },
        number: { required: true, validator: validatorNumber, trigger: ['change', 'blur'] },
        jobNumber: { required: false, validator: validatorJobNumber, trigger: ['change', 'blur'] },
        password: { required: true, message: '密码不能为空', trigger: 'blur' }
      },
      isAccountRepeat: false,
      isNumberRepeat: false,
      isJobNumberRepeat: false
    }
  },
  methods: {
    changeInput (type) {
      if (type === 'account') {
        this.isAccountRepeat = false
      } else if (type === 'number') {
        this.isNumberRepeat = false
      } else {
        this.isJobNumberRepeat = false
      }
    },
    openChangeUser () {
      this.$refs.userModelRef.openModal([])
    },
    openChangePost () {
      this.$refs.postModelRef.openModal(this.selectPostList)
    },
    changeUser (data) {
      this.form.leaderId = data[0].userId
      this.form.leaderName = data[0].name
    },
    changepost (data) {
      let postIds = []
      let postNames = ''
      data.forEach(item => {
        let obj = {
          departmentId: item.departmentId,
          postId: item.id
        }
        postNames = postNames === '' ? `${item.postName}` : `${postNames}，${item.postName}`
        postIds.push(obj)
      })
      this.form.postIds = postIds
      this.form.postNames = postNames
      this.selectPostList = data
    },
    clearValue (type) {
      if (type === 'post') {
        this.form.postIds = []
        this.form.postNames = ''
        this.selectPostList = []
      } else {
        this.form.leaderId = ''
        this.form.leaderName = ''
      }
    },
    showForm () {
      this.createVisible = true
      this.form = {
        name: '',
        number: '',
        jobNumber: '',
        account: '',
        postIds: [],
        postNames: '',
        leaderId: '',
        leaderName: '',
        fixedTelephone: '',
        mobilePhone: '',
        email: '',
        address: ''
      }
      this.selectPostList = []
      let paw = this.mathRand()
      this.form.password = paw
    },

    handleCancel () {
      this.$refs.formRef.resetFields()
      this.isAccountRepeat = false
      this.isNumberRepeat = false
      this.isJobNumberRepeat = false
      this.createVisible = false
    },
    onSubmit () {
      try {
        this.$refs.formRef.validate(async valid => {
          if (valid) {
            this.loading = true
            const res = await addUser(this.form)
            if (res.Code === 0) {
              this.handleCancel()
              this.$parent.getList()
            } else if (res.Code === 10002) {
              let isNumber = res.Data.indexOf('Number') > -1
              let isAccount = res.Data.indexOf('Account') > -1
              let isJobNumber = res.Data.indexOf('JobNumber') > -1
              if (isNumber) {
                this.isNumberRepeat = true
                this.$refs.formRef.validateField('number')
              }
              if (isAccount) {
                this.isAccountRepeat = true
                this.$refs.formRef.validateField('account')
              }
              if (isJobNumber) {
                this.isJobNumberRepeat = true
                this.$refs.formRef.validateField('jobNumber')
              }
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
