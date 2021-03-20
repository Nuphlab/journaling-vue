<template>
  <div id="app">
      <v-card>
        <v-card-text>
          Welcome Back {{name}}!!
        </v-card-text>
        <v-card-actions>
          <v-menu>
            Create Journal
            Make An Entry
            Manage Friends
          </v-menu>
        </v-card-actions>
      </v-card>
    <v-spacer></v-spacer>
  </div>
</template>

<script>
import axios from "axios";
let user = ""
export default {
name: "home",
  props: {
  user
  },
  data () {
    return {
      email: "",
      name: "",
    }
  },
  methods: {
    async getprofile() {
      const res = await axios.get(`http://192.168.50.63:8000/user_profile?email=eq.${localStorage.email}`)
      console.log(localStorage.email)
      let profile = res.data[0]
      console.log(profile)
      localStorage.name = profile.username
      this.name = localStorage.name
    }
  },
  async mounted() {
  await this.getprofile()
  }
}
</script>

<style scoped>

</style>
