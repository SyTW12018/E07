<template>
<v-container id="contenedor">
  <v-form ref="form"  v-model="valid" lazy-validation id="form">
    <h2>¡Te damos la bienvenida de nuevo!</h2>
    <h6>¿Te vas a perder tu siguiente gran oportunidad? Inicia sesión para estar al día de tu entorno profesional.</h6>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      :counter="10"
      label="Contraseña"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      Entrar
    </v-btn>
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
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Campo vacío.Por favor rellenelo",
      v =>
        (v && v.length <= 20) ||
        "Nombre incorrecto.Debe contener menos de 20 caracteres"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Campo vacío.Por favor rellenelo",
      v =>
        /.+@.+/.test(v) ||
        "No reconocemos la dirección de email. Vuelve a intentarlo."
    ],
    select: null
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        axios.post("/api/submit", {
          email: this.email,
          password: this.password
        });
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>