<template>
  <div class="container">
    <height-drag>
      <div slot="top" class="full-height flex flex-column">
        <div class="page-title">岗位管理</div>
        <div class="flex margin-bottom justify-between align-center">
          <div class="flex btn-box">
            <a-button type="primary" class="margin-right-xs" @click="handleCreate">
              <my-icon type="icon-xinjian" class="btn-icon-size"></my-icon>
              新建岗位
            </a-button>
            <a-button
              class="margin-right-xs"
              :disabled="checkedPostIds.length===0"
              @click="handleDelete"
            >
              <my-icon type="icon-shanchu" class="btn-icon-size"></my-icon>
              删除岗位
            </a-button>
          </div>
          <my-search default-value="nameFilter" :list="searchLabel" @handle-search="handleSearch"></my-search>
        </div>
        <div style="flex:1">
          <list
            :is-loading="isLoading"
            :data-list="allPostList"
            :data-columns="columns"
            :search-item="searchItem"
            :total-nums="totalNums"
            :checked-post-ids="checkedPostIds"
            :show-pagination="true"
            @select-row="selectRow"
            @change-page="changePage"
          ></list>
        </div>
      </div>
      <div slot="bottom">
        <tabs
          ref="postTabsRef"
          :current-post-id="currentPostId"
          :is-possible-edit="infoIsPossibleEdit"
          @refresh-list="postInfoUpdate"
        ></tabs>
      </div>
    </height-drag>
    <create-post ref="createUserRef"></create-post>
  </div>
</template>

<script>
import HeightDrag from '@/components/HeightDrag'
import MySearch from '@/components/MySearch'
import List from './list'
import Tabs from './tabs/index'
import SearchForm from './searchForm'
import CreatePost from './createPost'
import { postList, deletePost } from '@/api/user'
export default {
  name: 'Error',
  components: { HeightDrag, MySearch, List, Tabs, SearchForm, CreatePost },
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
      isLoading: false,
      infoIsPossibleEdit: false,
      allPostList: [],
      totalNums: 0,
      currentPostId: '',
      checkedPostIds: [],
      checkedPostList: [],
      checkedPost: {},
      searchItem: {
        pageIndex: 1,
        pageSize: 10
      },
      columns: [
        {
          title: '岗位名称',
          key: 'postName',
          dataIndex: 'postName',
          width: 200,
          ellipsis: true,
          fixed: 'left'
        },
        {
          title: '岗位编码',
          key: 'postNumber',
          dataIndex: 'postNumber',
          width: 200,
          ellipsis: true
        },
        {
          title: '所属部门',
          key: 'departmentName',
          dataIndex: 'departmentName',
          width: 150,
          ellipsis: true
        },
        {
          title: '岗位描述',
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
    selectRow (obj) {
      this.checkedPostIds = obj.ids
      this.currentPostId = obj.ids[0]
      this.checkedPostList = obj.rows
      if (this.checkedPostIds.length === 1) {
        this.checkedPost = obj.rows[0]
        if (this.$refs.postTabsRef.activeKey === '1') {
          // 常规信息
          this.$refs.postTabsRef.$refs.postInfoRef.isEdit = true
          this.$refs.postTabsRef.getPostInfo(this.currentPostId)
        } else if (this.$refs.postTabsRef.activeKey === '2') {
          // 包含用户
          this.$refs.postTabsRef.getPostUserList(this.currentPostId)
        } else {
          // 操作日志
          this.$refs.postTabsRef.getOperationList(this.currentPostId)
        }
      } else if (this.checkedPostIds.length === 0) {
        this.clearCheckedIds()
      }
    },
    handleCreate () {
      this.$refs.createUserRef.showForm()
    },
    handleDelete () {
      this.$confirm({
        title: '删除岗位',
        content: `确认要把[${this.checkedPostIds.length}]个岗位删除吗？`,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.removePost()
        }
      })
    },
    postInfoUpdate () {
      this.clearCheckedIds()
      this.getList()
    },
    changePage (pageObj) {
      // this.clearCheckedIds()
      this.searchItem.pageSize = pageObj.limit
      this.searchItem.pageIndex = pageObj.page
      this.getList()
    },
    async getList () {
      try {
        this.isLoading = true
        const res = await postList(this.searchItem)
        this.allPostList = res.Data.rows
        this.totalNums = res.Data.totalCount
      } catch (error) {

      } finally {
        this.isLoading = false
      }
    },
    async removePost () {
      try {
        const res = await deletePost(this.checkedPostIds)
        if (res.Code === 0) {
          this.$message.success('删除成功')
        } else {
          this.$message.error(res.Message)
        }
        this.setPageIndex()
        this.getList()
        this.clearCheckedIds()
      } catch (error) {}
    },
    handleSearch (data) {
      this.searchItem.nameFilter = ''
      this.searchItem.numberFilter = ''
      this.searchItem.departmentNameFilter = ''
      this.searchItem.updateUserFilter = ''
      this.searchItem[data.searchCondition] = data.inputValue
      this.searchItem.pageIndex = 1
      this.clearCheckedIds()
      this.getList()
    },
    clearCheckedIds () {
      this.checkedPostIds = []
      this.checkedPostList = []
      this.currentPostId = ''
      this.checkedPost = {}
      this.$refs.postTabsRef.currentPostDetail = {}
      this.$refs.postTabsRef.userList = []
      this.$refs.postTabsRef.logData = []
      this.$refs.postTabsRef.logListTotalNums = 0
    },
    setPageIndex () {
      const totalPage = Math.ceil((this.totalNums - this.checkedPostIds.length) / this.searchItem.pageSize)
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
  }
</style>
