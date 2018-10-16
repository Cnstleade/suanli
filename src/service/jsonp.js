import jsonp from '../jsonp/jsonp'


export function getPrice() {
  const url = 'http://www.rhy.com/index/getPrice'

  const data = Object.assign({})

  return jsonp(url, data)
}
