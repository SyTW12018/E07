<template>
  <v-container fluid>
    <v-layout row justify-center align-center class="h100vh">
      <v-flex xs12 md8 class="form-bg text-xs-center">
        <v-flex xs10 offset-xs1>
          <v-form ref="form" v-model="valid" lazy-validation id="form">
            <h2>
              <v-icon class="mr">settings</v-icon>Configuración de Cuenta!
            </h2>
            <span>{{newEmail}}</span>
            <v-alert v-model="res" :type="resType" transition="scale-transition">{{alertText}}</v-alert>
            <v-text-field v-model="newName" :placeholder="name" :value="name" label="Nombre"></v-text-field>
            <v-text-field
              v-model="newSurname"
              :placeholder="surname"
              :value="surname"
              label="Apellidos"
            ></v-text-field>
            <v-textarea
              v-model="newDescription"
              :placeholder="description"
              :value="description"
              label="Description"
              auto-grow
            ></v-textarea>
            <v-text-field
              v-model="newEmail"
              :placeholder="email"
              :rules="emailRules"
              label="E-mail"
            ></v-text-field>
            <v-text-field v-model="newPassword" :type="'password'" label="Nueva Contraseña"></v-text-field>
            <v-text-field
              v-model="oldPassword"
              :rules="passwordRules"
              :type="'password'"
              label="Contraseña Actual"
              required
            ></v-text-field>
            <v-btn :disabled="!valid" @click="submit">Actualizar</v-btn>
          </v-form>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "Account",
  data: () => ({
    newName: "",
    oldPassword: "",
    newPassword: "",
    passwordRules: [v => !!v || "Campo vacío. Por favor rellenelo"],
    newSurname: "",
    newEmail: "",
    newDescription: "",
    emailRules: [
      v =>
        /[A-z0-9]+@[A-z0-9]+\.[A-z0-9]+/.test(v) ||
        v == "" ||
        "No reconocemos la dirección de email. Vuelve a intentarlo."
    ],
    valid: true,
    res: false,
    resType: "",
    alertText: ""
  }),
  computed: {
    name: function() {
      return this.$store.getters.user.name;
    },
    surname: function() {
      return this.$store.getters.user.surname;
    },
    email: function() {
      return this.$store.getters.user.email;
    },
    description: function() {
      return this.$store.getters.user.description;
    },
    id: function() {
      return this.$store.getters.user.id;
    }
  },
  methods: {
    async submit() {
      let params = {};
      if (this.newName !== "" && this.newName !== this.name)
        params.name = this.newName;
      if (this.newPassword !== "") params.newPassword = this.newPassword;
      if (this.newSurname !== "" && this.newSurname !== this.surname)
        params.surname = this.newSurname;
      if (this.newEmail !== "" && this.newEmail !== this.email)
        params.newEmail = this.newEmail;
      if (
        this.newDescription !== "" &&
        this.newDescription !== this.description
      )
        params.newDescription = this.newDescription;
      params.password = this.oldPassword;
      params.email = this.email;

      console.log(params);
      let res = await this.$store.dispatch("updateInfo", params);
      this.alertText = res.message;
      this.resType = res.resType;
      this.res = true;
    }
  }
};
</script>

<style scoped>
.mr {
  margin-right: 10px;
}

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
