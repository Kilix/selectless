import Select from './sync'
import AsyncSelect from './async'
import controller from './controller'
import {withKeyboardEvent} from './utils'

import Item from './components/item'
import Label from './components/label'
import List from './components/list'
import Search from './components/search'
import Clear from './components/clear'
import TagList from './components/tagList'
import Tag from './components/tag'

Select.Async = AsyncSelect

export {Select, controller, Item, Label, List, Search, Clear, TagList, Tag, withKeyboardEvent}

export default Select
