<template>
    <div class="search-suggestion">
        <van-cell
        icon="search"
        v-for="(tetx,index) in suggestions"
        :key="index"
        >
        <div slot="title" v-html="highlight(text)"></div>
      </van-cell>
      <!-- 双花括号绑定会直接输出纯文本内容 -->
      <div>{{ htmlStr }}</div>
      <div v-html="htmlStr"></div>
    </div>
</template>

<script>
import getSearchSuggestions from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',

  data () {
    return {
      suggestions: [], // 联想建议数据列表
      htmlStr: 'Hello <span style="color: red">Word</span>'
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      // searchText 发生改变的时候就会调用handler函数
      // 注意： handler 函数名称是固定的
      // handler (value) {
      //   this.loadSearchSuggestions(value)
      // },
      handle: debounce(
        function (value) {
          this.loadSearchSuggestions(value)
        }
      ),
      immediate: true // 该参数会在侦听开始之后立即被调用
    }
  },

  mounted () {

  },

  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    highlight (text) {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
