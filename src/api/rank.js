/**
 * Created by shecaihua on 2018/1/6.
 */
import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    g_tk: 67232076
  })
  return jsonp(url, data, options)
}

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({}, commonParams, {
    page: 'detail',
    type: 'top',
    topid,
    tpl: 3,
    platform: 'h5',
    needNewCode: 1,
    g_tk: 67232076
  })
  return jsonp(url, data, options)
}
