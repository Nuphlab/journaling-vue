<template>
  <v-data-table
      v-model="selected"
      :headers="headers"
      :items="values"
      :single-select="singleSelect"
      item-key="name"
      show-select
      class="elevation-1"
  >
    <template v-slot:top>
      <v-switch
          v-model="singleSelect"
          label="Single select"
          class="pa-3"
      ></v-switch>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    GetUsers
  },
  data () {
    return {
      userData: '',
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: 'userid',
          align: 'start',
          sortable: false,
          value: 'userid',
        },
        {text: 'fname', value: 'fname'},
        {text: 'lname', value: 'lname'},
        {text: 'email', value: 'email'},
        {text: 'lastlogin', value: 'lastlogin'},
        {text: 'isadmin', value: 'isadmin'}
      ],
      values: []
    }
  },
  mounted () {
    GetUsers()
    this.values = values
  }
}

let userData
let values = []
let body
async function GetUsers() {
  const res = await axios.get('http://192.168.50.63:8000/user_profile')
  res.data
  userData = res.data
  console.log(userData)

  for (let user in userData) {
     body = {
      username: userData[user].username,
      userid: userData[user].userid,
      fname: userData[user].fname,
      lname: userData[user].lname,
      email: userData[user].email,
      lastlogin: userData[user].lastlogin,
      isadmin: userData[user].isadmin
    }
    values.push(body)
  }
}
</script>

<style scoped>

</style>
