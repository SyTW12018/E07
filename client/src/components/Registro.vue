<template>
  <v-container fluid>
    <v-layout row justify-center align-center class="h100vh">
      <v-flex xs12 md8 class="form-bg text-xs-center">
        <v-flex xs10 offset-xs1>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-flex class="text-xs-center">
              <h2>Registrate ya!</h2>
            </v-flex>
            <v-alert v-model="res" :type="resType" transition="scale-transition">{{alertText}}</v-alert>
            <v-text-field id="text-field" v-model="name" :rules="nameRules" label="Nombre" required></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :type="'password'"
              label="Contraseña"
              required
            ></v-text-field>
            <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v ||'']"
              label="Al hacer clic en unirte, aceptas las Condiciones de uso, la Política de privacidad y la Política de cookies de GamerIn."
              required
            ></v-checkbox>
            <v-btn :disabled="!valid" @click="submit">Unete ahora</v-btn>
            <v-btn @click="clear">Borrar</v-btn>
          </v-form>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>
 
<style scoped>
h2 {
  font-size: 30px;
  font-family: "Avenir";
}
.form-bg {
  font-family: "Avenir";
  background: rgba(183, 222, 237, 1);
}

.h100vh {
  height: 100vh;
}
</style>
 
<script>
import axios from "axios";
export default {
  name: "Registro",
  data: () => ({
    valid: true,
    name: "",
    nameRules: [v => !!v || "Campo vacío. Por favor rellenelo"],
    email: "",
    emailRules: [
      v => !!v || "Campo vacío. Por favor rellenelo",
      v =>
        /[A-z0-9]+@[A-z0-9]+\.[A-z0-9]/.test(v) ||
        "No reconocemos la dirección de email. Vuelve a intentarlo."
    ],
    password: "",
    passwordRules: [v => !!v || "Campo vacío. Por favor rellenelo"],
    select: null,
    checkbox: false,
    alertText: "",
    res: false,
    resType: ""
  }),

  methods: {
    submit() {
      let params = {
        username: this.name,
        password: this.password,
        email: this.email
      };
      let url = `/api/register`;
      this.res = false;
      this.alertText = "";
      axios
        .post(url, params)
        .then(res => {
          this.res = true;
          this.resType = "success";
          this.alertText = res.data.message;
        })
        .catch(err => {
          this.res = true;
          this.resType = "error";
          this.alertText = err.response.data.message;
        });
    },
    clear() {
      this.res = false;
      this.name = "";
      this.email = "";
      this.password = "";
      this.checkbox = false;
    }
  }
};
</script>