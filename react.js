import ReactDOM from 'react-dom'
import { addons } from '@storybook/preview-api'
import { FORCE_RE_RENDER } from '@storybook/core-events'

import { setCurrentStory, changeKnob } from './common'

function clearCurrentStory() {
  var rootEl = document.querySelector('#storybook-root')
  if (!rootEl) return
  // React 18 renders via createRoot; unmountComponentAtNode is the React 17 legacy API
  // and silently fails on createRoot-managed nodes. In React 18, Storybook handles
  // story teardown internally when SET_CURRENT_STORY fires, so we skip manual unmount.
  if (typeof ReactDOM.createRoot !== 'function') {
    ReactDOM.unmountComponentAtNode(rootEl)
  }
}

window.__setCurrentStory = function(categorization, story) {
  clearCurrentStory()
  setCurrentStory(categorization, story)
  forceReRender()
}

window.__changeKnob = function(changedKnob) {
  changeKnob(changedKnob)

  // force story to rerender with updated knob
  forceReRender()
}

function forceReRender() {
  addons.getChannel().emit(FORCE_RE_RENDER)
}
