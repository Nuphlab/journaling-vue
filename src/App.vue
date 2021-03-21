<template>
  <div id="app">
    <v-app>
      <v-app-bar
          absolute
          app
          color="primary"
          dark
      >
        <div class="d-flex align-center">
          <v-img
              alt="Journaling Logo"
              class="shrink mr-2"
              contain
              :src="require('@/static/journal-icon.png')"
              transition="scale-transition"
              width="40"
          />

          <h1 class="mt-2">Journaling</h1>
        </div>
        <v-spacer></v-spacer>

        <v-btn :key="this.loggedin" v-if="!this.loggedin" to="/login" text>
          Login
        </v-btn>

        <v-btn :key="this.loggedin" v-if="!this.loggedin" to="/register" text>
          Register
        </v-btn>

        <v-btn :key="this.loggedin" @click="logout" v-if="this.loggedin">Logout</v-btn>
      </v-app-bar>
    <v-main>
      <router-view @rerender="rerender"></router-view>
      <!--
      <component v-bind:is="component" @clicked="onClickChild"></component>
      -->
    </v-main>
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    loggedin: Boolean
  }),
  async mounted() {
    this.loggedin = localStorage.loggedin
  },
  watch: {
    loggedin: function () {
      this.loggedin = localStorage.loggedin
    }
  },
  methods: {
    onClickChild(value) {
      console.log(value)
      this.component = value
    },
    logout() {
      this.loggedin = false
      this.$router.push('/landingpage')
      localStorage.clear()
    },
    rerender() {
      console.log('ran rerender')
      this.loggedin = true
    }
  }
};

</script>
