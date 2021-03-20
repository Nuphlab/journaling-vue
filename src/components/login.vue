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
      ></v-text-field>
      <v-text-field
          class="loginPass"
          label="password"
          v-model="password"
      ></v-text-field>
    </v-form>
      <v-btn color="brown" @click="login()">Login</v-btn>
      </v-card>
    </v-container>


    <v-container>
      <v-card class="pa-2">
      <v-row>
        <v-col align-self="align-left">
      <h1 class="mt-3">Register</h1>
      <v-form>
        <v-text-field
            class="register"
            label="Username"
            v-model="registerUsername"
        ></v-text-field>
        <v-text-field
            class="register"
            label="Email"
            v-model="registerEmail"
        ></v-text-field>
        <v-text-field
            class="register"
            label="First Name"
            v-model="registerfirstName"
        ></v-text-field>
        <v-text-field
            class="register"
            label="Last Name"
            v-model="registerlastName"
        ></v-text-field>
        </v-form>
        <password
            class="password"
            v-model="registerPassword"
            :toggle="true"
            @score="showScore"
            @feedback="showFeedback"
        >
        </password>
        <password
            class="password"
            v-model="confirmPassword">
        </password>
      <v-btn @click="register()" color="red">Register</v-btn>
        </v-col>
      </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
// import VuePassword from 'vue-password';
import Password from 'vue-password-strength-meter'

export default {
name: "login",
  data () {
  return {
    email: "",
    password: "",
    registerEmail: "",
    registerPassword: "",
    confirmPassword: "",
    registerUsername: "",
    registerfirstName: "",
    registerlastName: "",
  }
  },
  async mounted() {
    // this.email = localStorage.email
  },
  components: {
    Password
  },
  methods: {
    async login() {
      try {
        let data = {
          email: this.email,
          password: this.password
        }
        console.log(data)
        const res = await axios.post('http://192.168.50.63:8000/rpc/login', data, {'Content-Type': "application/json"})
        let token = res.data[0].token
         // console.log(res)
         console.log(token)
        if (res.status) {
          console.log(res.status)
          this.$emit('clicked', 'home')
        }
        localStorage.loggedin = true
        localStorage.email = this.email
        // localStorage.setItem()
      }catch (e){
        console.log(e)
      }
    },
    async register() {
      if(this.registerPassword === this.confirmPassword){
        try {
          const res = await axios.post('http://192.168.50.63:8000/user_profile')
          console.log(res)
        }catch (e){
          console.log(e)
        }
      }
      else {
        alert('Passwords do not match! Please Re-enter.')
      }
    },
    showFeedback ({suggestions, warning}) {
      console.log('🙏', suggestions)
      console.log('⚠', warning)
    },
    showScore (score) {
      console.log('💯', score)
    }
  }
}

/*
async mounted() {
    this.email(localstorage.email)
  },
watch: {
    email(email) {
      localStorage.email = email
    }
  },

Login
POST http://192.168.50.63:8000/rpc/login
{
	"email": "test@test.com",
	"password": "test"
}

Create User
POST http://192.168.50.63:8000/newuser
[
  {
    "email": "pedro@gmail.com",
    "fname": "pedro",
    "lname": "pascal",
    "lastlogin": "2020-6-12",
    "isadmin": "0",
    "username": "mando",
		"passwordhash": "asdfasdf"
  }
]

Signup user
POST http://192.168.50.63:8000/rpc/signup
{
	"email": "test@test.com",
	"password": "test",
	"name": "Test User"
}
*/
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
