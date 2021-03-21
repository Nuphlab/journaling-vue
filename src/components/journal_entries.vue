<template>
<v-main>
  <v-btn @click="backbtn">Back</v-btn>
  <v-alert>Entries</v-alert>

  <v-data-table
      v-model="selected"
      :headers="headers"
      :items="values"
      :search="search"
      item-key="name"
      class="elevation-1"
      select-all
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editTutorial(item.id)">mdi-pencil</v-icon>
      <v-icon small @click="deleteTutorial(item.id)">mdi-delete</v-icon>
    </template>
  </v-data-table>

</v-main>
</template>

<script>
import axios from "axios";

export default {
name: "journal_entries",
  data() {
    return {
      headers: [

        {text: 'Entry', value: 'bodytext'},
        {text: 'Date Created', value: 'datecreated'},
        {text: 'Entry ID', value: 'entryid'},
        {text: 'Journal ID', value: 'journalid'},
        {text: 'Location', value: 'location'},
        {
          text: 'Actions',
          align: 'start',
          sortable: false,
          value: 'actions',
        }
      ],
      values: [],
      selected: false,
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
        console.log(localStorage.journalid)
        const res = await axios.get(`http://192.168.50.63:8000/entry?journalid=eq.${localStorage.journalid}`)
        res.data
        journalEntries = res.data
        console.log(journalEntries)

        for(let entry in journalEntries) {
          let body = {}
          body = {
            bodytext: journalEntries[entry].bodytext,
            datecreated: journalEntries[entry].datecreated,
            entryid: journalEntries[entry].entryid,
            journalid: journalEntries[entry].journalid,
            location: journalEntries[entry].location
          }
            this.values.push(body)
        }
      } catch(e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
