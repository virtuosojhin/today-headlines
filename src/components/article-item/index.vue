<template>
      <van-cell
      class="article-item"
      >
      <div slot="title" class="title van-multi-ellipsis--l2" >{{ article.title }}</div>
      <div slot="label">
        <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
        class="cover-item"
        v-for="(img,index) in article.cover.images"
        :key="index">
        <van-image
          width="100"
          height="100"
          :src="img"
          class="cover-item-img"
        />
        </div>
        </div>
        <div class="label-info-wrap">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comn_count }}评论</span>
          <span>{{ article.pubdate }}</span>
        </div>
      </div>
      <van-image
      v-if="artilce.cover.type === 1"
        slot="default"
        class="right-cover"
        :src="article.cover.image[0]"
      />
      </van-cell>
</template>

<script>
export default {
  name: 'Article-item',

  data () {
    return {

    }
  },

  mounted () {

  },

  methods: {

  },
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.article-item{
  .title{
    font-style: 16px;
    color: #3a3a3a;
  }
  .van-cell__value{
    flex:unset;
    width: 232px;
    height: 146px;
  }
  .right-cover{
    width: 232px;
    height: 146px;
    padding-left: 20px;
  }
  .label-info-wrap span{
    font-style: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap{
    display: flex;
    padding: 30px,0;
    .cover-item{
      flex: 1;
      height: 146px;
      &:not(:last-child){
        padding-right: 4px;
      }
      .cover-item-img{
      width: 100%;
      height: 146px;
    }
    }
  }

}
</style>
