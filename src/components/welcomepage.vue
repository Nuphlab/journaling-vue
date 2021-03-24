<template>
  <v-app>
      <v-container fluid>
      <v-navigation-drawer
          mini-variant-width="100"
          permanent
          expand-on-hover
          height="400"
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="data:image/jpeg;base64,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"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="title">
                {{ name }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
            nav
            dense
        >
          <v-list-item @click="routejournals()" link>
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Journals</v-list-item-title>
          </v-list-item>

          <v-list-item @click="routefriends()" link>
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Friends</v-list-item-title>
          </v-list-item>

          <v-list-item link href="https://giphy.com/gifs/lgcUUCXgC8mEo/html5" target="_blank">
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Starred</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      </v-container>
  </v-app>
</template>

<script>
export default {
name: "welcomepage",
  data () {
    return {
      email: localStorage.email,
      name: ''
    }
  },
  methods: {
    routefriends() {
      this.$router.push('/friendslist')
    },
    routejournals() {
      console.log('running journals')
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>

</style>
