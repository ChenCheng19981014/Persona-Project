<template>
  <a-modal
    :visible.sync="visible"
    :title="isShowOldPassword?'修改密码':`重置密码 - [${userName}]`"
    @cancel="handleCancel"
    :confirm-loading="loading"
    @ok="onSubmit"
    destroyOnClose
    :keyboard="false"
    :maskClosable="false"
  >
    <a-form-model ref="formRef" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
      <a-form-model-item label="旧密码" prop="originalPassword" v-if="isShowOldPassword">
        <a-input v-model.trim="form.originalPassword" @change="changeInput" /></a-input>
      </a-form-model-item>
      <a-form-model-item label="新密码" prop="password">
        <a-input v-model.trim="form.password"/>
      </a-form-model-item>
      <a-form-model-item label="确认新密码" prop="confirmPassword">
        <a-input v-model.trim="form.confirmPassword" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { updatePassword } from '@/api/user'
import { updatePwd } from '@/api/login'
export default {
  props: {
    currentUserId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: false,
      loading: false,
      isShowOldPassword: false,
      isOriginalPasswordError: false,
      userName: '',
      form: {
        password: '',
        confirmPassword: ''
      },
      rules: {
        originalPassword: [{ required: true, validator: this.validateOriginalPassword }],
        password: [{ required: true, message: '密码不能为空' }],
        confirmPassword: [{ required: true, validator: this.validatePassword }]
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }
  },
  methods: {
    openModal (name, isShowOldPassword) {
      this.isShowOldPassword = isShowOldPassword
      this.isOriginalPasswordError = false
      if (isShowOldPassword) {
        this.form = {
          originalPassword: '',
          password: '',
          confirmPassword: ''
        }
      } else {
        this.form = {
          password: '',
          confirmPassword: ''
        }
      }
      this.visible = true
      this.userName = name
    },
    changeInput () {
      this.isOriginalPasswordError = false
    },
    handleCancel () {
      this.visible = false
    },
    validateOriginalPassword (rule, value, callback) {
      if (value === '') {
        callback(new Error('旧密码不能为空'))
      } else if (this.isOriginalPasswordError) {
        callback(new Error('旧密码不正确'))
      } else {
        callback()
      }
    },
    validatePassword (rule, value, callback) {
      if (value === '') {
        callback(new Error('确认新密码不能为空'))
      } else if (value !== this.form.password) {
        callback(new Error('确认新密码与新密码不一致'))
      } else {
        callback()
      }
    },
    async onSubmit () {
      try {
        this.$refs.formRef.validate(async valid => {
          if (valid) {
            this.loading = true
            if (this.isShowOldPassword) {
              const res = await updatePwd({ userId: this.currentUserId, originalPassword: this.form.originalPassword, newPassword: this.form.password })
              if (res.Code === 0) {
                this.$message.success('操作成功')
                this.handleCancel()
                return this.$store.dispatch('Logout').then(() => {
                  this.$router.push({ name: 'login' })
                })
              } else if (res.Code === 10011) {
                this.isOriginalPasswordError = true
                this.$refs.formRef.validateField('originalPassword')
              } else {
                this.$message.error(res.Message)
              }
            } else {
              const res = await updatePassword({ userId: this.currentUserId, password: this.form.password })
              if (res.Code === 0) {
                this.$message.success('操作成功')
                this.$parent.getList()
                this.handleCancel()
              } else {
                this.$message.error(res.Message)
              }
            }
          }
        })
      } catch (error) {
        return error
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
