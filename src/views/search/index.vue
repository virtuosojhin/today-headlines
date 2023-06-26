<template>
    <div class="search-container">
        <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。  -->
        <!-- 搜索栏 -->
        <form action="/">
            <van-search
                v-model="searchText"
                show-action
                placeholder="请输入搜索关键词"
                background="#3296fa"
                @search="onSearch"
                @cancel="onCancel"
                @focus="isResultShow = false"
            />
            </form>
        <!-- /搜索栏 -->

            <!-- 搜索结果 -->
            <search-result v-if="isSearchIndex"/>
            <!-- /搜索结果 -->

            <!-- 联想建议 -->
            <search-suggestion
            v-else-if="searchText"
            :search-text="searchText"
            />
            <!-- /联想建议 -->

            <!-- 搜索历史记录 -->
            <search-history v-else />
            <!-- /搜索历史记录 -->

    </div>
</template>

<script>
import SearchResult from './commponent/search-result'
import SearchSuggestion from './commponent/SearchSuggestion'
import SearchHistory from './commponent/SearchHistory'
export default {
  name: 'SearchIndex',
  components: {
    SearchResult,
    SearchSuggestion,
    SearchHistory
  },
  data () {
    return {
      searchText: '',
      isSearchIndex: false // 控制搜索结果展示
    }
  },

  mounted () {

  },

  methods: {
    onSearch (val) {
      console.log(val)
      this.isSearchIndex = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.search-container{
    .van-search__action{
        color:#fff
    }
}
</style>
