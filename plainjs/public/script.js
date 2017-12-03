var components = {}
components = {
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

// Simple rendering engine
var renderBlocks = function(data) {
  data.story.content.body.forEach((blok) => {
    document.body.insertAdjacentHTML('beforeend', components[blok.component](blok))
  })
}

// Get the JSON of "home" from Storyblok
var request = new XMLHttpRequest()
request.open('GET', 'http://localhost:3001/v1/cdn/stories/home?version=draft&token=rQwr7Gf2LiZv2HDmyRuNrwtt', true)
request.onload = function() {
  var data = JSON.parse(request.responseText)
  renderBlocks(data)
}
request.send()