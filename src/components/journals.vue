<template>
  <v-app>
    <v-main>
    <v-alert>
      <h3>Your Journals</h3>
    </v-alert>

    <v-data-table
        v-model="selected"
        :headers="headers"
        :items="values"
        :search="search"
        item-key="name"
        class="elevation-1"
    >

      <!-- open journal entries -->
      <template v-slot:[`item.enter`]="{ item }">
        <v-dialog
            v-model="dialogUpdate"
            persistent
            max-width="600px"
            :retain-focus="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                depressed
                small
                class="mr-2"
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                @click="handleclick(item.journalid)"
            >Open</v-btn>
          </template>
        </v-dialog>
      </template>

      <!-- update -->
      <template v-slot:[`item.actions`]="{ item }">
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
                @click="item"
            >mdi-pencil</v-icon>
          </template>
          <v-card>

          </v-card>
        </v-dialog>

        <!-- delete -->
        <v-dialog
            v-model="dialogDelete"
            persistent
            max-width="600px"
            :retain-focus="false"
            @click:row="setJournalID"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                small
                class="mr-2"
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                @click.stop="setJournalID(item.journalid)"
            >mdi-delete</v-icon>
          </template>
          <v-card>
            <v-card-title>
              <h3 class="headline">Delete Journal</h3>
            </v-card-title>
            <v-card-text>
                <v-alert >
                  <h3>Are you sure you want to delete this Journal?</h3>
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
                  @click="deletejournal(); dialogDelete = false"
              >
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>


        <!-- add entry -->
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
            >mdi-plus</v-icon>
          </template>
          <v-card>

          </v-card>
        </v-dialog>

      </template>
    </v-data-table>

    <!-- create journal -->
    <v-dialog
        v-model="dialogCreateJournal"
        persistent
        max-width="600px"
        :retain-focus="false"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            small
            class="ma-2"
            color="brown"
            dark
            v-bind="attrs"
            v-on="on"
        >Create Journal</v-btn>
      </template>
      <v-card>
        <v-card-title class="ml-n3">Create Journal</v-card-title>
        <v-card-text>
          <v-text-field v-model="title" label="Title"></v-text-field>
          <v-textarea v-model="description" label="Description"></v-textarea>
          <v-card-actions>
            <v-spacer></v-spacer>
          <v-btn class="mr-2" color="red" @click="dialogCreateJournal = false">Cancel</v-btn>
          <v-btn color="primary" @click="createJournal(); dialogCreateJournal = false">Create</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
name: "journals",
  data() {
    return {
      dialogCreateJournal: false,
      dialogUpdate: false,
      dialogDelete: false,
      search: "",
      selected: false,
      singleselect: false,
      title: "",
      description: "",
      userid: localStorage.userid,
      token: localStorage.token,
      journalid: '',
      headers: [
        {text: '', value: 'enter'},
        {text: 'Journal ID', value: 'journalid'},
        {text: 'Title', value: 'title'},
        {text: 'Description', value: 'description'},
        {text: 'User ID', value: 'userid'},
        {
          text: 'Actions',
          align: 'start',
          sortable: false,
          value: 'actions',
        }
      ],
      values: []
    }
  },
  async mounted() {
    await this.GetJournals()
  },
  methods: {
    setJournalID(value) {
      console.log(value)
      this.journalid = value
    },
    async deletejournal() {
      const config = {
        headers: {'Authorization': 'Bearer ' + localStorage.token}
      }
      try {
        console.log(this.journalid)
        const res = await axios.delete(`http://192.168.50.63:8000/journal?journalid=eq.${this.journalid}`, config)
        console.log(res)
        // alert('Journal Successfully Submitted!')
      } catch (e) {
        console.log(e)
        alert('Error deleting. Please refresh the page or check connection.')
      }
      this.values = []
      await this.GetJournals()
    },
    handleclick(value) {
      localStorage.journalid = value
      console.log(value)
      this.$router.push('./journal_entries')
    },
    async createJournal() {
      const config = {
        headers: { Authorization: `Bearer ${this.token}` }
      }
      //console.log(config)
      let body = {
        title: this.title,
        description: this.description,
        userid: localStorage.userid
      }
      try {
        //console.log(body)
        const res = await axios.post('http://192.168.50.63:8000/journal', body, config)
        console.log(res)
        // alert('Journal Successfully Submitted!')
      } catch (e) {
        console.log(e)
      }
      this.title = ''
      this.description = ''
      this.values = []
      await this.GetJournals()
    },
    async GetJournals() {
      let journals
      try {
        const res = await axios.get('http://192.168.50.63:8000/journal')
        res.data
        journals = res.data
        console.log(journals)

        for (let journal in journals) {
          console.log(journals[journal].userid)
          if(localStorage.userid == journals[journal].userid) {
            let body = {
              journalid: journals[journal].journalid,
              title: journals[journal].title,
              description: journals[journal].description,
              userid: journals[journal].userid,
            }
            this.values.push(body)
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
