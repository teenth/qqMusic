<template>
  <div class="search">
    <div class="search-box-wrapper" >
      <search-box @query="queryChange" ref="searchbox"></search-box>
    </div>
    <div class="shortcut-wrapper" ref="search-cut-wrapper" v-show="!query">
      <scroll :delayTime="delayTime" ref="shortCut" class="shortcut" :data="shortCutData">
        <div>
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li @click="selectItem(item.k)" class="item" v-for="item in hotkey">{{item.k}}</li>
          </ul>
        </div>
        <div class="search-history" v-show="history.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
        <search-list @select="selectItem" @delete="delectSearchHistory" :searches="history"></search-list>
        </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" ref="search-result" v-show="query">
    <suggest
      ref="suggest"
      @beforeScrollStart="beforeScrollStart"
      @searchHisory="searchHisory"
      :query="query"></suggest>
      <router-view></router-view>
    </div>
    <confirm ref="confirm" text="你确定要清空所有历史吗" cancelBtnText="取消" confirmBtnText="清空" @confirm="confirm"></confirm>
  </div>
</template>
<script>
  import SearchBox from 'base/search-box/search-box'
  import SearchList from 'base/search-list/search-list'
  import Confirm from 'base/confirm/confirm'
  import {getHotKey} from 'api/search'
  import {playListMixin, searchMixin} from 'common/js/mixin'
  import {ERR_OK} from 'api/config'
  import Suggest from 'components/suggest/suggest'
  import Scroll from 'base/scroll/scroll'
  import {mapActions, mapGetters} from 'vuex'
  export default{
    mixins: [playListMixin, searchMixin],
    data () {
      return {
        hotkey: [],
        query: ''
      }
    },
    watch: {
      query (newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortCut.refresh()
          }, 20)
        }
      }
    },
    computed: {
      shortCutData () {
        return this.hotkey.concat(this.history)
      },
      ...mapGetters([
        'history'
      ])
    },
    created () {
      this._getHotKey()
    },
    components: {SearchList, SearchBox, Suggest, Confirm, Scroll},
    methods: {
      handlePlayList (playList) {
        const bottom = playList.length > 0 ? '60px' : ''
        this.$refs['search-cut-wrapper'].style.bottom = bottom
        this.$refs.shortCut.refresh()
        this.$refs['search-result'].style.bottom = bottom
        this.$refs.suggest.refresh()
      },
      confirm () {
        this.clearSearchHistory()
      },
      showConfirm () {
        this.$refs.confirm.show()
      },
      _getHotKey () {
        getHotKey().then(res => {
          if (res.code === ERR_OK) {
            this.hotkey = res.data.hotkey.slice(0, 10)
          }
        })
      },
      ...mapActions([
        'clearSearchHistory'
      ])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
