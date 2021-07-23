<template>
  <div>
    <div>
      <div class="margin-bottom" v-if="isEdit">
        <a-button type="primary" class="margin-right-xs" @click="addCodeSegment">添加</a-button>
        <a-button @click="updateCodeSegment" :disabled="checkedIds.length===0 || checkedIds.length>1" class="margin-right-xs">编辑</a-button>
        <a-button @click="handleDel" :disabled="checkedIds.length===0">删除</a-button>
      </div>
      <a-table
        class="sort-table"
        ref="dragTable"
        :rowKey="(record)=>record.id"
        :columns="columns"
        :data-source="segmentList"
        :row-selection="rowSelection"
        :pagination="false">
        <div slot="xuhao" slot-scope="text, record,index">
          <!-- <a-icon type="slack" class="drag-handle" title="拖动排序" v-if="isEdit" /> -->
          <img src="@/assets/icons/move.png" class="drag-handle" alt="拖动排序" v-if="isEdit">
          <span>{{ index+1 }}</span>
        </div>
        <div slot="sourceType" slot-scope="row">{{ row.fieldType===2?'对象创建时间':'' }}</div>
        <div slot="value" slot-scope="row">
          <div v-if="row.fieldType===3">
            初始值：{{ row.startNumber }},
            步长：{{ row.step }}
          </div>
          <div v-else-if="row.fieldType===2">{{ getFormatValue(row.dateFormatType) }}</div>
          <div v-else>{{ row.value }}</div>
        </div>
        <template slot="footer" v-if="segmentList.length>0">
          <p>编码示例：{{ codeExample }}</p>
          <p>编码长度：{{ codeExample.length }}</p>
        </template>
      </a-table>
    </div>
    <code-segment-info ref="codeSegmentInfoRef" @update-row="handleUpdate"></code-segment-info>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import codeSegmentInfo from './codeSegmentInfo'
import { dateData } from '@/utils/constants'
export default {
  components: { codeSegmentInfo },
  props: {
    segmentList: {
      type: Array,
      default: () => []
    },
    codeExample: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      checkedIds: [],
      curCodeSegment: {},
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
          scopedSlots: { customRender: 'sourceType' }
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
      ],
      dateData
    }
  },
  computed: {
    getFormatValue () {
      return function (type) {
        let str = this.dateData.find(d => d.value === type)
        return str.name
      }
    },
    rowSelection () {
      if (this.isEdit) {
        return {
          onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
            this.handleSelect({ ids: selectedRowKeys, rows: selectedRows })
          },
          selectedRowKeys: this.checkedIds
        }
      } else {
        return null
      }
    }
  },
  mounted () {
    this.initSortable()
  },
  methods: {
    addCodeSegment () {
      this.$refs.codeSegmentInfoRef.openModal('add')
    },
    updateCodeSegment () {
      this.$refs.codeSegmentInfoRef.openModal('edit', this.curCodeSegment)
    },
    handleSelect (data) {
      this.checkedIds = data.ids
      if (data.ids.length === 1) {
        this.curCodeSegment = data.rows[0]
      }
    },
    handleUpdate (data) {
      this.$emit('handle-update', data)
    },
    handleDel () {
      this.$confirm({
        title: '删除码段信息',
        content: `确认要删除${this.checkedIds.length}条码段信息吗？`,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.$emit('handle-del', this.checkedIds)
        }
      })
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
          // this.sortListAndUpdate(this.fieldData, o, n)
          this.sortListAndUpdate(this.segmentList, o, n)
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
        this.$emit('handle-sort', newTableData)
        // this.fieldData = newTableData
        // this.getCodeExample()
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .drag-handle{
    cursor:move;
    width:20px;
    margin-right:10px
  }
</style>
