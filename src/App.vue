<template>
  <v-app>
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>News App</v-toolbar-title>
    </v-app-bar>
    <!--The Side Menu component goes here -->
    <SideMenu
      :drawer="drawer"
      :api_key="api_key"
      @selectsource="setResource"
    />
    <v-content>
       <v-container
        fluid
        fill-height
      >
      <!--The Main Content component goes here-->
        <MainContent
          :articles="articles"
        />
      </v-container>
    </v-content>
    <!-- FOOTER -->
    <v-footer
      color="indigo"
      app
    >
    <span class="white--text ml-3">Made with
      <v-icon class="red--text">mdi-heart</v-icon>
      &copy; 2020
    </span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios'
import MainContent from './components/MainContent.vue'
import SideMenu from './components/SideMenu.vue'

export default {
  components: {
    MainContent,
    SideMenu
  },
  data () {
    return {
      drawer: false,
      api_key: process.env.VUE_APP_NEWS_API_KEY,
      articles: [],
      errors: []
    }
  },
  created () {
    axios.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' + this.api_key)
      .then(response => {
        this.articles = response.data.articles
        // console.log(response.data.articles) // This will give you access to the full object
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    setResource (source) {
      axios.get('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=' + this.api_key)
        .then(response => {
          this.articles = response.data.articles
          // console.log(response.data)
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
