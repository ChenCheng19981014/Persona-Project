<template>
  <div>
    <a-modal
      title="设置类别选项数量"
      :visible="visible"
      @ok="handleOk"
      @cancel="onClose"
      :destroyOnClose="true"
      :keyboard="false"
      :maskClosable="false"
    >
      <p>请设置在{{ numRange }}个子物料中选择进行生产的数量</p>
      <a-form-model ref="formRef" :model="form" :rules="rules" layout="inline">
        <a-form-model-item prop="min" label="最小">
          <a-select v-model="form.min" style="width: 150px">
            <a-select-option :key="0" :value="0">{{ 0 }}</a-select-option>
            <a-select-option v-for="item in numRange" :key="item" :value="item">{{ item }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item prop="max" label="最大">
          <a-select v-model="form.max" style="width: 150px">
            <a-select-option v-for="item in numRange" :key="item" :value="item">{{ item }}</a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    let validatorMinQuantity = (rule, value, callback) => {
      if (value > this.form.max) {
        callback(new Error('最小值不能大于最大值'))
      } else callback()
    }
    let validatorMaxQuantity = (rule, value, callback) => {
      if (value < this.form.min) {
        callback(new Error('最大值不能小于最小值'))
      } else callback()
    }
    return {
      visible: false,
      confirmLoading: false,
      numRange: 1,
      form: {
        min: 1,
        max: 1
      },
      rules: {
        min: [{ required: true, validator: validatorMinQuantity, trigger: 'change' }],
        max: [{ required: true, validator: validatorMaxQuantity, trigger: 'change' }]
      }
    }
  },
  methods: {
    openModal (data) {
      this.form.min = data.min
      this.form.max = data.max
      this.numRange = data.numRange
      this.visible = true
    },
    handleOk () {
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          this.$emit('handle-ok', this.form)
        } else {
          return false
        }
      })
    },
    onClose () {
      this.visible = false
    }
  }
}
</script>
