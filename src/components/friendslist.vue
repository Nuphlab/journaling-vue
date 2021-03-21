<template>
<v-main>
  <v-alert>Friends List</v-alert>
  <v-data-table
      :headers="headers"
      :items="values"
  ></v-data-table>
</v-main>
</template>

<script>
import axios from "axios";

export default {
  name: "friendslist",
  data() {
    return {
      friendArray: [],
      friends: [],
      headers: [
        {
          text: 'User Name',
          align: 'start',
          sortable: false,
          value: 'username',
        },
        {text: 'email', value: 'email'},
      ],
      values: []
    }
  },
  async mounted() {
    await this.GetFriendsList()
  },
  methods: {
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
