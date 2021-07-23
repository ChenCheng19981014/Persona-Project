<template>
  <a-tabs
    @change="changeTab"
    :active-key="activeKey"
  >
    <a-tab-pane
      key="1"
      tab="常规"
    >
      <code-info
        ref="codeInfoRef"
        :form-data="currentCodeDetail"
        :all-type-list="allTypeList"
        :current-code-id="currentCodeId"
        @refresh-list="refreshList"
      />
    </a-tab-pane>
    <a-tab-pane
      key="2"
      tab="码段详情"
    >
      <div class="operation-box margin-bottom">
        <a-button
          v-if="isEdit"
          type="primary"
          class="flex align-center"
          :disabled="currentCodeId===''"
          @click="isEdit=false"
          :loading="loading">
          编辑
        </a-button>
        <div v-else>
          <a-button type="primary" @click="updateInfo" class="margin-right">保存</a-button>
          <a-button @click="cancelUpdate">取消</a-button>
        </div>
      </div>
      <segment-info
        ref="segmentInfoRef"
        :segment-list="fieldData"
        :code-example="codeExample"
        :is-edit="!isEdit"
        @handle-update="handleUpdate"
        @handle-del="handleDel"
        @handle-sort="handleSort"></segment-info>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import CodeInfo from './CodeInfo.vue'
import SegmentInfo from './SegmentInfo'
import { numberRuleDetail, codeSegmentList, updateCodeSegment } from '@/api/numberRule'
import { dateData } from '@/utils/constants'
export default {
  name: 'DocumentTabs',
  components: {
    CodeInfo,
    SegmentInfo
  },
  props: {
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
      activeKey: '1', // 当前激活的tab
      isEdit: false,
      loading: false,
      searchItem: {
        pageIndex: 1,
        pageSize: 10
      },
      currentCodeDetail: {},
      fieldData: [],
      codeExample: '',
      dateData: dateData
    }
  },
  methods: {
    setActiveKey (key) {
      this.activeKey = key
    },
    emptyChecked () {
      if (this.$refs.historyTableRef) this.$refs.historyTableRef.emptyChecked()
    },
    refreshList () {
      this.$emit('refresh-list')
    },
    refreshTree () {
      this.$emit('refresh-tree')
    },
    changeTab (key) {
      this.setActiveKey(key)
      if (key === '1') {
        // 常规
        this.getCodeDetail(this.currentCodeId)
      } else if (key === '2') {
        // 码段详情
        this.isEdit = true
        this.getCodeSegmentList(this.currentCodeId)
      }
    },
    async getCodeDetail (id) {
      try {
        const res = await numberRuleDetail({ id })
        if (res.Code === 0) {
          this.currentCodeDetail = res.Data
        } else this.$message.error(res.Message)
      } catch (error) {
        return error
      }
    },
    async getCodeSegmentList (id) {
      try {
        const res = await codeSegmentList({ id })
        if (res.Code === 0) {
          this.fieldData = res.Data.map(item => {
            item.isOriginal = true
            return item
          })
          this.getCodeExample()
        } else this.$message.error(res.Message)
      } catch (error) {
        return error
      }
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
      // this.$confirm({
      //   title: '删除码段信息',
      //   content: `确认要删除${this.checkedIds.length}条码段信息吗？`,
      //   okText: '确认',
      //   cancelText: '取消',
      //   onOk: () => {
      //     this.checkedIds.map(item => {
      //       this.fieldData = this.fieldData.filter(item2 => item2.id !== item)
      //     })
      //     this.getCodeExample()
      //   }
      // })
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
    async updateInfo () {
      try {
        this.loading = true
        if (this.fieldData.length === 0) {
          this.$message.error('请添加码段信息')
        } else {
          let flag = this.fieldData.some(item => item.fieldType === 3)
          if (flag) {
            let arr = this.fieldData.map((item, index) => {
              let obj = { ...item }
              if (obj.isOriginal) {
                delete obj.isOriginal
              } else {
                delete obj.id
              }
              obj.sourceType = 0
              obj.displayOrder = index
              return obj
            })
            let data = {
              id: this.currentCodeId,
              list: arr
            }
            const res = await updateCodeSegment(data)
            if (res.Code === 0) {
              this.$message.success('编辑成功')
              this.isEdit = true
              this.getCodeSegmentList(this.currentCodeId)
            } else this.$message.error(res.Message)
          } else this.$message.error('流水号为规则必填项')
        }
      } catch (error) {
        return error
      } finally {
        this.loading = false
      }
    },
    cancelUpdate () {
      this.isEdit = true
      this.getCodeSegmentList(this.currentCodeId)
    }
  }
}
</script>

<style></style>
