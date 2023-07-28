import ReactDOM from 'react-dom'

import { forceReRender } from '@storybook/react'

import { setCurrentStory } from './common'

function clearCurrentStory() {
  var root = document.querySelector('#storybook-root')
  if (root) {
    ReactDOM.unmountComponentAtNode(root)
  }
}

window.__setCurrentStory = function (categorization, story) {
  clearCurrentStory()
  setCurrentStory(categorization, story)
  forceReRender()
}
