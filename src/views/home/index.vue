<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
      >搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 频道列表 -->
    <!-- 通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。
        通过 animated 属性可以开启切换标签内容时的转场动画。
        通过 swipeable 属性可以开启滑动切换标签页。 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
      :title="channel.name"
      v-for="channel in channels"
      :key="channel.id"
      >
      <!-- 文章列表 -->
        <article-list :channel="channel" />
      <!-- /文章列表 -->
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div
      slot="nav-right"
      class="hamburger-btn"
      @click="isChannelEditShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /频道列表 -->
    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
      >
      <channel-edit
      :my-channels="channels"
      :active="active"
      />
      </van-popup>

    <!-- /弹出层 -->
  </div>
</template>

<script>
import ArticleList from './components/article-list.vue'
import { getUserInfo } from '@/api/user'
import channelEdit from './components/channel-edit.vue'

export default {
  name: 'HomeIndex',
  components: { ArticleList, channelEdit },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      active: 0,
      channels: [], // 频带列表
      isChannelEditShow: false // 控制编辑频道弹出层的现实状态
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserInfo()
        this.channels = data.data.channels
      } catch (error) {
        this.$toast('获取用户频道失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 87px;
  padding-bottom: 50px;
  /deep/  .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 240px;
    height: 32px;
    background-color: #5babfb;
    border: none;
    font-size: 14px;
    .van-icon {
      font-size: 16px;
    }
  }
  /deep/ .channel-tabs{
    .van-tabs__wrap{
      height: 41px;
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
    }
    .van-tab{
      min-width: 100px;
      border-right: 1px solid #edeff3;
      font-size: 15px;
      color: #777777;
    }
    .van-tab--active{
      color: #333333;
    }
    .van-tabs__nav{
      padding-bottom: 0;
    }
    .van-tabs__line{
      bottom: 4px;
      width: 15px !important;
      height: 3px;
      background-color: #3296fa;
    }
    .placeholder{
      width: 33px;
      height: 41px;
      flex-shrink: 0;
    }
    .hamburger-btn{
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 33px;
      height: 41px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao{
        font-size: 16.5px;
      }
      &:before{
        content:"";
        position: absolute;
        left:0;
        width: 1px;
        height: 100%;
        background-image: url(@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
