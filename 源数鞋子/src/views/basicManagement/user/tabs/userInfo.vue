<template>
  <div class="margin-right-lg">
    <div class="operation-box margin-bottom">
      <a-button v-if="isEdit" type="primary" class="flex align-center" :disabled="currentUserId===''" @click="isEdit=false">
        编辑
      </a-button>
      <div v-else>
        <a-button type="primary" @click="updateInfo" class="margin-right">保存</a-button>
        <a-button @click="cancelUpdate">取消</a-button>
      </div>
    </div>
    <a-form-model :model="detailData" ref="formRef" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="用户姓名" prop="name">
            <a-input v-model.trim="detailData.name" :disabled="isEdit" />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="用户编码" :label-col="labelCol" prop="userNumber">
            <a-input v-model.trim="detailData.userNumber" :disabled="isEdit?true:detailData.isNumberEdit?false:true" @input="changeInput('userNumber')" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="工号" prop="jobNumber">
            <a-input v-model.trim="detailData.jobNumber" :disabled="isEdit" @change="changeInput('jobNumber')" />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="登录名" prop="account">
            <a-input v-model.trim="detailData.account" :disabled="isEdit" @input="changeInput('account')" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="所属岗位" prop="postNames">
            <my-input-search :value="detailData.postNames" @open-search="openChangePost" :search-abled="isEdit" @clear-value="clearValue('post')"></my-input-search>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="直属领导" prop="leader">
            <my-input-search :value="detailData.leader" @open-search="openChangeUser" :search-abled="isEdit" @clear-value="clearValue('user')"></my-input-search>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="固定电话" prop="fixedTelephone">
            <a-input v-model.trim="detailData.fixedTelephone" :disabled="isEdit" />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="移动电话" prop="mobilePhone">
            <a-input v-model.trim="detailData.mobilePhone" :disabled="isEdit" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="Email" prop="email">
            <a-input v-model.trim="detailData.email" :disabled="isEdit"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="联系地址" prop="address">
            <a-input v-model.trim="detailData.address" :disabled="isEdit"/>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="修改用户" :label-col="labelCol" :wrapper-col="wrapperCol" prop="updateUser">
            <a-input v-model.trim="detailData.updateUser" :disabled="true"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="修改时间" :label-col="labelCol" :wrapper-col="wrapperCol" prop="updateTime">
            <a-date-picker
              v-model="detailData.updateTime"
              show-time
              type="date"
              placeholder=""
              style="width: 100%;"
              :disabled="true"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="创建用户" :label-col="labelCol" :wrapper-col="wrapperCol" prop="createUser">
            <a-input v-model.trim="detailData.createUser" :disabled="true"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="创建时间" :label-col="labelCol" :wrapper-col="wrapperCol" prop="createTime">
            <a-date-picker
              v-model="detailData.createTime"
              show-time
              type="date"
              placeholder=""
              style="width: 100%;"
              :disabled="true"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <user-model ref="userModelRef" @change-user="changeUser" select-type="radio"></user-model>
    <post-model ref="postModelRef" @change-post="changePost"></post-model>
  </div>
</template>

<script>
import MyInputSearch from '@/components/MyInputSearch'
import userModel from '../../department/userModel'
import postModel from '../postModel'
import moment from 'moment'
import { updateUsual } from '@/api/user'
export default {
  components: { MyInputSearch, userModel, postModel },
  props: {
    formData: {
      type: Object,
      default: () => {}
    },
    currentUserId: {
      type: String,
      default: ''
    }
  },
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
    let validatorNunmber = (rule, value, callback) => {
      if (value === '') {
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
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      selectRow: '',
      detailData: {},
      initialDetailData: {},
      selectPostList: [],
      isEdit: true,
      isAccountRepeat: false,
      isNumberRepeat: false,
      isJobNumberRepeat: false,
      statusList: [
        {
          value: 1,
          name: '拟制'
        }, {
          value: 2,
          name: '归档'
        }, {
          value: 3,
          name: '发布'
        }, {
          value: 4,
          name: '废止'
        }
      ],
      rules: {
        name: [{ required: true, message: '文档名称不能为空', trigger: ['change', 'blur'] }],
        userNumber: [{ required: true, validator: validatorNunmber, trigger: ['change', 'blur'] }],
        account: [{ required: true, validator: validatorAccount, trigger: ['change', 'blur'] }],
        jobNumber: [{ required: false, validator: validatorJobNumber, trigger: ['change', 'blur'] }]
      }
    }
  },
  watch: {
    formData (val) {
      this.detailData = { ...val }
      this.detailData.createTime = val.createTime ? moment(val.createTime) : ''
      this.detailData.updateTime = val.updateTime ? moment(val.updateTime) : ''
      let postNames = ''
      if (val.postList && val.postList.length > 0) {
        val.postList.forEach(item => {
          postNames = postNames === '' ? `${item.postName}` : `${postNames}，${item.postName}`
        })
        this.selectPostList = val.postList
      }
      this.detailData.postNames = postNames
      this.initialDetailData = { ...this.detailData }
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
    async updateInfo () {
      try {
        this.$refs.formRef.validate(async valid => {
          if (valid) {
            const data = {
              userId: this.currentUserId,
              name: this.detailData.name,
              userNumber: this.detailData.userNumber,
              jobNumber: this.detailData.jobNumber,
              account: this.detailData.account,
              leaderId: this.detailData.leaderId,
              mobilePhone: this.detailData.mobilePhone,
              fixedTelephone: this.detailData.fixedTelephone,
              email: this.detailData.email,
              address: this.detailData.address,
              postIds: this.detailData.postList
            }
            const res = await updateUsual(data)
            if (res.Code === 0) {
              this.$message.success('修改成功')
              this.isEdit = true
              this.$emit('refresh-list')
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
            }
          }
        })
      } catch (error) {
        return error
      }
    },
    changeUser (data) {
      this.detailData.leaderId = data[0].userId
      this.detailData.leader = data[0].name
    },
    changePost (data) {
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
      this.detailData = { ...this.detailData }
      this.detailData.postList = postIds
      this.detailData.postNames = postNames
      this.selectPostList = data
    },
    clearValue (type) {
      if (type === 'post') {
        this.detailData = { ...this.detailData }
        this.detailData.postList = []
        this.detailData.postNames = ''
        this.selectPostList = []
      } else {
        this.detailData.leaderId = ''
        this.detailData.leader = ''
      }
    },
    openChangeUser () {
      this.$refs.userModelRef.openModal([])
    },
    openChangePost () {
      this.$refs.postModelRef.openModal(this.selectPostList)
    },
    cancelUpdate () {
      this.$refs.formRef.resetFields()
      this.detailData = { ...this.initialDetailData }
      this.isEdit = true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
