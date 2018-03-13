<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import MusicList from 'components/music-list/music-list'
  export default{
    components: {MusicList},
    data () {
      return {
        songs: []
      }
    },
    created () {
      this._getSingerDetail()
    },
    computed: {
      title () {
        return this.singer.name
      },
      bgImage () {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    methods: {
      _getSingerDetail () {
        console.log(this.singer)
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then(res => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSong(res.data.list)
          }
        })
      },
      _normalizeSong (list) {
        let ret = []
        list.forEach(item => {
          let {musicData} = item
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .singer-detail
   position fixed
   z-index 100
   top 0
   left 0
   right 0
   bottom 0
   background $color-background
  .slide-enter-active,.slider-leave-active
   transition all .3s
  .slide-enter, .slide-leave-to
   transform translate3d(100%, 0 , 0)
</style>
