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
      <v-btn color="brown" @click="login()">Login</v-btn>
      </v-card>
    </v-container>

<!-- Register Component -->
    <v-container>
      <v-card class="pa-2">
      <v-row>
        <v-col>
      <h1 class="mt-3">Register</h1>
          <validation-observer
              ref="observer"
              v-slot="{ invalid }"
          >
            <form @submit.prevent="submit">
              <validation-provider
                  v-slot="{ errors }"
                  name="Username"
                  rules="required|max:30"
              >
                <v-text-field
                    v-model="registerUsername"
                    :counter="30"
                    :error-messages="errors"
                    label="Username"
                    required
                ></v-text-field>
              </validation-provider>

              <validation-provider
                  v-slot="{ errors }"
                  name="Email"
                  rules="required|email"
              >
                <v-text-field
                    v-model="registerEmail"
                    :error-messages="errors"
                    label="Email"
                    required
                ></v-text-field>
              </validation-provider>
<!--
              <validation-provider
                  v-slot="{ errors }"
                  name="First Name"
                  rules="required|max:30"
              >
                <v-text-field
                    v-model="registerfirstName"
                    :counter="30"
                    :error-messages="errors"
                    label="First Name"
                    required
                ></v-text-field>
              </validation-provider>

              <validation-provider
                  v-slot="{ errors }"
                  name="Last Name"
                  rules="required|max:15"
              >
                <v-text-field
                    v-model="registerlastName"
                    :counter="30"
                    :error-messages="errors"
                    label="Last Name"
                    required
                ></v-text-field>
              </validation-provider>
              -->

              <passwordchecker @check="setPass2" @pass1="setPass1" :register-password="registerPassword" v-model="registerPassword"></passwordchecker>

              <v-btn
                  class="mr-4"
                  type="submit"
                  :disabled="invalid"
                  @click="register"
                  color="brown"
              >
                submit
              </v-btn>
              <v-btn @click="clear">
                clear
              </v-btn>
            </form>
          </validation-observer>

        </v-col>
      </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import passwordchecker from '@/components/passwordchecker'
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('digits', {
  ...digits,
  message: '{_field_} needs to be {length} digits. ({_value_})',
})

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
})

extend('regex', {
  ...regex,
  message: '{_field_} {_value_} does not match {regex}',
})

extend('email', {
  ...email,
  message: 'Email must be valid',
})

export default {
name: "login",
  data () {
  return {
    passwordsMatch: false,
    show: false,
    email: "",
    password: "",
    registerEmail: "",
    registerPassword: "",
    confirmPassword: "",
    registerUsername: "",
    registerfirstName: "",
    registerlastName: "",
    show1: false,
  }
  },
  async mounted() {
    // this.email = localStorage.email
  },
  components: {
    passwordchecker,
    ValidationProvider,
    ValidationObserver

  },
  methods: {
    setPass1(value) {
      this.registerPassword = value
      console.log('regpass: ' +value)
    },
    setPass2(value) {
      this.confirmPassword = value
      console.log('confirmpass: ' + value)
    },
    submit() {
      this.$refs.observer.validate()
    },
    clear () {
      this.confirmPassword = ''
      this.registerUsername = ''
      this.registerEmail = ''
      this.registerfirstName = ''
      this.registerlastName = ''
      this.registerPassword = ''
      this.$refs.observer.reset()
    },
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
        if (res.status) {
          console.log(res.status)
          this.$emit('clicked', 'home')
        }
        localStorage.loggedin = true
        localStorage.email = this.email
      }catch (e){
        console.log(e)
      }
    },
    async register() {
      if(this.confirmPassword === this.registerPassword) {
        let body = {
          email: this.registerEmail,
          password: this.registerPassword,
          name: this.registerUsername,
        }
        console.log(body)
        try {
          const res = await axios.post('http://192.168.50.63:8000/rpc/signup', body)
          console.log(res)
          this.email = this.registerEmail
          this.password = this.registerPassword
          await this.login()
        }catch (e){
          alert(e)
        }
      }
      else {
        alert('Passwords do not match! Please Re-enter.')
      }
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
