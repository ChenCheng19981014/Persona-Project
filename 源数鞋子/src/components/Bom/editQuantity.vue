<template>
  <div>
    <a-modal
      title="编辑用量"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="onClose"
      :destroyOnClose="true"
      :keyboard="false"
      :maskClosable="false"
    >
      <a-form-model ref="formRef" :model="form" :rules="rules">
        <a-form-model-item prop="quantity">
          <a-input-number v-model="form.quantity" class="full-width"></a-input-number>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    let validatorQuantity = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用量不能为空'))
      } else if (value === 0) {
        callback(new Error('用量不能为0'))
      } else if (value < 0) {
        callback(new Error('用量不能小于0'))
      } else callback()
    }
    return {
      visible: false,
      confirmLoading: false,
      form: {
        quantity: null
      },
      rules: {
        quantity: [
          { required: true, validator: validatorQuantity, trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  methods: {
    openModal (quantity) {
      this.form.quantity = quantity
      this.visible = true
    },
    handleOk () {
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          let str = this.form.quantity.toString()
          if (str.toString().split('.').length > 1 && str.split('.')[1].length > 2) {
            this.form.quantity = parseInt(this.form.quantity * 100) / 100
          }
          this.$emit('handle-ok', this.form.quantity)
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
