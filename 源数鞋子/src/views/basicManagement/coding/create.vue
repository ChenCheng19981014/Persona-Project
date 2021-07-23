<template>
  <div class="container">
    <div class="page-title">创建编码规则</div>
    <div class="small-title">常规信息</div>
    <a-divider />
    <div>
      <a-form-model ref="formRef" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
        <a-form-model-item label="编码对象" prop="objectKind">
          <a-select v-model="form.objectKind" @change="changeObject" show-search :filter-option="filterOption">
            <a-select-option v-for="item in allTypeList" :value="item.key" :key="item.key">
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="编码规则名称" prop="name">
          <a-input v-model.trim="form.name" @change="changeInput('number')" />
        </a-form-model-item>
        <a-form-model-item label="允许修改" prop="isEdit">
          <a-switch v-model="form.isEdit" />
        </a-form-model-item>
        <a-form-model-item label="默认规则" prop="isDefault">
          <a-switch v-model="form.isDefault" />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          <a-textarea v-model.trim="form.remark" :auto-size="{ minRows: 5, maxRows: 10 }" />
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="small-title">码段信息</div>
    <a-divider />
    <div>
      <segment-info
        ref="segmentInfoRef"
        :segment-list="fieldData"
        :code-example="codeExample"
        :is-edit="true"
        @handle-update="handleUpdate"
        @handle-del="handleDel"
        @handle-sort="handleSort"></segment-info>
      <div class="margin-top">
        <a-button type="primary" class="margin-right-xs" @click="handleCreate" :loading="loading">创建</a-button>
        <a-button @click="handleCancel">取消</a-button></a-button>
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import { dateData } from '@/utils/constants'
import SegmentInfo from './components/SegmentInfo'
import { typeList, createNumberRule } from '@/api/numberRule'
export default {
  components: { SegmentInfo },
  data () {
    return {
      form: {
        objectKind: undefined,
        name: '',
        isEdit: false,
        isDefault: false,
        remark: ''
      },
      loading: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      codeExample: '',
      fieldData: [],
      checkedIds: [],
      curCodeSegment: {}, // 当前选中的
      rules: {
        objectKind: [{ required: true, message: '编码规则对象不能为空' }],
        name: [{ required: true, message: '编码规则名称不能为空' }]
      },
      allTypeList: [],
      dateData: dateData,
      columns: [
        {
          title: '序号',
          key: 'xuhao',
          scopedSlots: { customRender: 'xuhao' }
        },
        {
          title: '类型',
          key: 'fieldType',
          dataIndex: 'fieldType'
        },
        {
          title: '元素来源',
          key: 'sourceType',
          dataIndex: 'sourceType'
        },
        {
          title: '长度',
          key: 'length',
          dataIndex: 'length'
        },
        {
          title: '取值',
          key: 'value',
          scopedSlots: { customRender: 'value' }
        },
        {
          title: '分隔符',
          key: 'separator',
          dataIndex: 'separator'
        },
        {
          title: '替代符',
          key: 'replace',
          dataIndex: 'replace'
        },
        {
          title: '补位符',
          key: 'cover',
          dataIndex: 'cover'
        },
        {
          title: '右侧截断',
          key: 'isCut',
          dataIndex: 'isCut'
        },
        {
          title: '右侧填充',
          key: 'isFull',
          dataIndex: 'isFull'
        }
      ]
    }
  },
  mounted () {
    this.getTypeList()
    // this.initSortable()
  },
  methods: {
    handleSelect (data) {
      this.checkedIds = data.ids
      if (data.ids.length === 1) {
        this.curCodeSegment = data.rows[0]
      }
    },
    changeObject () {

    },
    changeInput () {},
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    addCodeSegment () {
      this.$refs.codeSegmentInfoRef.openModal('add')
    },
    updateCodeSegment () {
      this.$refs.codeSegmentInfoRef.openModal('edit', this.curCodeSegment)
    },
    handleUpdate (data) {
      if (data.type) {
        // 添加
        this.fieldData.push(data.row)
      } else {
        // 编辑
        this.fieldData = this.fieldData.map(item => {
          if (item.id === data.row.id) {
            item = { ...data.row }
          }
          return item
        })
      }
      this.getCodeExample()
    },
    handleDel (ids) {
      ids.map(item => {
        this.fieldData = this.fieldData.filter(item2 => item2.id !== item)
      })
      this.$refs.segmentInfoRef.checkedIds = []
      this.getCodeExample()
    },
    handleSort (list) {
      this.fieldData = list
      this.getCodeExample()
    },
    getCodeExample () {
      let str = ''
      this.fieldData.map((item, index) => {
        let flag = false
        if (index === this.fieldData.length - 1) {
          flag = true
        }
        if (item.fieldType === 1) {
          str += flag ? item.value : (item.value + item.separator)
        } else if (item.fieldType === 2) {
          let val = this.dateData.find(d => d.value === item.dateFormatType)
          let nowTime = this.$options.filters.dateFormat(new Date(), val.name)
          str += flag ? nowTime : (nowTime + item.separator)
        } else {
          let value = item.length - item.startNumber.toString().length
          if (value > 0) {
            let beginWith = item.startNumber
            for (let i = 0; i < value; i++) {
              beginWith = '0' + beginWith
            }
            str += flag ? beginWith : (beginWith + item.separator)
          } else {
            str += flag ? item.startNumber : (item.startNumber + item.separator)
          }
        }
      })
      this.codeExample = str
    },
    handleCreate () {
      try {
        this.loading = true
        this.$refs.formRef.validate(async valid => {
          if (valid) {
            if (this.fieldData.length === 0) {
              this.$message.error('请添加码段信息')
            } else {
              let flag = this.fieldData.some(item => item.fieldType === 3)
              if (flag) {
                let fields = this.fieldData.map((item, index) => {
                  let obj = { ...item }
                  obj.displayOrder = index
                  obj.sourceType = 0
                  delete obj.id
                  return obj
                })
                let data = {
                  ruleInfo: this.form,
                  fields
                }
                const res = await createNumberRule(data)
                if (res.Code === 0) {
                  this.$message.success('创建成功')
                  this.$router.push('/basicManagement/coding/index')
                } else {
                  this.$message.error(res.Message)
                }
              } else {
                this.$message.error('流水号为规则必填项')
              }
            }
          }
        })
      } catch (error) {

      } finally {
        this.loading = false
      }
    },
    handleCancel () {
      this.$router.push('/basicManagement/coding/index')
    },
    async getTypeList () {
      try {
        const res = await typeList()
        if (res.Code === 0) {
          this.allTypeList = res.Data
        }
      } catch (error) {
        return error
      }
    },
    initSortable () {
      let el = this.$el.querySelector('.sort-table tbody')
      Sortable.create(el, {
        // handle: '.ant-table-row',
        handle: '.drag-handle',
        // 这里千万不要用onEnd 方法
        onUpdate: (evt) => {
          // console.log(this.data)
          var o = evt.oldIndex
          var n = evt.newIndex
          if (o === n) {
            return
          }
          this.sortListAndUpdate(this.fieldData, o, n)
        }
      })
    },
    // 对数据进行排序，要求 o（oldIndex） 和 n（newIndex） 从 0开始
    sortList (list, o, n) {
      var newTableData = JSON.parse(JSON.stringify(list))
      var data = newTableData.splice(o, 1, null)
      newTableData.splice(o < n ? n + 1 : n, 0, data[0])
      newTableData.splice(o > n ? o + 1 : o, 1)
      return newTableData
    },
    /**
     * 对数据排序并更新 table， 要求 o（oldIndex） 和 n（newIndex） 从 0开始
     */
    sortListAndUpdate (list, o, n) {
      var newTableData = this.sortList(list, o, n)
        newTableData.forEach((item, index) => {
        item.sort = index + 1
      })
      this.$nextTick(() => {
        this.fieldData = newTableData
        this.getCodeExample()
      })
    }
  }
}
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    min-height: calc(100vh - 84px);
    background-color: #fff;
    box-sizing: border-box;
    padding:50px;
    .content{
      margin-top:50px;
    }
    .small-title{
      margin-top:30px;
      font-size:16px;
      font-weight: 500;
    }
  }
  @media screen and (min-width:1921px) {
    .container{
      padding:50px 20vw;
    }
  }
</style>
