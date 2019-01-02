<template>
  <v-container id="contenedor">
    <v-form ref="form" v-model="valid" lazy-validation id="form">
      <h2>¡Te damos la bienvenida de nuevo!</h2>
      <h6>¿Te vas a perder tu siguiente gran oportunidad? Inicia sesión para estar al día de tu entorno profesional.</h6>
      <v-alert v-model="resError" type="error" transition="scale-transition">{{alertText}}</v-alert>
      <v-alert v-model="res" type="success" transition="scale-transition">{{alertText}}</v-alert>
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        :type="'password'"
        label="Contraseña"
        required
      ></v-text-field>
      <v-btn :disabled="!valid" @click="submit">Entrar</v-btn>
      <v-btn @click="clear">Borrar</v-btn>
    </v-form>
  </v-container>
</template>

<style>
h6 {
  font-size: 10px;
}
</style>
 
<script>
import axios from "axios";
export default {
  name: "Login",
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "Campo vacío. Por favor rellenelo",
      v =>
        /[A-z0-9]+@[A-z0-9]+\.[A-z0-9]+/.test(v) ||
        "No reconocemos la dirección de email. Vuelve a intentarlo."
    ],
    password: "",
    passwordRules: [v => !!v || "Campo vacío. Por favor rellenelo"],
    select: null,
    res: false,
    resError: false,
    alertText: ""
  }),
  methods: {
    submit() {
      let url = "/api/login";
      let params = {
        email: this.email,
        password: this.password
      };
      this.res = false;
      this.resError = false;

      axios
        .post(url, params)
        .then(res => {
          this.$store.commit("setName", res.data.user.name);
          this.$store.commit("setSurname", res.data.user.surname);
          this.$store.commit("setUsername", res.data.user.username);
          this.$store.commit("setEmail", res.data.user.email);
          this.$store.commit("setToken", res.data.token);
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: res.data.user.name,
              surname: res.data.user.surname,
              username: res.data.user.username,
              email: res.data.user.email
            })
          );
          localStorage.setItem("token", res.data.token);
          this.alertText = res.data.message;
          this.res = true;
          this.$router.push({ name: "feed" });
        })
        .catch(err => {
          this.alertText = err.response.data.message;
          this.resError = true;
        });
    },
    clear() {
      this.res = false;
      this.resError = false;
      this.email = "";
      this.password = "";
    }
  }
};
</script>