<template>
  <div class="full-height flex flex-column justify-between">
    <div>
      <!-- <a-table
        childrenColumnName="childList"
        :columns="dataColumns"
        :data-source="dataList"
        :rowKey="(record)=>record.id"
        :expandedRowKeys="expandedRowKeys"
        :customRow="rowClick"
        :locale="{ emptyText: '   ' }"
        :row-selection="rowSelection"
        :expandIcon="this.expandIcon"
        :pagination="false"
        :loading="isLoading"
        @expand="handleExpand"
      > -->
      <a-table
        childrenColumnName="childList"
        :columns="dataColumns"
        :data-source="dataList"
        :rowKey="(record)=>record.id"
        :expandedRowKeys="expandedRowKeys"
        :customRow="rowClick"
        :locale="{ emptyText: '   ' }"
        :row-selection="rowSelection"
        :expandIcon="this.expandIcon"
        :pagination="false"
        :loading="isLoading"
        :scroll="{x: true}"
        size="middle"
        @expand="handleExpand"
      >
        <div slot="updateTime" slot-scope="row">{{ row.updateTime | dateFormat('YYYY-MM-DD HH:mm:ss') }}</div>
      </a-table>
      <div v-if="dataList.length===0" class="full-width flex flex-column align-center" style="margin-top:50px">
        <img src="@/assets/images/no-data.png" class="margin-bottom">
        <p>暂无部门，快去创建部门吧~</p>
      </div>
    </div>
    <div v-if="showPagination">
      <Pagination
        :page="searchItem.pageIndex"
        :page-sizes="searchItem.pageSize"
        :page-size-options="pageSizeList"
        :total="totalNums"
        :background="false"
        @change-page="changePage"></Pagination>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { departmentSonList } from '@/api/user'
export default {
  components: { Pagination },
  props: {
    checkedDepartmentIds: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    dataList: {
      type: Array,
      default: () => []
    },
    dataColumns: {
      type: Array,
      default: () => []
    },
    searchItem: {
      type: Object,
      default: () => {}
    },
    totalNums: {
      type: Number,
      default: 0
    },
    selectType: {
      type: String,
      default: 'checkbox'
    },
    showPagination: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      id: '',
      selectRow: '',
      pageSizeList: ['10', '20', '30'],
      expandedRowKeys: []
    }
  },
  computed: {
    rowSelection () {
      return {
        type: this.selectType,
        onChange: (selectedRowKeys, selectedRows) => {
          // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
          this.$emit('select-row', { ids: selectedRowKeys, rows: selectedRows })
        },
        selectedRowKeys: this.checkedDepartmentIds,
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name
          }
        })
      }
    }
  },
  methods: {
    expandIcon (props) {
      if (props.expanded) {
        return <div role="button" tabindex="0" aria-label="关闭行" class="ant-table-row-expand-icon ant-table-row-expanded" onClick={(e) => { props.onExpand(props.record, e) }}></div>
      }
      if (props.record.isHasChildren) {
        return <div role="button" tabindex="0" aria-label="展开行" class="ant-table-row-expand-icon ant-table-row-collapsed" onClick={(e) => { props.onExpand(props.record, e) }}></div>
      } else return <span class="ant-table-row-expand-icon ant-table-row-spaced"></span>
    },
    handleExpand (expanded, record) {
      if (expanded) {
        this.expandedRowKeys.push(record.id)
        if (!record.childList || record.childList.length === 0) {
          this.getNextDepartment(record.id)
        }
      } else {
        this.expandedRowKeys = this.expandedRowKeys.filter(item => item !== record.id)
      }
    },
    // table行点击
    rowClick (record, index) {
      return {
        on: {
          click: event => {
            this.id = record.id
            this.$emit('select-row', { ids: [this.id], rows: [record] })
          }
        },
        // 自定义属性，也就是官方文档中的props，可通过条件来控制样式
        style: {
          'background-color': record.id === this.id ? this.$store.getters.tableSelectColor : index % 2 !== 0 ? this.$store.getters.tableZebraColor : '#fff',
          cursor: 'pointer'
        }
      }
    },
    async getNextDepartment (id) {
      try {
        const res = await departmentSonList({ id })
        if (res.Code === 0) {
          this.$emit('merge-children', { list: res.Data, id })
        }
      } catch (error) {}
    },
    changePage (pageObj) {
      // console.log(pageObj, '----')
      this.$emit('change-page', pageObj)
    }

  }
}
</script>

<style scoped lang="less">

</style>
