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
      >
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
    checkedPostIds: {
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
    },
    idField: {
      type: String,
      default: 'id'
    }
  },
  data () {
    return {
      id: '',
      selectRow: '',
      pageSizeList: ['10', '20', '30']
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
        selectedRowKeys: this.checkedPostIds,
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
    changePage (pageObj) {
      // console.log(pageObj, '----')
      this.$emit('change-page', pageObj)
    }

  }
}
</script>

<style scoped lang="less">

</style>
