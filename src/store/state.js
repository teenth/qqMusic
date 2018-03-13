/**
 * Created by shecaihua on 2017/12/29.
 */
import {playMode} from 'common/js/config'
import {getSaveSearch, loadPlay, loadFavorite} from 'common/js/cache'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  toplist: [],
  history: getSaveSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}
export default state
