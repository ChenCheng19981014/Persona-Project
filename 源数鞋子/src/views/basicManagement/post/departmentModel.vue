<template>
  <a-modal
    :visible.sync="visible"
    title="部门列表"
    @cancel="handleCancel"
    @ok="handleOK"
    :width="1300"
    destroyOnClose
    :keyboard="false"
    :maskClosable="false"
  >
    <div class="max-modal-height">
      <div class="margin-bottom text-right">
        <my-search default-value="nameFilter" :list="searchLabel" @handle-search="handleSearch"></my-search>
      </div>
      <department-table
        ref="departmentListRef"
        :is-loading="isLoading"
        :data-list="departmentTreeList"
        :search-item="searchItem"
        :total-nums="totalNums"
        :checked-department-ids="checkedDepartmentIds"
        :data-columns="columns"
        :select-type="selectType"
        @merge-children="mergeChildren"
        @select-row="selectRow"
        @change-page="changePage"
      ></department-table>
    </div>
  </a-modal>
</template>

<script>
import departmentTable from '../department/list.vue'
import MySearch from '@/components/MySearch'
import { departmentList } from '@/api/user'
import { mergeArray, spliceArray } from '@/utils/util.js'
export default {
  components: { departmentTable, MySearch },
  props: {
    selectType: {
      type: String,
      default: 'checkbox'
    }
  },
  data () {
    return {
      searchLabel: [
        {
          name: '部门名称',
          value: 'nameFilter'
        },
        {
          name: '部门编码',
          value: 'numberFilter'
        },
        {
          name: '部门负责人',
          value: 'director'
        },
        {
          name: '修改用户',
          value: 'updateUser'
        }
      ],
      visible: false,
      isLoading: false,
      allDepartmentList: [],
      departmentTreeList: [],
      searchItem: {
        nameFilter: '',
        numberFilter: '',
        director: '',
        updateUser: '',
        pageIndex: 1,
        pageSize: 10
      },
      totalNums: 0,
      checkedDepartmentIds: [],
      checkedDepartmentList: [],
      checkedRows: [],
      columns: [
        {
          title: '部门名称',
          key: 'name',
          dataIndex: 'name'
        },
        {
          title: '部门编码',
          key: 'number',
          dataIndex: 'number'
        },
        {
          title: '部门负责人',
          key: 'director',
          dataIndex: 'director'
        },
        {
          title: '部门描述',
          key: 'description',
          dataIndex: 'description'
        }
      ]
    }
  },
  methods: {
    openModal (list) {
      this.getList()
      this.checkedDepartmentIds = list.map(item => {
        return item.id
      })
      this.checkedDepartmentList = [...list]
      this.checkedRows = [...list]
      this.searchItem = {
        nameFilter: '',
        numberFilter: '',
        director: '',
        updateUser: '',
        pageIndex: 1,
        pageSize: 10
      }
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    },
    handleOK () {
      if (this.checkedDepartmentIds.length > 0) {
        this.$emit('change-department', this.checkedRows)
        this.handleCancel()
      } else {
        this.$message.error('请选择所属部门')
      }
    },
    selectRow (obj) {
      this.checkedDepartmentIds = obj.ids
      this.checkedDepartmentList = obj.rows
      if (this.checkedRows.length > 0) {
        let uniqueArr = mergeArray(this.checkedRows, this.checkedDepartmentList, 'id')
        this.checkedRows = spliceArray(uniqueArr, this.checkedDepartmentIds, 'id')
      } else {
        this.checkedRows = this.checkedDepartmentList
      }
    },
    async getList () {
      try {
        this.isLoading = true
        const res = await departmentList(this.searchItem)
        this.departmentTreeList = res.Data.rows
        this.$refs.departmentListRef.expandedRowKeys = this.getExpandIds(this.departmentTreeList, [])
        this.totalNums = res.Data.totalCount
      } catch (error) {

      } finally {
        this.isLoading = false
      }
    },
    async getSearchList () {
      try {
        this.isLoading = true
        const res = await departmentList(this.searchItem)
        this.departmentTreeList = res.Data.rows
        this.allDepartmentList = this.jsonToArray(this.departmentTreeList)
        this.$refs.departmentListRef.expandedRowKeys = this.getExpandIds(this.departmentTreeList, [])
        this.totalNums = res.Data.totalCount
      } catch (error) {

      } finally {
        this.isLoading = false
      }
    },
    mergeChildren (data) {
      data.list.map(item => {
        item.parentId = data.id
        this.allDepartmentList.push(item)
      })
      this.departmentTreeList = this.buildTree(this.allDepartmentList)
    },
    getExpandIds (list, arr) {
      list.forEach(item => {
        if (item.childList && item.childList.length > 0) {
          arr.push(item.id)
          this.getExpandIds(item.childList, arr)
        }
      })
      return arr
    },
    handleSearch (data) {
      this.searchItem.nameFilter = ''
      this.searchItem.numberFilter = ''
      this.searchItem.director = ''
      this.searchItem.updateUser = ''
      this.searchItem[data.searchCondition] = data.inputValue
      this.searchItem.pageIndex = 1
      // this.checkedDepartmentIds = []
      this.getSearchList()
    },
    changePage (pageObj) {
      // this.checkedDepartmentIds = []
      this.searchItem.pageSize = pageObj.limit
      this.searchItem.pageIndex = pageObj.page
      this.getList()
    },
    buildTree (arr) {
      const cloneData = JSON.parse(JSON.stringify(arr)) // 对源数据深度克隆
      const brr = cloneData.filter(father => {
        const branchArr = cloneData.filter(child => father.id === child.parentId) // 返回每一项的子级数组
        // eslint-disable-next-line no-unused-expressions
        branchArr.length > 0 ? (father.childList = branchArr) : (father.childList = []) // 如果存在子级，则给父级添加一个children属性，并赋值
        return father.parentId === null // 返回第一层
      })
      return brr
    },
    jsonToArray (list) {
      const nodes = JSON.parse(JSON.stringify(list))
      let r = []
      if (Array.isArray(nodes)) {
        for (let i = 0, l = nodes.length; i < l; i++) {
          r.push(nodes[i])
          if (Array.isArray(nodes[i]['childList']) && nodes[i]['childList'].length > 0) {
            r = r.concat(this.jsonToArray(nodes[i]['childList']))
          }
          delete nodes[i]['childList']
        }
      }
      return r
    }
  }
}
</script>
