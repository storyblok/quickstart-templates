var renderBlocks = null
var components = {}

// Get the JSON of "home" from Storyblok
var request = new XMLHttpRequest()
request.open('GET', 'https://api.storyblok.com/v1/cdn/stories/home?version=draft&token=jdS0oLvdm3Hoj8OILqOcRQtt', true)
request.onload = function() {
  var data = JSON.parse(request.responseText)
  renderBlocks(data)
}
request.send()

// Simple rendering engine
renderBlocks = function(data) {
  var blok = data.story.content
  document.body.insertAdjacentHTML('beforeend', components[blok.component](blok))

  // Enter editmode after rendering
  window.storyblok.tryEditmode()
}

components = {
  page(blok) {
    return blok.body.map((column) => { return components[column.component](column) }).join('')
  },
  teaser(blok) {
    return `${blok._editable}
      <div class="teaser">${blok.headline}</div>`
  },
  grid(blok) {
    return `${blok._editable}
      <div class="grid">
        ${blok.columns.map((column) => { return components[column.component](column) }).join('')}
      </div>`
  },
  feature(blok) {
    return `${blok._editable}
      <div class="column feature">
        ${blok.name}
      </div>`
  }
}