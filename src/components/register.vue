<template>
  <div id="app">

    <!-- Register Component -->
    <v-container>
      <v-card class="pa-2">
        <v-row>
          <v-col>
            <v-card-title>Register</v-card-title>
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
name: "register",
  data() {
    return {

    }
  },
  components: {
    passwordchecker,
    ValidationProvider,
    ValidationObserver
  },
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
</script>

<style scoped>

</style>
