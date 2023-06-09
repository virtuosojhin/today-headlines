<template>
    <div class="article-list">
<!--
      List 列表组件：瀑布流滚动加载，用于展示长列表。

      List 组件通过 loading 和 finished 两个变量控制加载状态，
      当组件初始化或滚动到到底部时，会触发 load 事件并将 loading 自动设置成 true，此时可以发起异步操作并更新数据，
      数据更新完毕后，将 loading 设置成 false 即可。
      若数据已全部加载完毕，则直接将 finished 设置成 true 即可。

      - load 事件：
        + List 初始化后会触发一次 load 事件，用于加载第一屏的数据。
        + 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。

      - loading 属性：控制加载中的 loading 状态
        + 非加载中，loading 为 false，此时会根据列表滚动位置判断是否触发 load 事件（列表内容不足一屏幕时，会直接触发）
        + 加载中，loading 为 true，表示正在发送异步请求，此时不会触发 load 事件

      - finished 属性：控制加载结束的状态
        + 在每次请求完毕后，需要手动将 loading 设置为 false，表示本次加载结束
        + 所有数据加载结束，finished 为 true，此时不会触发 load 事件
     -->
     <van-pull-refresh
     v-model="isreFreshLoading"
     @refresh="onRefresh"
     :success-text="refreshSuccessText"
     :success-duration="1000">
     <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
    >
    <article-item
    v-for="(artical,index) in list"
    :key="index"
    :article="artical"
    />
  <!-- <van-cell v-for="(artical,index) in list" :key="index" :title="artical.title" /> -->
</van-list>
</van-pull-refresh>
    </div>
</template>

<script>
import getArticles from '@/api/artical'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',

  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表请求失败的加载文本
      isreFreshLoading: false, // 控制下拉刷新的 loading 状态
      refreshSuccessText: '刷新成功'// 下拉刷新成功提示文本

    }
  },
  components: {
    ArticleItem
  },

  mounted () {

  },

  methods: {
    async  onLoad () {
      try {
        // 1.请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          timestamp: (this.timestamp || Date.now()),
          // timestamp 请求数据的页码
          // 请求第一页数据：当前最新时间段
          // 用于请求之后数据的时间戳会在当前请求结果中返回给你
          with_top: 1
          // 是否有置顶项
        })
        // 2.把本次请求结果数据放到list数组中
        const { result } = data.data
        this.list.push(...result)// 数组展开操作符
        // 3.本次数据加载结束后要把家在状态设置为结束
        this.loading = false
        // 4.判断数据是否全部加载完成
        if (result.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        // 展示错误状态
        this.error = true
        // 请求失败 loading关闭
        this.isreFreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    },
    // 下拉刷新时调用
    async onRefresh () {
      try {
        // 1.请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: (Date.now()), // 下拉刷新，每次请求最新数据，所以传递当前最新的时间戳
          with_top: 1
          // 是否有置顶项
        })
        // 2.将数据追加到列表顶部
        const { results } = data.data
        this.list.unshift(...results)
        // 3.闭下拉刷新的 loading 状态
        this.isreFreshLoading = false
        // 下拉刷新成功
        this.refreshSuccessText = `刷新成功,更新了${results}条数据`
      } catch (error) {
        console.log('请求失败', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.article-list {
    //百分比单位是相当于父元素来说的
    //height:100%;
    height: 79vh;
    overflow-y: auto;

}
</style>
