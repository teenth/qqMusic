<template>
    <transition name="slide">
      <music-list :rank="true" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>
<script>
  import MusicList from 'components/music-list/music-list.vue'
  import {mapGetters} from 'vuex'
  import {getMusicList} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  export default{
    data () {
      return {
        songs: []
      }
    },
    computed: {
      ...mapGetters([
        'toplist'
      ]),
      title () {
        return this.toplist.topTitle
      },
      bgImage () {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return ''
      }
    },
    created () {
      this._getMusicList()
    },
    components: {MusicList},
    methods: {
      _getMusicList () {
        if (!this.toplist.id) {
          this.$router.push({
            path: '/rank'
          })
          return
        }
        getMusicList(this.toplist.id).then(res => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSong(res.songlist)
          }
        })
      },
      _normalizeSong (list) {
        let ret = []
        list.forEach(item => {
          let musicData = item.data
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
  .slide-enter-active,.slider-leave-active
    transition all .3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0 , 0)
</style>
