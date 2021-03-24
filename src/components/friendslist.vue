<template>
  <v-app>
  <v-main>
    <v-btn class="ml-1" depressed color="grey darken-2" @click="backbtn">Home</v-btn>
  <v-alert>Friends List</v-alert>
  <v-data-table
      :headers="headers"
      :items="values"
  >
    <template v-slot:[`item.actions`]="{ item }">
    <!-- delete -->
      <v-dialog
          v-model="dialogDeleteFriend"
          persistent
          max-width="600px"
          :retain-focus="false"
          :item="item"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
              small
              class="mr-2"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              @click="setFriendID(item.email)"
          >mdi-delete</v-icon>
        </template>
        <v-card>
          <v-card-title>
            <h3 class="headline">Delete Friend</h3>
          </v-card-title>
          <v-card-text>
            <v-alert >
              <h3>Are you sure you want to delete this Friend?</h3>
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                dense
                color="primary"
                text
                @click="dialogDeleteFriend = false"
            >
              Cancel
            </v-btn>
            <v-btn
                color="error"
                text
                @click="deleteFriend(); dialogDeleteFriend = false"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-data-table>

  <!-- add friend -->
    <ValidationObserver ref="observer" v-slot="{ valid }">
  <v-dialog
      v-model="dialogAddFriend"
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
      >Add Friend</v-btn>
    </template>
    <v-card>
      <v-card-title class="mb-4">
        <h4>Add Entry</h4>
      </v-card-title>
      <v-card-text  class="pb-0">

        <ValidationProvider
            name="addFriendID"
            ref="addFriendID"
            rules="required"
            v-slot="{ errors }"
            :bails="false"
        >

        <v-text-field
            :rules="['Required']"
            label="Friend ID"
            v-model="addFriendID"
        >
        </v-text-field>
          <ul style="color:red" class="overline text-left">
            <li v-for="(error, index) in errors" :key="index">
              <span>{{ error }}</span>
            </li>
          </ul>
        </ValidationProvider>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            class="mb-2"
            color="warning"
            text
            @click="dialogAddFriend = false"
        >
          Cancel
        </v-btn>
        <v-btn
            class="mb-2"
            color="primary"
            text
            :disabled="!valid"
            @click="addFriend(valid)"
        >
          Request
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
    </ValidationObserver>
  </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import {ValidationProvider, extend} from "vee-validate/dist/vee-validate.full";
import { ValidationObserver } from "vee-validate/dist/vee-validate.full";

extend("required", {
  message: () => "You must enter a friend ID"
});

export default {
  name: "friendslist",
  components: {
    ValidationProvider, ValidationObserver
  },
  data() {
    return {
      friendEmail: "",
      deleteFriendID: "",
      addFriendID: "",
      dialogAddFriend: false,
      dialogDeleteFriend: false,
      userID: "",
      friendArray: [],
      friends: [],
      headers: [
        {
          text: 'User Name',
          align: 'start',
          sortable: false,
          value: 'username',
        },
        {text: 'Email', value: 'email'},
        {text: 'Actions', value: 'actions'}
      ],
      values: []
    }
  },
  async mounted() {
    this.userID = localStorage.userid
    await this.GetFriendsList()
  },
  methods: {
    async setFriendID(email) {
      this.friendEmail = email
      console.log(email)
      console.log(this.friendEmail)
      try{
        console.log(this.friendEmail)
        const res = await axios.get(`http://192.168.50.63:8000/user_profile?email=eq.${this.friendEmail}`)
        console.log(res)
        this.deleteFriendID = res.data[0].userid
      } catch(e) {
        alert(e)
      }
    },
    async sendInvite() {
      this.$validator.validate().then(valid=> {
        if (valid) {
          alert('Request sent to friend!')
        }
      })
    },
    backbtn(){
      this.$router.push('/welcomepage')
    },
    async addFriend(valid) {
      if(valid) {
        this.dialogAddFriend = false
        alert('Request was sent to friend!')
      }
    },
    async deleteFriend() {
      const config = {
        headers: {'Authorization': 'Bearer ' + localStorage.token}
      }
      try {
        console.log(this.deleteFriendID)
        const res = await axios.delete(`http://192.168.50.63:8000/isfriends?isfriendsuserid_2=eq.${this.deleteFriendID}`, config)
        console.log(res)

        this.values = []
        await this.GetFriendsList()

      } catch (e) {
        console.log(e)
      }
      alert("Friend Deleted")
    },
    async GetFriendsList() {
      try {
        this.values = []
        console.log('localstorage userid:' + localStorage.userid)
        const res = await axios.get(`http://192.168.50.63:8000/isfriends?userid_1=eq.${localStorage.userid}`)
        this.friends = res.data

        await this.GetFriendsProfiles()
/*
        for (let friend in this.friends) {
          let body = {
            username: this.friends[friend].username,
            email: this.friends[friend].email,
          }
          console.log(body)
          // this.values.push(body)
        }

 */
      } catch (e) {
        console.log(e)
      }
    },
    async GetFriendsProfiles() {
      console.log('entered get profiles')
      this.friendArray = []
      this.values = []

      for(let i = 0; i < this.friends.length; ++i) {
        let friendId = this.friends[i].isfriendsuserid_2
        console.log('friendid:' + friendId)
        try {
          const friendObject = await axios.get(`http://192.168.50.63:8000/user_profile?userid=eq.${friendId}`)
          this.friendArray.push(friendObject.data[0])
          console.log(friendObject)
          this.values = this.friendArray
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
