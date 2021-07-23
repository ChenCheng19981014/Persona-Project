<template>
  <div class="container">
    <height-drag>
      <div slot="top" class="full-height flex flex-column">
        <div>
          <div class="page-title">编码规则</div>
          <div class="flex margin-bottom justify-between align-center">
            <div class="flex btn-box">
              <a-button type="primary" class="margin-right-xs" @click="handleCreate">
                <my-icon type="icon-xinjian" class="btn-icon-size"></my-icon>
                新建编码规则
              </a-button>
              <a-button
                class="margin-right-xs"
                :disabled="checkedCodeIds.length===0"
                @click="handleDelete"
              >
                <my-icon type="icon-shanchu" class="btn-icon-size"></my-icon>
                删除编码规则
              </a-button>
            </div>
            <my-search default-value="numberRuleName" :list="searchLabel" @handle-search="handleSearch"></my-search>
          </div>
        </div>
        <div style="flex:1">
          <coding-table
            :is-loading="isLoading"
            :data-list="codeList"
            :search-item="searchItem"
            :total-nums="totalNums"
            :checked-code-ids="checkedCodeIds"
            :show-pagination="true"
            :all-type-list="allTypeList"
            @select-row="selectRow"
            @change-page="changePage"
            @handle-filters="handleFilters"
          ></coding-table>
        </div>
      </div>
      <div slot="bottom">
        <code-tabs
          ref="codeTabsRef"
          :current-code-id="currentCodeId"
          :all-type-list="allTypeList"
          :is-possible-edit="infoIsPossibleEdit"
          @refresh-list="codeInfoUpdate"
        ></code-tabs>
      </div>
    </height-drag>
    <!-- <create-user ref="createUserRef"></create-user>
    <reset-password ref="resetPasswordRef" :current-user-id="currentCodeId"></reset-password> -->
  </div>
</template>

<script>
import HeightDrag from '@/components/HeightDrag'
import MySearch from '@/components/MySearch'
import codingTable from './components/codingTable'
import CodeTabs from './components/CodeTabs'
// import SearchForm from './searchForm'
// import CreateUser from './createUser'
import { numberRuleList, typeList, delNumberRule } from '@/api/numberRule'
export default {
  name: 'Error',
  components: { HeightDrag, MySearch, CodeTabs, codingTable },
  data () {
    return {
      searchLabel: [
        {
          name: '编码规则名称',
          value: 'numberRuleName'
        },
        {
          name: '创建用户',
          value: 'createUser'
        }
      ],
      isLoading: false,
      infoIsPossibleEdit: false,
      codeList: [],
      allTypeList: [],
      totalNums: 0,
      currentCodeId: '',
      checkedCodeIds: [],
      checkedCodeList: [],
      checkedCode: {},
      searchItem: {
        numberRuleName: '',
        objectKind: null,
        createUser: '',
        pageIndex: 1,
        pageSize: 10
      },
      filteredInfo: {}
    }
  },
  mounted () {
    this.getList()
    this.getTypeList()
  },
  methods: {
    selectRow (obj) {
      this.checkedCodeIds = obj.ids
      this.currentCodeId = obj.ids[0]
      this.checkedCodeList = obj.rows
      if (this.checkedCodeIds.length === 1) {
        this.checkedCode = obj.rows[0]
        if (this.$refs.codeTabsRef.activeKey === '1') {
          // 常规信息
          this.$refs.codeTabsRef.$refs.codeInfoRef.isEdit = true
          this.$refs.codeTabsRef.getCodeDetail(this.currentCodeId)
        } else {
          // 操作日志
          this.$refs.codeTabsRef.isEdit = true
          this.$refs.codeTabsRef.getCodeSegmentList(this.currentCodeId)
        }
      } else if (this.checkedCodeIds.length === 0) {
        this.clearCheckedIds()
      }
    },
    handleCreate () {
      this.$router.push('/basicManagement/coding/create')
    },
    handleDelete () {
      this.$confirm({
        title: '删除编码规则',
        content: `确认要把[${this.checkedCodeIds.length}]个规则删除吗？`,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.removeCode()
        }
      })
    },
    enableDisable (type) {
      if (this.checkedCodeIds.length > 0) {
        if (type === '1') {
          let flag = this.checkedCodeList.some(item => {
            return item.userState === 2
          })
          if (flag) {
            return true
          } else {
            return false
          }
        } else {
          let flag = this.checkedCodeList.some(item => {
            return item.userState === 1
          })
          if (flag) {
            return true
          } else {
            return false
          }
        }
      } else {
        return true
      }
    },
    handleForbidden (flag) {
      this.$confirm({
        title: '启用/禁用用户',
        content: `确认要${flag ? '启用' : '禁用'}[${this.checkedCodeIds.length}]个用户吗？`,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.handleEnable(flag)
        }
      })
    },
    handleResetPassword () {
      this.$refs.resetPasswordRef.openModal(this.checkedCode.name)
    },
    handleSearch (data) {
      this.searchItem.numberRuleName = ''
      this.searchItem.objectKind = null
      this.searchItem.createUser = ''
      this.searchItem[data.searchCondition] = data.inputValue
      this.searchItem.pageIndex = 1
      this.clearCheckedIds()
      this.getList()
    },
    codeInfoUpdate () {
      this.clearCheckedIds()
      this.getList()
    },
    handleFilters (data) {
      this.searchItem.objectKind = data.objectKindName[0]
      this.getList()
    },
    changePage (pageObj) {
      this.clearCheckedIds()
      this.searchItem.pageSize = pageObj.limit
      this.searchItem.pageIndex = pageObj.page
      this.getList()
    },
    clearCheckedIds () {
      this.checkedCodeIds = []
      this.checkedCodeList = []
      this.currentCodeId = ''
      this.checkedCode = {}
      this.$refs.codeTabsRef.currentCodeDetail = {}
      this.$refs.codeTabsRef.fieldData = []
    },
    async getList () {
      try {
        this.isLoading = true
        const res = await numberRuleList(this.searchItem)
        this.codeList = res.Data.rows
        this.totalNums = res.Data.totalCount
      } catch (error) {

      } finally {
        this.isLoading = false
      }
    },
    async getTypeList () {
      try {
        const res = await typeList()
        if (res.Code === 0) {
          this.allTypeList = res.Data.map(item => {
            return {
              text: item.value,
              value: item.key
            }
          })
        }
      } catch (error) {
        return error
      }
    },
    async removeCode () {
      try {
        const res = await delNumberRule(this.checkedCodeIds)
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
    setPageIndex () {
      const totalPage = Math.ceil((this.totalNums - this.checkedCodeIds.length) / this.searchItem.pageSize)
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
