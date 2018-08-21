export default {
  // 把数组转成对像
  transferObj: function (arr) {
    let obj = {}
    arr.forEach(function (v, i) {
      obj[i] = v
    })
    return obj
  },
  // 把对像转成数组
  transferArr: function (obj) {
    let arr = []
    for (let key in obj) {
      arr.push(obj[key])
    }
    return arr
  }
}
