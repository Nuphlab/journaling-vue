<template>
  <div id="app">
    <journals v-if="isMounted" @clickedJournal="onClickChild"></journals>
    <friendslist v-if="isMounted"></friendslist>
  </div>
</template>

<script>
import axios from "axios";
import journals from "@/components/journals";
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
    journals, friendslist
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
    },
    backbutton(value) {
      localStorage.component = 'journals'
      console.log(value)
      this.$emit('clicked', 'journals')
    },
    onClickChild(value) {
      console.log(value)
      this.$emit('clicked', 'journal_entries')
      // localStorage.journalid = value.journalid
    }
  },
  async beforeMount() {
    await this.getprofile()
    this.isMounted = true
  }
}
</script>

<style scoped>

</style>
