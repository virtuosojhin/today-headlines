<template>
    <div class="channel-edit">
        <van-cell :border="false">
            <div slot="title" class="title-text">我的频道</div>
            <van-button
            class="edit-btn"
            type="danger"
            plain
            round
            size="mini"
            >编辑</van-button>
        </van-cell>
        <van-grid class="my-grid" :gutter="10">
            <van-grid-item
            class="grid-item"
            v-for="(channel,index) in myChannels"
            :key="index"
            icon="clear"/>
            <!--
                v-bind:class 语法
                一个对象，对象中的key表示要作用的css雷鸣
                    对象中的value要计算出布尔值
                        true，则作用该雷鸣
                        false，则不作用
              -->
            <span
            class="text"
            :class="{active:index === active}"
            slot=text
            >
                {{ channel.name }}
            </span>
            </van-grid>
            <!-- 频道推荐 -->
            <van-cell :border="false">
            <div slot="title" class="title-text">频道推荐</div>
        </van-cell>
        <van-grid class="recommend-grid" :gutter="10">
            <van-grid-item
            class="grid-item"
            v-for="value in 8"
            :key="value"
            text="文字" />
            </van-grid>
            <!-- /频道推荐 -->
    </div>
  </template>

<script>
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

  <style scoped lang="less">
.channel-edit {
padding: 85px,0;

}
.active{
    color:red
}
.title-text{
    font-style: 32px;
    color:#333333
}
.edit-btn{
    width: 104px;
    height: 48px;
    font-style: 26px;
    color: #f85959;
    border:1px solid #f85959;
}
.grid-item{
    width: 160px;
    height: 86px;
    .van-grid-item__content{
        background-color: #f4f5f6;
        white-space: nowrap;
        .van-grid-item__text{
            font-style: 28px;
            color: #222;
            margin-top: 0;
        }
    }
    /deep/ .my-grid{
        .grid-item{
            .van-icon-clear{
                position: absolute;
                right: -10px;
                top: -10px;
                font-size: 30px;
                color:#cacaca;
                z-index: 2;
            }
        }
    }
    /deep/.recommend-grid{
        .grid-item{
            .van-grid-item__content{
                flex-direction:row ;
                .van-icon-plus{
                    font-style: 28px;
                }
            }
        }
    }
}

</style>
