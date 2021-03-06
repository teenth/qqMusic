<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click.stop="hidden">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfrim"><i class="icon-clear"></i></span>
          </h1>
        </div>
        <scroll ref="list-content" class="list-content" :data="sequenceList">
          <ul>
            <li class="item" ref="list-item" v-for="(item, index) in sequenceList" @click="selectItem(index)">
              <i class="current" :class="{'icon-play': currentSong.id === item.id}"></i>
              <span class="text">{{item.name}}</span>
              <span @click.stop="toggleFavorite(item)" class="like">
                <i :class="getFavoriteIcon(item)"></i>
              </span>
              <span class="delete" @click.stop="deleteOne(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </ul>
        </scroll>
        <div class="list-operate">
          <div class="add" @click.stop="showAddList">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click.stop="hidden">
          <span>关闭</span>
        </div>
      </div>
      <add-song ref="add-song"></add-song>
      <confirm ref="confirm" text="你确定要清空播放列表吗" cancelBtnText="取消" confirmBtnText="清空" @confirm="confirm"></confirm>
    </div>
  </transition>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import Scroll from 'base/scroll/scroll'
  import {playMode} from 'common/js/config'
  import {playMixin} from 'common/js/mixin'
  import Confirm from 'base/confirm/confirm'
  import AddSong from 'components/add-song/add-song'
  export default{
    mixins: [playMixin],
    data () {
      return {
        showFlag: false
      }
    },
    components: {Scroll, Confirm, AddSong},
    computed: {
      modeText () {
        return this.mode === playMode.sequence ? '顺序搜素' : this.mode === playMode.random ? '随机播放' : '单曲循环'
      },
      ...mapGetters([
        'sequenceList',
        'currentSong',
        'currentIndex',
        'playList',
        'mode'
      ])
    },
    methods: {
      showAddList () {
        this.$refs['add-song'].show()
      },
      showConfrim () {
        this.$refs.confirm.show()
      },
      confirm () {
        this.deleteSongList()
      },
      show () {
        setTimeout(() => {
          this.$refs['list-content'].refresh()
          this.scrollToCurrent(this.currentSong)
        }, 20)
        this.showFlag = true
      },
      hidden () {
        this.showFlag = false
      },
      selectItem (index) {
        if (this.mode === playMode.random) {
          index = this.playList.findIndex((item) => {
            return item.id === this.currentSong.id
          })
        }
        this.setCurrentIndex(index)
        this.setPlayState(true)
      },
      scrollToCurrent (currentSong) {
        let index = this.sequenceList.findIndex(item => {
          return item.id === currentSong.id
        })
        this.$refs['list-content'].scrollToElement(this.$refs['list-item'][index], 300)
      },
      deleteOne (item) {
        this.deleteSong(item)
        if (!this.playList.length) {
          this.hidden()
        }
      },
      ...mapActions([
        'deleteSong',
        'deleteSongList'
      ])
    },
    watch: {
      currentSong (newSong, oldSong) {
        if (!this.showFlag || newSong.id === oldSong.id) {
          return
        }
        this.scrollToCurrent(newSong)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-highlight-background
      .list-header
        position: relative
        padding: 20px 30px 10px 20px
        .title
          display: flex
          align-items: center
          .icon
            margin-right: 10px
            font-size: 30px
            color: $color-theme-d
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-text-l
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
      .list-content
        max-height: 240px
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            no-wrap()
            font-size: $font-size-medium
            color: $color-text-d
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
          .delete
            extend-click()
            font-size: $font-size-small
            color: $color-theme
      .list-operate
        width: 140px
        margin: 20px auto 30px auto
        .add
          display: flex
          align-items: center
          padding: 8px 16px
          border: 1px solid $color-text-l
          border-radius: 100px
          color: $color-text-l
          .icon-add
            margin-right: 5px
            font-size: $font-size-small-s
          .text
            font-size: $font-size-small
      .list-close
        text-align: center
        line-height: 50px
        background: $color-background
        font-size: $font-size-medium-x
        color: $color-text-l
</style>
