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
    <journals v-if="isMounted"></journals>
    <journal_entries v-if="isMounted"></journal_entries>
    <friendslist v-if="isMounted"></friendslist>
  </div>
</template>

<script>
import axios from "axios";
import journals from "@/components/journals";
import journal_entries from "@/components/journal_entries";
import friendslist from "@/components/friendslist";

export default {
name: "home",
  data () {
    return {
      email: "",
      name: "",
      isMounted: false
    }
  },
  components: {
    journals, journal_entries, friendslist
  },
  methods: {
    async getprofile() {
      const res = await axios.get(`http://192.168.50.63:8000/user_profile?email=eq.${localStorage.email}`)
      let profile = res.data[0]
      // console.log(profile)
      localStorage.name = profile.username
      localStorage.userid = profile.userid
      this.name = localStorage.name
      console.log(localStorage.userid)
    }
  },
  async mounted() {
    await this.getprofile()
    this.isMounted = true
  }
}
</script>

<style scoped>

</style>
