Vue.component('page', {
  template: `<component :key="blok._uid" v-for="blok in story.content.body" :blok="blok" :is="blok.component"></component>`,
  props: ['blok']
})

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
  template: `<div><component :blok="story.content" :is="story.content.component"></component></div>`,
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
    this.$storyblok.on('change', () => { this.loadStory('draft') })
    this.$storyblok.on('published', () => { this.loadStory('draft') })

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
