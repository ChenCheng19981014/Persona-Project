<template>
  <div>
    <a-input-search v-model="searchObj.inputValue" class="search-area" @search="onSearch" allowClear>
      <a-select slot="addonBefore" v-model="searchObj.searchCondition" class="search-select" @change="changeSearchCondition">
        <a-select-option v-for="item in list" :value="item.value" :key="item.value">
          {{ item.name }}
        </a-select-option>
      </a-select>
      <a-button slot="enterButton" type="primary">
        <my-icon type="icon-sousuo" class="btn-search-icon-size"></my-icon>
      </a-button>
    </a-input-search>
  </div>
</template>

<script>
export default {
  props: {
    defaultValue: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    },
    currentFolderId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchObj: {
        searchCondition: this.defaultValue,
        inputValue: ''
      }
    }
  },
  methods: {
    changeSearchCondition () {
      this.searchObj.inputValue = ''
    },
    onSearch () {
      // this.searchObj.inputValue = value
      // console.log(this.searchObj)
      this.$emit('handle-search', this.searchObj)
    }
  }
}
</script>

<style scoped lang="less">
.search-area{
  width:380px;
  .search-select{
    width: 130px
  }
}
// @media screen and (max-width:1280px) {
//   .search-area {
//     width: 300px;
//   }
// }
</style>
