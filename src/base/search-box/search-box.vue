<template>
  <div class="search-box" @click.stop>
    <i class="icon-search"></i>
    <input class="box" ref="query" v-model="query" :placeholder="placeholder"/>
    <i @click="clear" v-show="query" class="icon-dismiss"></i>
  </div>
</template>
<script>
  import {deBounce} from 'common/js/util'
  export default{
    data () {
      return {
        query: ''
      }
    },
    props: {
      placeholder: {
        type: String,
        default: '请输入歌手、歌曲'
      }
    },
    created () {
      this.$watch('query', deBounce((newquery) => {
        this.$emit('query', newquery)
      }, 500))
    },
    methods: {
      clear () {
        this.query = ''
      },
      setQuery (str) {
        this.query = str
      },
      blur () {
        this.$refs.query.blur()
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>
