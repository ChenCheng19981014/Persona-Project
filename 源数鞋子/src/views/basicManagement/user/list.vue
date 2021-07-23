<template>
  <div class="full-height flex flex-column justify-between">
    <div>
      <a-table
        :columns="dataColumns"
        :data-source="dataList"
        :rowKey="(record)=>record[idField]"
        :customRow="rowClick"
        :locale="{ emptyText: '   ' }"
        :row-selection="rowSelection"
        :pagination="false"
        :loading="isLoading"
        :scroll="{x:true}"
        size="middle"
        @change="handleChange"
      >
        <div slot="roleNames" slot-scope="row">{{ renderArr(row.roleNames) }}</div>
        <div slot="postNames" slot-scope="row">{{ renderArr(row.postNames) }}</div>
        <div slot="departmentNames" slot-scope="row">{{ renderArr(row.departmentNames) }}</div>
        <div slot="userState" slot-scope="row">{{ row.userState===1?'启用':'禁用' }}</div>
        <div slot="updateTime" slot-scope="row">{{ row.updateTime | dateFormat('YYYY-MM-DD HH:mm:ss') }}</div>
      </a-table>
      <div v-if="dataList.length===0" class="full-width flex flex-column align-center" style="margin-top:50px">
        <img src="@/assets/images/no-data.png" class="margin-bottom">
        <p>暂无用户，快去创建用户吧~</p>
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
export default {
  components: { Pagination },
  props: {
    checkedUserIds: {
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
    showPagination: {
      type: Boolean,
      default: true
    },
    selectType: {
      type: String,
      default: 'checkbox'
    },
    idField: {
      type: String,
      default: 'userId'
    }
  },
  data () {
    return {
      id: '',
      pageSizeList: ['10', '20', '30']
    }
  },
  computed: {
    renderArr () {
      return function (list) {
        let str = ''
        let len = list.length - 1
        list.forEach((item, index) => {
          str += (index < len ? `${item}，` : `${item}`)
        })
        return str
      }
    },
    rowSelection () {
      return {
        type: this.selectType,
        onChange: (selectedRowKeys, selectedRows) => {
          // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
          this.$emit('select-row', { ids: selectedRowKeys, rows: selectedRows })
        },
        selectedRowKeys: this.checkedUserIds,
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
    // table行点击
    rowClick (record, index) {
      return {
        on: {
          click: event => {
            this.id = record[this.idField]
            this.$emit('select-row', { ids: [this.id], rows: [record] })
          }
        },
        // 自定义属性，也就是官方文档中的props，可通过条件来控制样式
        style: {
          'background-color': record[this.idField] === this.id ? this.$store.getters.tableSelectColor : index % 2 !== 0 ? this.$store.getters.tableZebraColor : '#fff',
          cursor: 'pointer'
        }
      }
    },
    handleChange (pagination, filters, sorter, { currentDataSource }) {
      if (filters.userState) {
        this.$emit('handle-filters', filters)
      }
    },
    changePage (pageObj) {
      // console.log(pageObj, '----')
      this.$emit('change-page', pageObj)
    }

  }
}
</script>

<style lang="less">
  .ant-table td,.ant-table th { white-space: nowrap; }
</style>
