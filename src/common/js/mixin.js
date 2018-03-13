import {mapGetters, mapMutations, mapActions} from 'vuex'
import {shuffle} from 'common/js/util'
import {playMode} from 'common/js/config'
export const playListMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted () {
    this.handlePlayList(this.playList)
  },
  activated () {
    this.handlePlayList(this.playList)
  },
  watch: {
    playList(newVal) {
      this.handlePlayList(newVal)
    }
  },
  methods: {
    handlePlayList () {
      throw new Error('component must implement handlePlayList method')
    }
  }
}

export const playMixin = {
  computed: {
    iconMode () {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'playlist',
      'mode',
      'favoriteList'
    ])
  },
  methods: {
    changeMode () {
      let mode = (this.mode + 1) % 3
      this.setMode(mode)
      let list = []
      if (this.mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    resetCurrentIndex (list) {
      let index = list.findIndex((item, index) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    toggleFavorite(song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song)
      } else {
        this.saveFavoriteList(song)
      }
    },
    getFavoriteIcon(song) {
      if (this.isFavorite(song)) {
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    },
    isFavorite(song) {
      const index = this.favoriteList.findIndex(item => {
        return item.id === song.id
      })
      return index > -1
    },
    ...mapActions([
      'saveFavoriteList',
      'deleteFavoriteList'
    ]),
    ...mapMutations({
      setPlayState: 'SET_PLAYING',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setMode: 'SET_MODE',
      setPlayList: 'SET_PLAY_LIST'
    })
  }
}

export const searchMixin = {
  data () {
    return {
      query: '',
      delayTime: 100
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    beforeScrollStart () {
      this.$refs.searchbox.blur()
    },
    searchHisory () {
      this.saveSearchHistory(this.query)
    },
    queryChange (query) {
      this.query = query
    },
    selectItem (item) {
      this.$refs['searchbox'].setQuery(item)
    },
    ...mapActions([
      'saveSearchHistory',
      'delectSearchHistory'
    ])
  }
}
