/**
 * Created by shecaihua on 2017/12/24.
 */
import originalJSONP from 'jsonp'
export default function jsonp (url, data, option) {
  url += url.indexOf('?') > 0 ? '&' + param(data) : '?' + param(data)
  return new Promise((resolve, reject) => {
    originalJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
function param(data) {
  let url = ''
  for (let k in data) {
    let value = data[k] ? encodeURIComponent(data[k]) : ''
    url += `&${k}=${value}`
  }
  return url ? url.substring(1) : ''
}
