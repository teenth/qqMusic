const SEARCH_KEY = '__SEARCH_KEY__'
const SEARCH_MAX_LENGTH = 15
import storage from 'good-storage'
const PLAY_KEY = '__PLAY__'
const PLAY_MAX_LENGTH = 200
const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX = 200

export function insertArray(arr, val, compare, maxlen) {
  const index = arr.findIndex(compare)

  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxlen && arr.length > maxlen) {
    arr.pop()
  }
}
export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}
export function getSaveSearch() {
  return storage.get(SEARCH_KEY, [])
}
export function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function deleteOne(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, function (item) {
    return query === item
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}
export function deleteAll() {
  storage.remove(SEARCH_KEY)
  storage.set(SEARCH_KEY, [])
  return []
}
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LENGTH)
  storage.set(PLAY_KEY, songs)
  return songs
}
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, item => {
    return item.id === song.id
  }, FAVORITE_MAX)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, item => {
    return song.id === item.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}
