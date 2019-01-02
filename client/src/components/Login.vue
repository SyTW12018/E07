<template>
  <v-container id="contenedor">
    <v-form ref="form" v-model="valid" lazy-validation id="form">
      <h2>¡Te damos la bienvenida de nuevo!</h2>
      <h6>¿Te vas a perder tu siguiente gran oportunidad? Inicia sesión para estar al día de tu entorno profesional.</h6>
      <v-alert v-model="res" :type="resType" transition="scale-transition">{{alertText}}</v-alert>
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
    resType: "",
    alertText: "prueba"
  }),
  methods: {
    async submit() {
      let data = {
        email: this.email,
        password: this.password
      };
      let res = await this.$store.dispatch("login", data);
      this.alertText = res.message;
      this.resType = res.resType;
      this.res = true;
      if (res.resType == "success") {
        this.$router.push({ name: "home" });
      }
    },
    clear() {
      this.resType = "";
      this.email = "";
      this.password = "";
    }
  }
};
</script>