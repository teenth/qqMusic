<template>
  <scroll
    class="suggest"
    ref="suggest"
    :pullUp="true"
    :data="list"
    @scrollToEnd="searchMore"
    :beforeScroll="true"
    @beforeScrollStart="beforeScrollStart">
    <ul class="suggest-list">
      <li class="suggest-item" @click="selectItem(item)" v-for="item in list">
        <div class="icon">
          <i :class="getCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisaplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !list.length" class="no-result-wrapper">
      <no-result title="没有搜索结果"></no-result>
    </div>
  </scroll>
</template>
<script>
  import {search} from 'api/search'
  import {ERR_OK} from 'api/config'
  const TYPE_SINGER = 'singer'
  const perpage = 20
  import Loading from 'base/loading/loading'
  import {createSong} from 'common/js/song'
  import Scroll from 'base/scroll/scroll'
  import {mapMutations, mapActions} from 'vuex'
  import Singer from 'common/js/singer'
  import NoResult from 'base/no-result/no-result.vue'
  export default{
    data () {
      return {
        list: [],
        hasMore: true,
        page: 1
      }
    },
    components: {Scroll, Loading, NoResult},
    props: {
      showSinger: {
        type: Boolean,
        default: true
      },
      query: {
        type: String,
        default: ''
      }
    },
    watch: {
      query (newQuery) {
        this._search(newQuery)
      }
    },
    methods: {
      beforeScrollStart () {
        this.$emit('beforeScrollStart')
      },
      refresh () {
        this.$refs.suggest.refresh()
      },
      selectItem (item) {
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path: `/search/${singer.id}`
          })
          this.setSinger(singer)
        } else {
          this.insertSong(item)
        }
        this.$emit('searchHisory')
      },
      searchMore () {
        if (!this.hasMore) {
          return
        }
        this.page++
        search(this.query, this.page, this.showSinger, perpage).then(res => {
          if (res.code === ERR_OK) {
            this.list = this.list.concat(this._getResult(res.data))
            this._checkMore(res.data)
          }
        })
      },
      _checkMore (data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * 20) >= song.totalnum) {
          this.hasMore = false
        }
      },
      _search () {
        this.page = 1
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, this.page, this.showSinger, perpage).then(res => {
          if (res.code === ERR_OK) {
            this.list = this._getResult(res.data)
            this._checkMore(res.data)
          }
        })
      },
      _getResult (data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      getCls (item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getDisaplayName (item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      _normalizeSongs (list) {
        let ret = []
        list.forEach(musicData => {
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ])
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    position: relative
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
