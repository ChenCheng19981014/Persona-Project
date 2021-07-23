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
        :scroll="{x: true}"
        size="middle"
        @change="handleChange"
      >
        <div slot="roleState" slot-scope="row">{{ row.roleState===1?'启用':'禁用' }}</div>
        <div slot="updateTime" slot-scope="row">{{ row.updateTime | dateFormat('YYYY-MM-DD HH:mm:ss') }}</div>
      </a-table>
      <div v-if="dataList.length===0" class="full-width flex flex-column align-center" style="margin-top:50px">
        <img src="@/assets/images/no-data.png" class="margin-bottom">
        <p>暂无角色，快去创建角色吧~</p>
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
    checkedRoleIds: {
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
      selectRow: '',
      pageSizeList: ['10', '20', '30'],
      filteredInfo: {}
    }
  },
  computed: {
    columnList () {
      const columns = [
        {
          title: '角色名称',
          key: 'roleName',
          dataIndex: 'roleName',
          width: 150,
          ellipsis: true,
          fixed: 'left'
        },
        {
          title: '角色编码',
          key: 'roleNumber',
          dataIndex: 'roleNumber',
          width: 200,
          ellipsis: true
        },
        {
          title: '角色描述',
          key: 'description',
          dataIndex: 'description',
          width: 200,
          ellipsis: true
        },
        {
          title: '角色状态',
          key: 'roleState',
          scopedSlots: { customRender: 'roleState' },
          filterMultiple: false,
          filters: [
            { text: '启用', value: 1 },
            { text: '禁用', value: 2 }
          ],
          filteredValue: this.filteredInfo.roleState || null,
          width: 120
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
        selectedRowKeys: this.checkedRoleIds,
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
      if (filters.roleState) {
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

<style scoped lang="less">

</style>
