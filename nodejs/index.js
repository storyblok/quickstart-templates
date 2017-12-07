const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const url = require('url')
const StoryblokClient = require('storyblok-node-client')

let Storyblok = new StoryblokClient({
  privateToken: 'MY_TOKEN'
})

app.use('/public', express.static('public'))

app.get('/*', function(req, res) {
  var path = url.parse(req.url).pathname
  path = path == '/' ? 'home' : path

  Storyblok
    .get(`stories/${path}`, {
      version: req.query._storyblok ? 'draft': 'published'
    })
    .then((response) => {
      res.render('index', {
        story: response.body.story,
        params: req.query
      })
    })
    .catch((error) => {
      console.log(error)
      res.send('A ' + error.statusCode.toString() + ' error ocurred')
    })
})

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: 'views/components/'
}))

app.set('view engine', '.hbs')
app.set('views', 'views')

app.listen(process.env.PORT || 8080, function() {
  console.log('Example app listening on port 8080!')
})