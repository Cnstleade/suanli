import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

export const messages = {
  zh: {
    message: {
      hello: '好好学习，天天向上！',
      ...zhLocale
    }
  },
  en: {
    message: {
      hello: 'good good study, day day up!',
      ...enLocale
    }
  }
}
