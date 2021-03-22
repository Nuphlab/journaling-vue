<template>
  <v-app>
    <v-container>
    <v-card class="mx-auto pl-5 pr-5 pt-5" max-width="450" outlined>
      <h3>Register</h3>
      <ValidationObserver ref="observer" v-slot="{ valid }">
        <ValidationProvider
            name="name"
            ref="name"
            rules="required|alpha|max:20"
            v-slot="{ errors }"
            :bails="false"
        >
          <v-text-field v-model="name" label="Name" outlined></v-text-field>
          <ul style="color:red" class="overline text-left">
            <li v-for="(error, index) in errors" :key="index">
              <span>{{ error }}</span>
            </li>
          </ul>
        </ValidationProvider>

        <ValidationProvider
            name="email"
            ref="email"
            rules="required|email"
            v-slot="{ errors }"
            :bails="false"
        >
          <v-text-field
              class="ma-0"
              v-model="email"
              label="Email"
              counter
              outlined
          ></v-text-field>
          <ul style="color:red" class="overline text-left">
            <li v-for="(error, index) in errors" :key="index">
              <span>{{ error }}</span>
            </li>
          </ul>
        </ValidationProvider>

        <ValidationProvider
            name="password"
            ref="password"
            rules="required|customPassword|min:8"
            v-slot="{ errors }"
            :bails="false"
        >
          <v-text-field
              class="ma-0"
              v-model="password"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              counter
              @click:append="show1 = !show1"
              outlined
          ></v-text-field>
          <ul style="color:red" class="overline text-left">
            <li v-for="(error, index) in errors" :key="index">
              <span>{{ error }}</span>
            </li>
          </ul>
        </ValidationProvider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn :disabled="!valid" @click="signIn()" text>Login</v-btn> -->
          <v-btn depressed @click="clear()" color="grey">Clear</v-btn>
          <v-btn :disabled="!valid" depressed @click="signIn()" color="brown">Login</v-btn>
        </v-card-actions>
      </ValidationObserver>
    </v-card>
    </v-container>
  </v-app>
</template>

<script>
import {ValidationProvider, extend} from "vee-validate/dist/vee-validate.full";
import { ValidationObserver } from "vee-validate/dist/vee-validate.full";
// can customize default error messages
extend("required", {
  message: (field, values) => "You must enter a " + `${field} ${values}` + " value"
});
// create custom error message for custom rule
var errorMessage =
    " min length 8 chars, and must include 1 lower-case, upper-case, numeral andspecial character (#!@$%^*-)";
// create custom rule
extend("customPassword", {
  message: field => "The " + `${field}` + errorMessage,
  validate: value => {
    var notTheseChars = /["'?&/<>\s]/;
    var mustContainTheseChars = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!@$%^*-]).{8,}$/;
    var containsForbiddenChars = notTheseChars.test(value);
    var containsRequiredChars = mustContainTheseChars.test(value);
if (containsRequiredChars && !containsForbiddenChars) {
  return true;
} else {
  if (containsForbiddenChars) {
    errorMessage =
        ' contains forbidden characters: " ' + " ' ? & / < > or space";
  } else {
    errorMessage =
        " min length 8 chars, and must include 1 lower-case, upper-case, numeraland special character ($@$!%*#?&)";
  }
  return false;
}
}
});
export default {
  name: "register",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      show1: false,
      name: "",
      password: "",
      email: ""
    };
  },
  computed: {},
  created() {},
  methods: {
    clear() {
      this.name = '',
      this.email = '',
      this.password = ''
    },
    async signIn() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        console.log("is not valid");
        alert("Please fix errors first!");
      } else {
        console.log("is valid");
        console.log(this.name + " signed in with password " + this.password);
        // reset fields
        this.name = "";
        this.password = "";
        // reset validation
        // You should call it on the next frame
        requestAnimationFrame(() => {
          this.$refs.observer.reset();
        });
      }
    }
  }
};
</script>
