/**
 * Created by shecaihua on 2017/12/26.
 */
import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pageszie: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    gt_k: 1664029744
  })

  return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    g_tk: 1664029744,
    singermid: singerId
  })
  return jsonp(url, data, options)
}
export function getSongVkey(songmid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 607163598,
    hostUin: '0',
    guid: 7347074854,
    notice: '0',
    platform: 'yqq',
    format: 'json',
    needNewCode: '0',
    uin: 2507379196,
    loginUin: 2507379196,
    cid: 2507379196,
    filename: 'C400' + songmid + '.m4a',
    songmid: songmid
  })
  return jsonp(url, data, options)
}
