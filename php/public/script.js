Vue.component('teaser', {
  template: `<div v-editable="blok" class="teaser">{{ blok.headline }}</div>`,
  props: ['blok']
})

Vue.component('grid', {
  template: `<div v-editable="blok" class="grid"><component :key="blok._uid" v-for="blok in blok.columns" :blok="blok" :is="blok.component"></component></div>`,
  props: ['blok']
})

Vue.component('feature', {
  template: `<div v-editable="blok" class="column feature">{{ blok.name }}</div>`,
  props: ['blok']
})

new Vue({
  el: '#app',
  template: `<div><component :key="blok._uid" v-for="blok in story.content.body" :blok="blok" :is="blok.component"></component></div>`,
  data() {
    return {
      story: {
        content: {
          body: []
        }
      }
    }
  },
  created: function() {
    this.$storyblok.init({
      accessToken: 'jdS0oLvdm3Hoj8OILqOcRQtt',
      endPoint: 'localhost:3400',
      customParent: 'http://localhost:3400'
    })
    
    this.$storyblok.on('change', this.loadStory)
    this.$storyblok.on('published', this.loadStory)

    this.$storyblok.pingEditor(() => {
      this.loadStory(this.$storyblok.inEditor ? 'draft' : 'published')
    })
  },
  methods: {
    loadStory(version) {
      this.$storyblok.get({
        slug: 'home',
        version: version
      }, (data) => {
        this.story = {
          content: {
            body: []
          }
        }
        this.$nextTick(() => {
          this.story = data.story
        })
      })
    }
  }
})
