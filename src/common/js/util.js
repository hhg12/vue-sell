//解析url参数
//example ?id=12345&a=b
//return Object {id:12345,a:b}
export function urlParse () {
  let query = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = query.match(reg)
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substr(1).split('=')
      let key = tempArr[0]
      let value = tempArr[1]
      obj[key] = decodeURIComponent(value)
    })
  }
  // console.log(obj)
  return obj
}
