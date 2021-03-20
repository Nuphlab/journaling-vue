<template>
<v-main>
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
  methods: {
    async GetJournalEntries() {
      // FIXME: FIND OUT IF OUR SERVICES CAN SUPPORT INPUTTING USERID AND JOURNALID
      let journalID = ""
      let journalEntries
      try {
        const res = await axios.get(`http://192.168.50.63:8000/journal_entry?journalid=eq.${journalID}`)
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
