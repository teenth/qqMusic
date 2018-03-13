/**
 * Created by shecaihua on 2018/1/11.
 */
<template>
  <div class="search-list" >
    <transition-group name="list" tag="ul">
      <li :key="item" class="search-item" v-for="item in searches">
        <span class="text" @click="select(item)">{{item}}</span>
        <span class="icon">
          <i class="icon-delete" @click.stop="deleteItem(item)"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>
<script>
  export default{
    name: 'SearchList',
    data () {
      return {}
    },
    props: {
      searches: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    methods: {
      select (item) {
        this.$emit('select', item)
      },
      deleteItem (item) {
        this.$emit('delete', item)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-list
    .search-item
      display: flex
      align-items: center
      height: 40px
      overflow: hidden
      &.list-enter-active, &.list-leave-active
        transition: all 0.1s
      &.list-enter, &.list-leave-to
        height: 0
      .text
        flex: 1
        color: $color-text-l
      .icon
        extend-click()
        .icon-delete
          font-size: $font-size-small
          color: $color-text-d
</style>
