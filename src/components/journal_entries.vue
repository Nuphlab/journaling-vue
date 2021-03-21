<template>
<v-main>
  <v-btn @click="backbtn">Back</v-btn>
  <v-alert>Entries</v-alert>
  <v-data-table>
  </v-data-table>
</v-main>
</template>

<script>
import axios from "axios";

export default {
name: "journal_entries",
  data() {
    return {

    }
  },
  async mounted() {
    await this.GetJournalEntries()
  },
  methods: {
    backbtn(value){
      localStorage.component = 'journals'
      this.$emit('backbtn', 'journals')
      console.log(value)
    },
    async GetJournalEntries() {
      // FIXME: FIND OUT IF OUR SERVICES CAN SUPPORT INPUTTING USERID AND JOURNALID
      // let journalID = ""
      let journalEntries
      try {
        const res = await axios.get(`http://192.168.50.63:8000/journal_entry?journalid=eq.${localStorage.journalid}`)
        res.data
        journalEntries = res.data
        console.log(journalEntries)
      } catch(e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
