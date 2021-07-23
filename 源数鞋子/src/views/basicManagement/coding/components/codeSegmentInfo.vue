<template>
  <a-modal
    :visible.sync="visible"
    :title="title"
    @cancel="handleCancel"
    :confirm-loading="loading"
    @ok="onSubmit"
    destroyOnClose
    :keyboard="false"
    :maskClosable="false"
  >
    <a-form-model ref="formRef" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
      <a-form-model-item label="类型" prop="fieldType">
        <a-select v-model="form.fieldType" placeholder="please select your zone" @change="changeType">
          <a-select-option v-for="item in typeData" :value="item.value" :key="item.value">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="元素来源" prop="sourceType" v-if="form.fieldType===2">
        <a-input v-if="form.fieldType===2" v-model.trim="form.sourceType" disabled />
        <!-- <a-select v-if="form.type===3" v-model="form.source" :disabled="!form.type">
          <a-select-option v-for="item in sourceData" :value="item.value" :key="item.value">
            {{ item.name }}
          </a-select-option>
        </a-select> -->
      </a-form-model-item>
      <a-form-model-item label="长度" prop="length">
        <a-input-number
          v-model="form.length"
          :min="1"
          :max="25"
          :disabled="form.fieldType===1 || form.fieldType===2"
          class="full-width"
          @change="changeLength" />
      </a-form-model-item>
      <a-form-model-item label="取值" prop="value" v-if="form.fieldType===1">
        <a-input v-model.trim="form.value" :maxLength="25" @change="changeValue('value')" :disabled="!form.fieldType" />
      </a-form-model-item>
      <a-form-model-item label="取值" prop="dateFormatType" v-if="form.fieldType===2">
        <a-select v-model="form.dateFormatType" @change="changeValue('date')" :disabled="!form.fieldType">
          <a-select-option v-for="item in dateData" :value="item.value" :key="item.value">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="起始值" prop="startNumber" v-if="form.fieldType===3" >
        <a-input-number v-model="form.startNumber" class="full-width" @change="changeLength" />
      </a-form-model-item>
      <a-form-model-item label="步长" prop="step" v-if="form.fieldType===3">
        <a-input-number v-model="form.step" class="full-width" :min="1" :max="99" />
      </a-form-model-item>
      <a-form-model-item label="分隔符" prop="separator">
        <a-input v-model.trim="form.separator" :maxLength="1" :disabled="!form.fieldType" />
      </a-form-model-item>
      <!-- <a-form-model-item label="替代符" prop="replace" v-if="form.fieldType===3">
        <a-input v-model.trim="form.replace" :disabled="!form.fieldType" />
      </a-form-model-item>
      <a-form-model-item label="补位符" prop="cover" v-if="form.fieldType===3">
        <a-input v-model.trim="form.cover" :disabled="!form.fieldType" />
      </a-form-model-item>
      <a-form-model-item label="右侧截断" prop="isCut" v-if="form.fieldType===3">
        <a-checkbox v-model.trim="form.isCut" :disabled="!form.fieldType" />
      </a-form-model-item>
      <a-form-model-item label="右侧填充" prop="isFull" v-if="form.fieldType===3">
        <a-checkbox v-model.trim="form.isFull" :disabled="!form.fieldType" />
      </a-form-model-item> -->
    </a-form-model>
  </a-modal>
</template>

<script>
import { guid } from '@/utils/util.js'
import { dateData } from '@/utils/constants'
export default {
  data () {
    return {
      title: '新建码段类型',
      visible: false,
      loading: false,
      isAdd: true,
      lengthError: false,
      form: {
        fieldType: '',
        sourceType: '',
        length: undefined,
        value: '',
        dateFormatType: undefined,
        startNumber: undefined,
        step: undefined,
        separator: '',
        replace: '',
        cover: '',
        isCut: false,
        isFull: false
      },
      typeData: [
        {
          value: 1,
          name: '常量'
        },
        {
          value: 2,
          name: '日期字段'
        },
        // {
        //   value: 3,
        //   name: '编码对象属性'
        // },
        {
          value: 3,
          name: '流水号'
        }
      ],
      dateData: dateData,
      sourceData: [],
      rules: {
        fieldType: [{ required: true, message: '码段类型不能为空' }]
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
  },
  methods: {
    openModal (type, data) {
      if (type === 'add') {
        this.isAdd = true
        this.form = {
          fieldType: '',
          sourceType: '',
          length: undefined,
          value: '',
          dateFormatType: undefined,
          startNumber: undefined,
          step: undefined,
          separator: '',
          replace: '',
          cover: '',
          isCut: false,
          isFull: false
        }
      } else {
        this.isAdd = false
        this.form = { ...data }
      }

      this.visible = true
    },
    handleCancel () {
      this.visible = false
    },
    changeLength () {
      if (this.form.startNumber !== undefined && this.form.length !== undefined) {
        if (this.form.length < this.form.startNumber.toString().length) {
          this.lengthError = true
          this.$refs.formRef.validateField('length')
        } else {
          this.lengthError = false
          this.$refs.formRef.clearValidate('length')
        }
      }
    },
    changeValue (type) {
      if (type === 'value') {
        this.form.length = this.form.value.length
      } else {
        let val = this.dateData.find(d => d.value === this.form.dateFormatType)
        this.form.length = val.name.length
      }
    },
    changeType () {
      this.form.length = undefined
      this.form.value = ''
      this.form.dateFormatType = undefined
      if (this.form.fieldType === 1) {
        this.rules = {
          fieldType: [{ required: true, message: '码段类型不能为空' }],
          value: [{ required: true, message: '取值不能为空' }]
        }
      } else if (this.form.fieldType === 2) {
        this.form.sourceType = '对象创建时间'
        this.rules = {
          fieldType: [{ required: true, message: '码段类型不能为空' }],
          dateFormatType: [{ required: true, message: '取值不能为空' }]
        }
      } else {
        this.rules = {
          fieldType: [{ required: true, message: '码段类型不能为空' }],
          length: [{ required: true, validator: this.validatorLength }],
          startNumber: [{ required: true, message: '起始值不能为空' }],
          step: [{ required: true, message: '步长不能为空' }]
        }
      }
    },
    validatorLength (rule, value, callback) {
      if (value === undefined) {
        callback(new Error('长度不能为空'))
      } else if (this.lengthError) {
        callback(new Error('长度不能小于起始值的位数'))
      } else callback()
    },
    onSubmit () {
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          let data = { ...this.form }
          if (this.isAdd) {
            data.id = guid()
          }
          this.$emit('update-row', { type: this.isAdd, row: data })
          this.handleCancel()
        }
      })
    }
  }
}
</script>
