<template>
  <div class="margin-right-lg">
    <div class="operation-box margin-bottom">
      <a-button v-if="isEdit" type="primary" class="flex align-center" :disabled="currentPostId===''" @click="isEdit=false">
        编辑
      </a-button>
      <div v-else>
        <a-button type="primary" @click="updateInfo" class="margin-right">保存</a-button>
        <a-button @click="cancelUpdate">取消</a-button>
      </div>
    </div>
    <a-form-model :model="detailData" ref="formRef" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-row>
        <a-col :span="16">
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="岗位名称" prop="postName">
                <a-input v-model.trim="detailData.postName" :disabled="isEdit" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="岗位编码" prop="postNumber">
                <a-input v-model.trim="detailData.postNumber" :disabled="isEdit?true:detailData.isNumberEdit?false:true" @input="changeInput"/>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="所属部门" prop="departmentName">
                <my-input-search :value="detailData.departmentName" @open-search="openChangeDepartment" :search-abled="true"></my-input-search>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="修改用户" prop="updateUser">
                <a-input v-model.trim="detailData.updateUser" :disabled="true"/>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="修改时间" prop="updateTime">
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
            <a-col :span="12">
              <a-form-model-item label="创建用户" prop="createUser">
                <a-input v-model.trim="detailData.createUser" :disabled="true"/>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="创建时间" prop="createTime">
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
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="岗位描述" prop="description">
            <a-textarea v-model.trim="detailData.description" :auto-size="{ minRows: 12, maxRows: 20 }" :disabled="isEdit"/>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <department-model ref="departmentModelRef" @change-department="changeDepartment" select-type="radio"></department-model>
  </div>
</template>

<script>
import MyInputSearch from '@/components/MyInputSearch'
import departmentModel from '../departmentModel'
import moment from 'moment'
import { updatePostInfo } from '@/api/user'
export default {
  components: { MyInputSearch, departmentModel },
  props: {
    formData: {
      type: Object,
      default: () => {}
    },
    currentPostId: {
      type: String,
      default: ''
    }
  },
  data () {
    let validatorNunmber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('编码不能为空'))
      }
      if (this.isNumberRepeat) {
        callback(new Error('编码不可重复'))
      } else callback()
    }
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      selectRow: '',
      detailData: {},
      initialDetailData: {},
      isEdit: true,
      isNumberRepeat: false,
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
        postName: [{ required: true, message: '名称不能为空', trigger: ['change', 'blur'] }],
        postNumber: [{ required: true, validator: validatorNunmber, trigger: ['change', 'blur'] }]
      }
    }
  },
  watch: {
    formData (val) {
      this.detailData = val
      this.detailData.createTime = val.createTime ? moment(val.createTime) : ''
      this.detailData.updateTime = val.updateTime ? moment(val.updateTime) : ''
      this.initialDetailData = { ...this.detailData }
    }
  },
  methods: {
    changeInput () {
      this.isNumberRepeat = false
    },
    async updateInfo () {
      try {
        this.$refs.formRef.validate(async valid => {
          if (valid) {
            const data = {
              id: this.currentPostId,
              postName: this.detailData.postName,
              postNumber: this.detailData.postNumber,
              departmentId: this.detailData.departmentId,
              description: this.detailData.description
            }
            const res = await updatePostInfo(data)
            if (res.Code === 0) {
              this.$message.success('修改成功')
              this.isEdit = true
              this.$emit('refresh-list')
            } else if (res.Code === 10002) {
              this.isNumberRepeat = true
              this.$refs.formRef.validateField('postNumber')
            } else {
              this.$message.error(res.Message)
            }
          }
        })
      } catch (error) {
        return error
      }
    },
    changeDepartment (data) {
      this.detailData.departmentId = data[0].id
      this.detailData.departmentName = data[0].name
      this.$refs.formRef.clearValidate('departmentName')
    },
    openChangeDepartment () {
      this.$refs.departmentModelRef.openModal([])
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
