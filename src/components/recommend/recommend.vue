<template>
  <div class="recommend" ref="recommend">
    <Scroll ref="scroll" :data="discList" class="recommend-content">
      <div>
      <div class="slide-wrapper">
        <slider v-if="recommends.length">
          <div v-for="(item, index) in recommends">
            <a :href="item.linkUrl">
              <img class="needsclick" @onload="loadImg" :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li @click="selectItem(item)" v-for="(item, index) in discList" class="item">
            <div class="icon">
              <img width="60" height="60" v-lazy="item.imgurl"/>
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
        <loading class="loading-container" v-show="!discList.length"></loading>
      </div>
    </Scroll>
    <router-view></router-view>
  </div>
</template>
<script>
  import Loading from 'base/loading/loading'
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import {getRecommend, getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {playListMixin} from 'common/js/mixin'
  import {mapMutations} from 'vuex'
  export default {
    components: {Slider, Scroll, Loading},
    mixins: [playListMixin],
    data () {
      return {
        recommends: [],
        discList: []
      }
    },
    created () {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      handlePlayList (playList) {
        const bottom = playList.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      selectItem (item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
      _getRecommend () {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      _getDiscList () {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        })
      },
      loadImg () {
        if (!this.checkLoad) {
          this.checkLoad = true
          this.$refs['scroll'].refresh()
        }
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .recommend
   position: fixed
   width: 100%
   top: 88px
   bottom: 0
   .recommend-content
     height: 100%
     overflow: hidden
     .slider-wrapper
       position: relative
       width: 100%
       overflow: hidden
     .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
       display: flex
       box-sizing: border-box
       align-items: center
       padding: 0 20px 20px 20px
       .icon
        flex: 0 0 60px
        width: 60px
        padding-right: 20px
       .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        font-size: $font-size-medium
        .name
         margin-bottom: 10px
         color: $color-text
        .desc
         color: $color-text-d
   .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
