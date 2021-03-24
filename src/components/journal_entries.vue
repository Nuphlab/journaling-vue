<template>
  <v-app>
<v-main>
  <v-btn class="ml-1" depressed color="grey darken-2" @click="backbtn">Back to Journals</v-btn>
  <v-alert>
    <h3>Your Entries</h3>
  </v-alert>

  <v-data-table
      v-model="selected"
      :headers="headers"
      :items="values"
      class="elevation-1"
      @click:row="rowInfo"
  >
    <template v-slot:[`item.bodytext`]="{ item }">
      <v-dialog
          v-model="dialogEntry"
          persistent
          max-width="600px"
          :retain-focus="false"
          @click="item"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              small
              class="mr-2"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
          >Open</v-btn>
        </template>
        <v-card>
          <v-card-title class="mb-4">
            <h4>Entry</h4>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-textarea readonly outlined v-model="item.bodytext">
            </v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                class="mb-2"
                color="warning"
                text
                @click="dialogEntry = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <template v-slot:[`item.actions`]="{ item }">

      <!--update-->
      <v-dialog
          v-model="dialogUpdate"
          persistent
          max-width="600px"
          :retain-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
              small
              class="mr-2"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              @click.stop="rowInfo(item.entryid); journalEntry = item.bodytext"
          >mdi-pencil</v-icon>
        </template>
        <v-card>
          <v-card-title class="mb-4">
            <h4>Update Entry</h4>
          </v-card-title>
            <v-card-text class="pb-0">
              <v-textarea outlined v-model="journalEntry">
              </v-textarea>
            </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                class="mb-2"
                color="warning"
                text
                @click="dialogUpdate = false"
            >
              Cancel
            </v-btn>
            <v-btn
                class="mb-2"
                color="primary"
                text
                @click="updateEntry(); dialogUpdate = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!--delete-->
      <v-dialog
          v-model="dialogDelete"
          persistent
          max-width="600px"
          :retain-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
              small
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              @click.stop="rowInfo(item.entryid)"
          >mdi-delete</v-icon>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Delete Entry</span>
          </v-card-title>
          <v-card-text>
              <v-alert >
                <h3>Are you sure you want to delete this entry?</h3>
              </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                dense
                color="primary"
                text
                @click="dialogDelete = false"
            >
              Cancel
            </v-btn>
            <v-btn
                color="error"
                text
                @click="deleteEntry(); dialogDelete = false"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


    </template>
  </v-data-table>




  </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
name: "journal_entries",
  data() {
    return {
      dialogEntry: false,
      dialogUpdate: false,
      dialogDelete: false,
      entryid: '',
      journalEntry: '',
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
    async updateEntry() {
      const config = {
        headers: {'Authorization': 'Bearer ' + localStorage.token}
      }

      const body = {
        bodytext: this.journalEntry
      }

      try {
        const res = await axios.patch(`http://192.168.50.63:8000/entry?entryid=eq.${this.entryid}`, body, config)
        console.log(res)
        res.data
        this.journalEntry = ''
      } catch (e) {
        console.log(e)
      }
      // alert('Successfully Deleted')
      this.values = []
      await this.GetJournalEntries()
    },
    async deleteEntry() {
     const config = {
       headers: {'Authorization': 'Bearer ' + localStorage.token}
     }

      try {
        const res = await axios.delete(`http://192.168.50.63:8000/entry?entryid=eq.${this.entryid}`, config)
        console.log(res)
        res.data
        this.entryid = ''
      } catch (e) {
        console.log(e)
      }
      // alert('Successfully Deleted')
      this.values = []
      await this.GetJournalEntries()
    },
    rowInfo(value) {
      console.log('entered row info')
      this.entryid = value
      console.log(value)
    },
    backbtn(){
      this.$router.push('/journals')
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
