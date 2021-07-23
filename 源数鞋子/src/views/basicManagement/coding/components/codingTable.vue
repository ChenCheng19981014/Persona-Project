<template>
  <div class="full-height flex flex-column justify-between">
    <div>
      <a-table
        :columns="columnList"
        :data-source="dataList"
        :rowKey="(record)=>record.id"
        :customRow="rowClick"
        :locale="{ emptyText: '   ' }"
        :row-selection="rowSelection"
        :pagination="false"
        :loading="isLoading"
        :scroll="{x:true}"
        size="middle"
        @change="handleChange"
      >
        <div slot="isDefault" slot-scope="row">
          <a-tag :color="row.isDefault?'#87d068':'#f50'">{{ row.isDefault?'是':'否' }}</a-tag>
        </div>
        <div slot="updateTime" slot-scope="row">{{ row.updateTime | dateFormat('YYYY-MM-DD HH:mm:ss') }}</div>
        <div slot="createTime" slot-scope="row">{{ row.createTime | dateFormat('YYYY-MM-DD HH:mm:ss') }}</div>
      </a-table>
      <div v-if="dataList.length===0" class="full-width flex flex-column align-center" style="margin-top:50px">
        <img src="@/assets/images/no-data.png" class="margin-bottom">
        <p>暂无编码规则，快去创建吧~</p>
      </div>
    </div>
    <div>
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
    checkedCodeIds: {
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
    allTypeList: {
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
    }
  },
  data () {
    return {
      id: '',
      filteredInfo: {},
      pageSizeList: ['10', '20', '30']
    }
  },
  computed: {
    columnList () {
      const columns = [
        {
          title: '编码规则名称',
          key: 'name',
          dataIndex: 'name',
          width: 150,
          ellipsis: true,
          fixed: 'left'
        },
        {
          title: '编码对象',
          key: 'objectKindName',
          dataIndex: 'objectKindName',
          filterMultiple: false,
          filters: this.allTypeList,
          filteredValue: this.filteredInfo.objectKindName || null,
          width: 130
        },
        {
          title: '修改用户',
          key: 'updateUser',
          dataIndex: 'updateUser',
          width: 120
        },
        {
          title: '修改时间',
          key: 'updateTime',
          scopedSlots: { customRender: 'updateTime' },
          width: 150
        },
        {
          title: '创建用户',
          key: 'createUser',
          dataIndex: 'createUser',
          width: 120
        },
        {
          title: '创建时间',
          key: 'createTime',
          scopedSlots: { customRender: 'createTime' },
          width: 150
        },
        {
          title: '默认规则',
          key: 'isDefault',
          scopedSlots: { customRender: 'isDefault' },
          width: 100
        },
        {
          title: '备注',
          key: 'remark',
          dataIndex: 'remark',
          width: 200,
          ellipsis: true
        }
      ]
      return columns
    },
    rowSelection () {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
          this.$emit('select-row', { ids: selectedRowKeys, rows: selectedRows })
        },
        selectedRowKeys: this.checkedCodeIds,
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
    handleChange (pagination, filters, sorter, { currentDataSource }) {
      if (filters.objectKindName) {
        this.filteredInfo = filters
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
