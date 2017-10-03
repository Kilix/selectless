import SyncSelect from './sync'
import AsyncSelect from './async'
import controller from './controller'
import {withKeyboardEvent, withOverlay} from './utils'

import Item from './components/item'
import Label from './components/label'
import List from './components/list'
import Search from './components/search'
import Clear from './components/clear'
import TagList from './components/tagList'
import Tag from './components/tag'

const Select = SyncSelect
Select.Async = AsyncSelect
Select.default = Select

export {
  Select,
  controller,
  Item,
  Label,
  List,
  Search,
  Clear,
  TagList,
  Tag,
  withKeyboardEvent,
  withOverlay,
}

export default {
  Select,
  controller,
  Item,
  Label,
  List,
  Search,
  Clear,
  TagList,
  Tag,
  withKeyboardEvent,
  withOverlay,
}
