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
        <v-btn @click="logout">Logout</v-btn>
      </v-app-bar>
    <v-main>
      <component v-bind:is="component" @clicked="onClickChild"></component>
    </v-main>
    </v-app>
  </div>
</template>

<script>
import users from "./components/users";
import login from "./components/login";
import home from "@/components/home";
export default {
  name: 'App',
  components: {users, login, home},
  data: () => ({
    component: "login",
    loggedIn: localStorage.loggedin || false
  }),
  mounted() {
    if (localStorage.loggedin) {
      this.component = "home"
    }
  },
  methods: {
    onClickChild(value) {
      console.log(value)
      this.component = value
    },
    logout() {
      this.component = "login"
      localStorage.clear()
    },
    toggle() {
      if (this.component === login) {
        this.component = users;
      } else {
        this.component = login;
      }
    }
  }
};

</script>
