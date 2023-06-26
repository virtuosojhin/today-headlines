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
            @click="isEdit= !isEdit"
            >{{isEdit?  '完成':'编辑'}}</van-button>
        </van-cell>
        <van-grid class="my-grid" :gutter="10">
            <van-grid-item
            class="grid-item"
            v-for="(channel,index) in myChannels"
            :key="index"
            @click="onMyChannelClick(channel,index)"/>
            <!--
                v-bind:class 语法
                一个对象，对象中的key表示要作用的css雷鸣
                    对象中的value要计算出布尔值
                        true，则作用该雷鸣
                        false，则不作用
              -->
              <van-icon
              v-show="isEdit && !fiexdChannels.includes(channel.id)"
              slot="icon"
              name="clear"
              ></van-icon>
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
            v-for="(channel,index) in recommendChannels"
            :key="index"
            icon="plus"
            :text="channel.name"
            @click="onAddChannel(channel)" />
            </van-grid>
            <!-- /频道推荐 -->
    </div>
  </template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

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
      allChannels: [],
      isEdit: false,
      fiexdChannels: [0]
    }
  },
  computed: {
    ...mapState(['user']),
    // 计算属性会观测内部依赖数据的变化
    // 如果数据发生变化，计算属性也会重新执行
    recommendChannels () {
      // 数组的 filter 方法：遍历数组，把符合条件的元素存储到新数组中
      return this.allChannels.filter(channel => {
        // 数组的 find 方法也是遍历数组，把符合条件的第一个元素返回
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }
    // recommendChannels () {
    //   const channels = []
    //   this.allChannels.forEach(channel => {
    //     const ret = this.myChannels.find(myChannel => {
    //       return myChannel.id === channel.id
    //     })
    //     // 如果我的频道中不包括该频道项，则收集到推荐频道中
    //     if (!ret) {
    //       channels.push(channel)
    //     }
    //   })
    //   return channels
    // }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (error) {
        this.$toast('请求数据失败')
      }
    },
    async onAddChannel (channel) {
    //   this.myChannels.push(channel)
      // 向父组件传值,更新数组
      this.$emit('userChannels', channel)
      // 数据持久化
      if (this.user) {
        // 已登陆，把数据请求放到线上
        try {
          await addUserChannel({
            id: this.channel.id, // 频道id
            seq: this.myChannel.length // 序号
          })
        } catch (error) {
          this.$toast('保存失败，请稍后重试')
        }
      } else {
        // 未登录，把数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick (channel, index) {
      // 参数1 ：要删除的元素的开始索引（）包括
      // 参数2 ：删除的个数，如果不置顶，则从参数1开始一直删除到晚
      if (this.fiexdChannels.includes(channel.id)) {
        return
        // 如果是固定频道，则不删除
      }
      // 2. 删除频道项
      //   this.myChannels.splice(index, 1)
      if (this.isEdit) {
        // 编辑状态，执行删除频道
        if (index <= this.active) {
          // 让激活频道的索引 -1
          this.$emit('update-active', this.ative - 1, true)
        }
        // 4. 数据持久化
        this.deleteChannels(channel)
      } else {
        // 非编辑状体啊，执行切换频道
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannels (channel) {
      try {
        if (this.user) {
        // 已登陆，将数据更新到线上
          deleteUserChannel(channel.id)
        } else {
        // 未登录，将数据更新到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (error) {
        this.$toast('操作失败，请稍后重试')
      }
    }
  }
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
        .active{
            color:red
        }
        .van-grid-item__icon-wrapper{
            padding: unset;
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
