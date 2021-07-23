<template>
  <div class="margin-right-lg">
    <div class="operation-box margin-bottom">
      <a-button v-if="isEdit" type="primary" class="flex align-center" :disabled="currentCodeId===''" @click="isEdit=false">
        编辑
      </a-button>
      <div v-else>
        <a-button type="primary" @click="updateInfo" class="margin-right">保存</a-button>
        <a-button @click="cancelUpdate">取消</a-button>
      </div>
    </div>
    <a-form-model :model="detailData" :rules="rules" ref="formRef" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-row>
        <a-col :span="16">
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="编码规则名称" prop="name">
                <a-input v-model.trim="detailData.name" :disabled="isEdit" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="编码对象" prop="objectKind">
                <a-select v-model="detailData.objectKind" :disabled="isEdit">
                  <a-select-option v-for="item in allTypeList" :value="item.value" :key="item.value">
                    {{ item.text }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="允许修改" prop="isEdit">
                <a-switch :disabled="isEdit" v-model="detailData.isEdit"></a-switch>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="默认规则" prop="isDefault">
                <a-switch :disabled="isEdit" v-model="detailData.isDefault"></a-switch>
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
                  format="YYYY-MM-DD HH:mm:ss"
                />
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
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="备注" prop="remark" >
            <a-textarea v-model.trim="detailData.remark" :auto-size="{ minRows: 8, maxRows: 16 }" :disabled="isEdit"/>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import moment from 'moment'
import { updateNumberRule } from '@/api/numberRule'
export default {
  props: {
    formData: {
      type: Object,
      default: () => {}
    },
    currentCodeId: {
      type: String,
      default: ''
    },
    allTypeList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      selectRow: '',
      detailData: {
        createTime: null,
        updateTime: null,
        catalogKind: 1
      },
      initialDetailData: {},
      isEdit: true,
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
        }, {
          value: 5,
          name: '检出'
        }
      ],
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: ['change', 'blur'] },
          { max: 30, message: '名称的长度不能大于30个字符', trigger: 'blur' }
        ]
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
    async updateInfo () {
      try {
        this.$refs.formRef.validate(async valid => {
          if (valid) {
            let data = {
              id: this.detailData.id,
              name: this.detailData.name,
              remark: this.detailData.remark,
              objectKind: this.detailData.objectKind,
              isDefault: this.detailData.isDefault,
              isEdit: this.detailData.isEdit
            }
            const res = await updateNumberRule(data)
              if (res.Code === 0) {
                this.$message.success('修改成功')
                this.isEdit = true
                this.$emit('refresh-list')
              } else {
                this.$message.error(res.Message)
              }
          }
        })
      } catch (error) {
        return error
      }
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
