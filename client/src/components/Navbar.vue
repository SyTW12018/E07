<template>
  <v-toolbar id="toolbar" color="indigo">
    <v-toolbar-items class="menu">
      <v-btn class="white--text" flat router-link to="/home">GamerIn</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="isLoggedIn" class="menu">
      <v-btn class="white--text" flat router-link to="/home">Muro</v-btn>
      <v-btn class="white--text" flat router-link to="/registro">Trabajos</v-btn>
      <v-btn class="white--text" flat router-link to="/login">Cuenta</v-btn>
      <v-btn class="white--text" flat @click="logout">Desconectarse</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-else class="menu">
      <v-btn class="white--text" flat router-link to="/home">Inicio</v-btn>
      <v-btn class="white--text" flat router-link to="/registro">Registrate</v-btn>
      <v-btn class="white--text" flat router-link to="/login">Iniciar sesion</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "app-toolbar",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/home");
      });
    }
  }
};
</script>

 
<style>
#text {
  font-size: 40px;
}

#toolbar {
  height: 56px;
}
</style>