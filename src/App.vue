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
        <v-btn @click="login">Login</v-btn>
      </v-app-bar>
    <v-content>
      <component v-bind:is="component"></component>
      <v-container v-if="!loggedIn">
      <v-card class="align-center">
        <v-card-title>
          Welcome To The Journaling App!
        </v-card-title>
        <v-card-text>
          Login To Start Sharing Your Day
        </v-card-text>
      </v-card>
      </v-container>
    </v-content>
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
    loggedIn: false
  }),
  methods: {
    login() {
      this.component = "home"
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
