<template>
  <a-modal
    :visible.sync="visible"
    title="岗位列表"
    @cancel="handleCancel"
    @ok="handleOK"
    :width="1300"
    destroyOnClose
    :keyboard="false"
    :maskClosable="false">
    <div class="margin-bottom text-right">
      <my-search default-value="nameFilter" :list="searchLabel" @handle-search="handleSearch"></my-search>
    </div>
    <post-table
      ref="departmentListRef"
      :is-loading="isLoading"
      :data-list="allPostList"
      :search-item="searchItem"
      :total-nums="totalNums"
      :checked-post-ids="checkedPostIds"
      :data-columns="columns"
      select-type="checkbox"
      @select-row="selectRow"
      @change-page="changePage"
    ></post-table>
  </a-modal>
</template>

<script>
import postTable from '../post/list.vue'
import MySearch from '@/components/MySearch'
import { postList } from '@/api/user'
import { mergeArray, spliceArray } from '@/utils/util.js'
export default {
  components: { postTable, MySearch },
  data () {
    return {
      searchLabel: [
        {
          name: '岗位名称',
          value: 'nameFilter'
        },
        {
          name: '岗位编码',
          value: 'numberFilter'
        },
        {
          name: '所属部门',
          value: 'departmentNameFilter'
        },
        {
          name: '修改用户',
          value: 'updateUserFilter'
        }
      ],
      visible: false,
      isLoading: false,
      allPostList: [],
      searchItem: {
        nameFilter: '',
        numberFilter: '',
        departmentNameFilter: '',
        updateUserFilter: '',
        pageIndex: 1,
        pageSize: 10
      },
      totalNums: 0,
      checkedPostIds: [],
      checkedPostList: [],
      checkedRows: [],
      columns: [
        {
          title: '岗位名称',
          key: 'postName',
          dataIndex: 'postName'
        },
        {
          title: '岗位编码',
          key: 'postNumber',
          dataIndex: 'postNumber'
        },
        {
          title: '所属部门',
          key: 'departmentName',
          dataIndex: 'departmentName'
        },
        {
          title: '岗位描述',
          key: 'description',
          dataIndex: 'description'
        }
      ]
    }
  },
  methods: {
    openModal (list) {
      this.getList()
      this.checkedPostIds = list.map(item => {
        return item.postId || item.id
      })
      this.checkedPostList = [...list]
      this.checkedRows = [...list]
      this.searchItem = {
        nameFilter: '',
        numberFilter: '',
        departmentNameFilter: '',
        updateUserFilter: '',
        pageIndex: 1,
        pageSize: 10
      }
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    },
    handleOK () {
      if (this.checkedPostIds.length > 0) {
        this.$emit('change-post', this.checkedRows)
        this.handleCancel()
      } else {
        this.$message.error('请选择所属部门')
      }
    },
    selectRow (obj) {
      this.checkedPostIds = obj.ids
      this.checkedPostList = obj.rows
      if (this.checkedRows.length > 0) {
        let uniqueArr = mergeArray(this.checkedRows, this.checkedPostList, 'id')
        this.checkedRows = spliceArray(uniqueArr, this.checkedPostIds, 'id')
      } else {
        this.checkedRows = this.checkedPostList
      }
    },
    async getList () {
      try {
        this.isLoading = true
        const res = await postList(this.searchItem)
        // this.$refs.departmentListRef.expandedRowKeys = []
        this.allPostList = res.Data.rows
        this.totalNums = res.Data.totalCount
      } catch (error) {
        return error
      } finally {
        this.isLoading = false
      }
    },
    handleSearch (data) {
      this.searchItem.nameFilter = ''
      this.searchItem.numberFilter = ''
      this.searchItem.departmentNameFilter = ''
      this.searchItem.updateUserFilter = ''
      this.searchItem[data.searchCondition] = data.inputValue
      this.searchItem.pageIndex = 1
      this.checkedPostIds = []
      this.getList()
    },
    changePage (pageObj) {
      this.checkedPostIds = []
      this.searchItem.pageSize = pageObj.limit
      this.searchItem.pageIndex = pageObj.page
      this.getList()
    }
  }
}
</script>
