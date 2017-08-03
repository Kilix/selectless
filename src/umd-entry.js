import selectlessStar from './'
import * as selectlessComponent from './components/'

const selectless = selectlessStar

Object.assign(
  selectless,
  Object.keys(selectlessStar).reduce((e, prop) => {
    if (prop !== 'default') {
      // eslint-disable-next-line import/namespace
      e[prop] = selectlessStar[prop]
    }
    return e
  }, {}),
)

export default selectless
