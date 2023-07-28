/// <reference types="cypress" />

Cypress.Commands.add('visitStorybook', (options) => {
  return cy.visit('iframe.html', options)
})

Cypress.Commands.add('loadStory', (categorization, story) => {
  const log = Cypress.log({
    name: 'Load',
    message: [categorization, story],
    $el: Cypress.$('#storybook-root'),
  })
  log.snapshot('before')

  const win = cy.state('window')
  const now = performance.now()
  win.__setCurrentStory(
    categorization.replace(/[|/]/g, '-').toLowerCase(),
    story
      .replace(/\s/g, '-')
      .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
      .toLowerCase()
  )
  log.set('consoleProps', () => ({
    categorization,
    story,
    renderTime: performance.now() - now,
  }))
  log.snapshot('after')
  log.end()

  cy.get('.sb-preparing-docs').then((elem) => {
    const elemHtml = elem.get(0)
    elemHtml.remove()
  })
  cy.get('.sb-preparing-story').then((elem) => {
    const elemHtml = elem.get(0)
    elemHtml.remove()
  })

  return undefined
  // return Cypress.$('#storybook-root')
})

Cypress.Commands.add('changeKnob', (name, value) => {
  const log = Cypress.log({
    name: 'Knob',
    message: [name, value],
    $el: Cypress.$('#storybook-root'),
  })

  log.snapshot('before')

  const win = cy.state('window')
  const now = performance.now()

  win.__changeKnob({ name, value })

  log.set('consoleProps', () => ({
    name,
    value,
    time: performance.now() - now,
  }))

  log.snapshot('after')
  log.end()

  return null
})

Cypress.Commands.add('changeArg', (name, value) => {
  const log = Cypress.log({
    name: 'Arg',
    message: [name, value],
    $el: Cypress.$('#storybook-root'),
  })

  log.snapshot('before')

  const win = cy.state('window')
  const now = performance.now()

  const obj = { [name]: value }
  win.__changeArg(obj)

  log.set('consoleProps', () => ({
    name,
    value,
    time: performance.now() - now,
  }))

  log.snapshot('after')
  log.end()

  return null
})

Cypress.Commands.add('storyAction', (name) => {
  const win = cy.state('window')

  return win.__actions[name] || cy.spy()
})
