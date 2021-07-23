<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <a-pagination
      :background="background"
      :current="page"
      :page-size-options="pageSizeOptions"
      :page-sizes="pageSize"
      :total="total"
      :show-total="total => `共 ${total} 条`"
      :show-size-changer="true"
      @showSizeChange="onShowSizeChange"
      @change="handleCurrentChange"
      :item-render="itemRender"
      :disabled="total===0"
    >
      <template slot="buildOptionText" slot-scope="props">
        <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
        <span v-if="props.value === '50'">全部</span>
      </template>
    </a-pagination>
  </div>
</template>

<script>
// import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Number,
      default: 10
    },
    pageSizeOptions: {
      type: Array,
      default: () => ['10', '20', '30', '50']
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get () {
        return this.page
      },
      set (val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get () {
        return this.pageSizes
      },
      set (val) {
        this.$emit('update:pageSizes', val)
      }
    }
  },
  methods: {
    itemRender (current, type, originalElement) {
      // console.log(originalElement, 'originalElement')
      return originalElement
    },
    onShowSizeChange (current, pageSize) {
      this.$emit('change-page', { page: 1, limit: pageSize })
    },
    handleCurrentChange (val) {
      this.$emit('change-page', { page: val, limit: this.pageSize })
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 20px 16px 10px;
  text-align: right;
}
.pagination-container.hidden {
  display: none;
}
</style>
