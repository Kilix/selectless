import {configure} from '@storybook/react'
import {setOptions} from '@storybook/addon-options'

setOptions({
  name: 'React Selectliss',
  url: 'https://github.com',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true,
  sortStoriesByKind: false,
})

function loadStories() {
  require('../stories/simple.js')
  require('../stories/multi.js')
  require('../stories/search.js')
}

configure(loadStories, module)
