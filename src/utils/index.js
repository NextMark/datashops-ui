/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['日', '一', '二', '三', '四', '五', '六'][value]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/ig) != null) {
      len += 1
    } else { len += 0.5 }
  }
  return Math.floor(len)
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json) {
  if (!json) return ''
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key])
  })).join('&')
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    console.log(new Date())
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = {
  disabledDate(time) {
    return time.getTime() > Date.now()
  },
  shortcuts: [
    {
      text: '最近三天',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
        end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近一周',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近半年',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 183)
        end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近一年',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 366)
        end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
        picker.$emit('pick', [start, end])
      }
    }]
}

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = source[keys].constructor === Array ? [] : {}
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * Unix时间戳转换成日期格式  unix2CurrentTime("1497232433000")
 * @param unixTime Unix时间戳
 * @return string yyyy-MM-dd HH:mm:ss
 */
export function unix2CurrentTime(unixTime) {
  const date = new Date(parseInt(unixTime))
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  let h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  let minute = date.getMinutes()
  let second = date.getSeconds()
  minute = minute < 10 ? ('0' + minute) : minute
  second = second < 10 ? ('0' + second) : second
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}

/**
 * 两个Unix时间戳差值
 * @param unixTimeStart Unix时间戳1
 * @param unixTimeEnd Unix时间戳2
 * @return string xx 小时 | xx 天
 */
export function unixDifference(unixTimeStart, unixTimeEnd) {
  const difference = (unixTimeEnd - unixTimeStart) / 1000
  if (difference >= 86400) {
    return difference / 86400 + '天'
  } else if (difference >= 3600) {
    return difference / 3600 + '小时'
  } else if (difference >= 60) {
    return difference / 60 + '分钟'
  } else {
    return difference + '秒'
  }
}

/**
 * 当前Unix时间戳差值
 * @param unixTimeEnd Unix时间戳
 * @return string | null xx天xx小时xx分钟xx秒
 */
export function nowDifference(unixTimeEnd) {
  const unixTimeStart = new Date().getTime()
  const difference = (unixTimeEnd - unixTimeStart) / 1000
  if (difference > 0) {
    let day = Math.floor(difference / (60 * 60 * 24))
    let hour = Math.floor(difference / (60 * 60)) - (day * 24)
    let minute = Math.floor(difference / 60) - (day * 24 * 60) - (hour * 60)
    let second = Math.floor(difference) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
    if (day <= 9) day = '0' + day
    if (hour <= 9) hour = '0' + hour
    if (minute <= 9) minute = '0' + minute
    if (second <= 9) second = '0' + second
    return day + '天' + hour + '小时' + minute + '分钟' + second + '秒'
  } else {
    return null
  }
}

/**
 * Unix时间戳转换成日期格式  unix2CurrentTime("1497232433000")
 * @param unixTime Unix时间戳
 * @return string yyyy-MM-dd
 */
export function getUnix2Date(value) {
  const d_date = new Date(value * 1000)
  const Y = d_date.getFullYear() + '-'
  const M = ((d_date.getMonth() + 1) < 10 ? '0' + (d_date.getMonth() + 1) : (d_date.getMonth() + 1)) + '-'
  const D = (d_date.getDate() < 10 ? '0' + d_date.getDate() : d_date.getDate()) + ''
  return Y + M + D
}

/**
 * element-ui table 表头样式函数
 * @param {*}
 */
export function tableHeaderStyle({ row, rowIndex }) {
  return {
    'background': '#edeff7',
    'font-family': 'Monospaced Number',
    'text-align': 'center',
    'font-size': '12px',
    'border-bottom': '1px solid #cfd3e6',
    'border-right': '1px solid #cfd3e6',
    'color': '#000'
  }
}

/**
 * element-ui table row样式
 * @param {*}
 */
export function tableRowStyle({ row, rowIndex }) {
  return {
    'font-family': 'Monospaced Number',
    'text-align': 'center',
    'border-right': '1px #EEE solid',
    'border-bottom': '1px #EEE solid',
    'font-size': '12px',
    'color': '#000'
  }
}

/**
 * element-ui table cell样式
 * @param {*}
 */
export function tableCellStyle({ row, rowIndex }) {
  return {
    'text-align': 'center',
    'font-size': '12px',
    'color': '#000'
  }
}

/**
 * 建立表头与数据映射关系、数据导出使用
 *@param tableHeader 表头，数组
 *@param tableData 表格数据，json数组
 */
export function formatTableData(tableHeader, tableData) {
  return tableData.map(v => tableHeader.map(j => v[j]))
}

/**
 * 对时间段格式化
 * @param timeDifference 时间段/秒
 * @return string | null xx天xx小时xx分钟xx秒
 */
export function getFormatTime(timeDifference) {
  let result = ''
  if (timeDifference > 0) {
    const day = Math.floor(timeDifference / (60 * 60 * 24))
    const hour = Math.floor(timeDifference / (60 * 60)) - (day * 24)
    const minute = Math.floor(timeDifference / 60) - (day * 24 * 60) - (hour * 60)
    const second = Math.floor(timeDifference) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
    if (day > 0) {
      result += day + '天'
    }
    if (hour > 0) {
      result += hour + '小时'
    }
    if (minute > 0) {
      result += minute + '分钟'
    }
    if (second > 0) {
      result += second + '秒'
    }
    return result
  } else {
    return '0秒'
  }
}

export const userGraphParameter = {
  table: {
    'type': 'table',
    'title': null,
    'itemName': null,
    'showSelect': false,
    'dimension': [],
    'dimensionDefault': {},
    'moreTimeSelect': true,
    'timeType': 'months',
    'timeDefault': 1,
    'description': '',
    'showExport': true,
    'showPagination': true,
    'pageSizes': [10, 20, 30, 50],
    'pageSize': 10,
    'layout': 'total, sizes, prev, pager, next, jumper',
    'showFigureDesc': true,
    'limitFigureColumn': false,
    'figureColumn': [] // 指标列
  },
  line: {
    'type': 'line',
    'title': null,
    'itemName': null,
    'showSelect': false, // 是否显示维度select框
    'dimension': [], // 维度项
    'dimensionDefault': {}, // 维度项默认值
    'moreTimeSelect': true, // 是否时间段选择
    'timeType': 'months', // 默认时间段长
    'timeDefault': 1,
    'figureColumn': [],
    'xDataColumn': null,
    'description': '',
    'yScale': true,
    'yBoundaryGapBottom': 0.15,
    'yBoundaryGapTop': 0.15,
    'xInterval': false,
    'xDegree': -45,
    'showFigureDesc': true,
    'yAxisSetting': [{ name: '', ratio: false }], // y轴配置项
    'figureColumnSetting': {}, // 指标坐标轴配置项
    'figureSelected': [] // 指标默认选中
  },
  bar: {
    'type': 'bar',
    'title': null,
    'itemName': null,
    'showSelect': false,
    'dimension': [],
    'dimensionDefault': {},
    'moreTimeSelect': true,
    'timeType': 'months',
    'timeDefault': 1,
    'figureColumn': [],
    'xDataColumn': null,
    'rowCount': 10,
    'description': '',
    'yScale': true,
    'yBoundaryGapBottom': 0.15,
    'yBoundaryGapTop': 0.15,
    'xInterval': false,
    'xDegree': 0,
    'showFigureDesc': true,
    'yAxisSetting': [{ name: '', ratio: false }], // y轴配置项
    'figureColumnSetting': {}, // 指标坐标轴配置项
    'figureSelected': [] // 指标默认选中
  },
  dashboard: {
    'type': 'dashboard',
    'title': null,
    'itemName': null,
    'timeType': 'days',
    'timeDefault': 1,
    'description': '',
    'dataMode': 'row',
    'showCol': ['now', 'day', 'week', 'month'], // 日同比 周同比 月同比
    'dimCol': [], // 维度列
    'figureCol': null, // 指标列
    'itemsList': {}, // '成功购买商品数': { title: 'Feed阅读时长(s)', desc: '泛阅读用户所产生的阅读和浏览时长之和', figureType: 'int', figureFormula: '' },
    'showFigureDesc': true
  }
}

// 维度排序
export function sortDim(first, second) {
  const numHead = /^[0-9]+/
  const num = /^[0-9]+$/
  if (first === null) {
    return 1
  } else if (second === null) {
    return -1
  } else if ((first + '').indexOf('全部') !== -1) {
    return -1
  } else if ((second + '').indexOf('全部') !== -1) {
    return 1
  } else if (num.test(first + '') && num.test(second + '')) {
    return parseFloat(first) > parseFloat(second) ? -1 : 1
  } else if (numHead.test(first + '') && numHead.test(second + '')) {
    return first > second ? -1 : 1
  } else {
    return first > second ? 1 : -1
  }
}
