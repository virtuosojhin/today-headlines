import dayjs from 'dayjs'

// 记载中文语言包，配置成中文
import 'dayjs.local.zh,cn'

// dayjs默认语言是英文，配置成中文
dayjs.locale('zh-cn')

// 获取当前最新时间
console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))
