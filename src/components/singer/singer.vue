<template>
  <div class="singer" ref="singer">
    <listview @select="select" :data="singers" ref="list"></listview>
    <router-view></router-view>
  </div>
</template>
<script>
  import {getSingerList} from 'api/singer'
  import Singer from 'common/js/singer'
  import Listview from 'base/listview/listview'
  import {mapMutations} from 'vuex'
  import {playListMixin} from 'common/js/mixin'
  const HOT_NAME = '热门'
  const HOT_SINGER_LENGTH = 9
  export default{
    components: {Listview},
    mixins: [playListMixin],
    data () {
      return {
        singers: []
      }
    },
    created () {
      this._getSingerList()
    },
    methods: {
      handlePlayList (playList) {
        const bottom = playList.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
      select (item) {
        this.$router.push({
          path: `/singer/${item.id}`
        })
        this.setSinger(item)
      },
      _getSingerList () {
        getSingerList().then(res => {
          this.singers = this._nomalizeSinger(res.data.list)
        })
      },
      _nomalizeSinger (list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LENGTH) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          } else {
            let key = item.Findex
            if (!map[key]) {
              map[key] = {
                title: key,
                items: []
              }
            }
            map[key].items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
        })

        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(map[key])
          } else if (val.title === HOT_NAME) {
            hot.push(map[key])
          }
        }
        ret.sort((itemA, itemB) => {
          return itemA.title.charCodeAt(0) - itemB.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
   position fixed
   top: 88px;
   bottom 0
   width: 100%
</style>
