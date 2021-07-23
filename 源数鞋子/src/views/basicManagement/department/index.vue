<template>
  <div class="container">
    <height-drag>
      <div slot="top" class="full-height flex flex-column">
        <div>
          <div class="page-title">部门管理</div>
          <div class="flex margin-bottom justify-between align-center">
            <div class="flex btn-box">
              <a-button type="primary" class="margin-right-xs" @click="handleCreate">
                <my-icon type="icon-xinjian" class="btn-icon-size"></my-icon>
                新建部门
              </a-button>
              <a-button
                class="margin-right-xs"
                :disabled="checkedDepartmentIds.length===0"
                @click="handleDelete"
              >
                <my-icon type="icon-shanchu" class="btn-icon-size"></my-icon>
                删除部门
              </a-button>
            </div>
            <my-search default-value="nameFilter" :list="searchLabel" @handle-search="handleSearch"></my-search>
          </div>
        </div>
        <div style="flex:1">
          <list
            ref="departmentListRef"
            :is-loading="isLoading"
            :data-list="departmentTreeList"
            :data-columns="columns"
            :search-item="searchItem"
            :total-nums="totalNums"
            :checked-department-ids="checkedDepartmentIds"
            :show-pagination="true"
            select-type="checkbox"
            @merge-children="mergeChildren"
            @select-row="selectRow"
            @change-page="changePage"
          ></list>
        </div>
      </div>
      <div slot="bottom">
        <tabs
          ref="departmentTabsRef"
          :current-department-id="currentDepartmentId"
          :is-possible-edit="infoIsPossibleEdit"
          @refresh-list="departmentInfoUpdate"
        ></tabs>
      </div>
    </height-drag>
    <create-department ref="createDepartmentRef" :current-department="currentDepartment" @update-tree-list="updateTreeList"></create-department>
    <del-fail-tip ref="delFailTipRef" :list="delFailList"></del-fail-tip>
  </div>
</template>

<script>
import HeightDrag from '@/components/HeightDrag'
import MySearch from '@/components/MySearch'
import List from './list'
import Tabs from './tabs/index'
import SearchForm from './searchForm'
import CreateDepartment from './createDepartment'
import DelFailTip from './delFailTip'
import { departmentList, deleteDepartment } from '@/api/user'
export default {
  name: 'Error',
  components: { HeightDrag, MySearch, List, Tabs, SearchForm, CreateDepartment, DelFailTip },
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
      isLoading: false,
      infoIsPossibleEdit: false,
      allDepartmentList: [],
      departmentTreeList: [],
      totalNums: 0,
      currentDepartmentId: '',
      checkedDepartmentIds: [],
      checkedDepartmentList: [],
      currentDepartment: {},
      searchItem: {
        pageIndex: 1,
        pageSize: 10
      },
      delFailList: [],
      columns: [
        {
          title: '部门名称',
          key: 'name',
          dataIndex: 'name',
          width: 300,
          fixed: 'left'
        },
        {
          title: '部门编码',
          key: 'number',
          dataIndex: 'number',
          width: 200,
          ellipsis: true
        },
        {
          title: '部门负责人',
          key: 'director',
          dataIndex: 'director',
          width: 120
        },
        {
          title: '部门描述',
          key: 'description',
          dataIndex: 'description',
          width: 200,
          ellipsis: true
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
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    updateTreeList (parentId) {
      this.getList()
      // try {
      //   if (parentId !== '') {
      //     if (this.$refs.departmentListRef.expandedRowKeys.indexOf(parentId) < 0) {
      //       this.$refs.departmentListRef.expandedRowKeys.push(parentId)
      //     }
      //     // this.allDepartmentList = this.allDepartmentList.filter(item => item.id !== parentId)
      //     this.allDepartmentList.map(item => {
      //       if (item.id === parentId) {
      //         item.isHasChildren = true
      //       }
      //     })
      //     const res = await departmentSonList({ id: parentId })
      //     if (res.Code === 0) {
      //       this.mergeChildren({ list: res.Data, id: parentId })
      //     }
      //   } else {
      //     this.getList()
      //   }
      // } catch (error) {}
    },
    mergeChildren (data) {
      let ids = this.allDepartmentList.map(item => {
        return item.id
      })
      data.list.map(item => {
        item.parentId = data.id
        if (ids.indexOf(item.id) > -1) {
          this.allDepartmentList = this.allDepartmentList.filter(i => i.id !== item.id)
        }
        this.allDepartmentList.push(item)
      })
      this.departmentTreeList = this.buildTree(this.allDepartmentList)
    },
    selectRow (obj) {
      this.checkedDepartmentIds = obj.ids
      this.currentDepartmentId = obj.ids[0]
      this.checkedDepartmentList = obj.rows
      if (this.checkedDepartmentIds.length === 1) {
        this.currentDepartment = obj.rows[0]
        if (this.$refs.departmentTabsRef.activeKey === '1') {
          // 常规信息
          this.$refs.departmentTabsRef.$refs.departmentInfoRef.isEdit = true
          this.$refs.departmentTabsRef.getDepartmentInfo(this.currentDepartmentId)
        } else if (this.$refs.departmentTabsRef.activeKey === '2') {
          // 包含岗位
          this.$refs.departmentTabsRef.getPostList(this.currentDepartmentId)
        } else if (this.$refs.departmentTabsRef.activeKey === '3') {
          // 包含用户
          this.$refs.departmentTabsRef.getUserList(this.currentDepartmentId)
        } else {
          // 操作日志
          this.$refs.departmentTabsRef.getOperationList(this.currentDepartmentId)
        }
      } else if (this.checkedDepartmentIds.length === 0) {
        this.clearCheckedIds()
      }
    },
    handleCreate () {
      this.$refs.createDepartmentRef.showForm()
    },
    handleDelete () {
      this.$confirm({
        title: '删除部门',
        content: `确认要把[${this.checkedDepartmentIds.length}]个部门删除吗？`,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.removeDepartment()
        }
      })
    },
    departmentInfoUpdate () {
      this.clearCheckedIds()
      this.getList()
    },
    handleSearch (data) {
      this.searchItem.nameFilter = ''
      this.searchItem.numberFilter = ''
      this.searchItem.director = ''
      this.searchItem.updateUser = ''
      this.searchItem[data.searchCondition] = data.inputValue
      this.searchItem.pageIndex = 1
      this.clearCheckedIds()
      this.getSearchList()
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
    getExpandIds (list, arr) {
      list.forEach(item => {
        if (item.childList && item.childList.length > 0) {
          arr.push(item.id)
          this.getExpandIds(item.childList, arr)
        }
      })
      return arr
    },
    changePage (pageObj) {
      this.clearCheckedIds()
      this.searchItem.pageSize = pageObj.limit
      this.searchItem.pageIndex = pageObj.page
      this.getList()
    },
    clearCheckedIds () {
      this.checkedDepartmentIds = []
      this.checkedDepartmentList = []
      this.currentDepartmentId = ''
      this.currentDepartment = {}
      this.$refs.departmentTabsRef.currentDepartmentDetail = {}
      this.$refs.departmentTabsRef.postList = []
      this.$refs.departmentTabsRef.userList = []
      this.$refs.departmentTabsRef.logData = []
      this.$refs.departmentTabsRef.logListTotalNums = 0
    },
    async getList () {
      try {
        this.isLoading = true
        const res = await departmentList(this.searchItem)
        // this.$refs.departmentListRef.expandedRowKeys = []
        // this.allDepartmentList = res.Data.rows
        // this.departmentTreeList = res.Data.rows.map(item => {
        //   item.childList = []
        //   return item
        // })
        this.departmentTreeList = res.Data.rows
        this.$refs.departmentListRef.expandedRowKeys = this.getExpandIds(this.departmentTreeList, [])
        this.totalNums = res.Data.totalCount
      } catch (error) {

      } finally {
        this.isLoading = false
      }
    },
    async removeDepartment () {
      try {
        const res = await deleteDepartment(this.checkedDepartmentIds)
        if (res.Code === 0) {
          this.$message.success('删除成功')
        } else if (res.Code === 99999) {
          this.delFailList = res.Data
          this.$refs.delFailTipRef.visible = true
        } else {
          this.$message.error(res.Message)
        }
        this.setPageIndex()
        this.getList()
        this.clearCheckedIds()
      } catch (error) {}
    },
    buildTree (arr) {
      const cloneData = JSON.parse(JSON.stringify(arr)) // 对源数据深度克隆
      const brr = cloneData.filter(father => {
        const branchArr = cloneData.filter(child => father.id === child.parentId) // 返回每一项的子级数组
        // eslint-disable-next-line no-unused-expressions
        branchArr.length > 0 ? (father.childList = branchArr) : (father.childList = []) // 如果存在子级，则给父级添加一个childList属性，并赋值
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
    },
    setPageIndex () {
      const totalPage = Math.ceil((this.totalNums - this.checkedDepartmentIds.length) / this.searchItem.pageSize)
      const currentPage = this.searchItem.pageIndex > totalPage ? totalPage : this.searchItem.pageIndex
      this.searchItem.pageIndex = currentPage < 1 ? 1 : currentPage
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    height:calc(100vh - 84px);
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    .top{
      width: 100%;
      height:60vh;
      background-color:#fff;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
      margin-bottom:10px;
      overflow-y: auto;
    }
    .bottom{
      flex: 1;
      background-color:#fff;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
      overflow-y: auto;
    }
  }
</style>
