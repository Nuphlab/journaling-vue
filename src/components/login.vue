<template>
  <div id="app">
    <v-container>
      <v-card class="align-center">
        <v-card-title>
          Welcome To The Journaling App!
        </v-card-title>
        <v-card-text>
          Login To Start Sharing Your Day
        </v-card-text>
      </v-card>
    </v-container>

    <v-container>
      <v-card class="pa-2">
      <h1>Login</h1>
    <v-form>
      <v-text-field
          class="register"
          label="Email"
          v-model="email"
          append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      ></v-text-field>
      <v-text-field
          type="password"
          class="loginPass"
          label="password"
          v-model="password"
          append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      ></v-text-field>
    </v-form>
      <v-btn color="brown" @click="login">Login</v-btn>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
name: "login",
  data () {
    return {
      passwordsMatch: false,
      show: false,
      email: "",
      password: "",
      show1: false,
    }
  },
  async mounted() {
    // this.email = localStorage.email
  },
  methods: {
    async login() {
      try {
        let data = {
          username: this.username,
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password,
        }
        console.log(data)
        const res = await axios.post('http://192.168.50.63:8000/rpc/login', data, {'Content-Type': "application/json"})
        let token = res.data[0].token
        localStorage.token = token
        localStorage.loggedin = true
        localStorage.email = this.email
        if (res.status) {
          console.log(res.status)
          this.$emit('rerender')
          this.$router.push('./home')
        }
      }catch (e){
        alert('Password/Username is incorrect!')
      }
    }
  }
}
</script>

<style scoped>
.password {
  margin-left: 0;
  max-width: 75%;
}
.loginPass {
  max-width: 75%;
}
.register {
  max-width: 75%;
}

</style>
