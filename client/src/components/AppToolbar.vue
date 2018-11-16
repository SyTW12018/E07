<template>
  <v-toolbar id="toolbar" color="indigo">
    <v-toolbar-items class="menu"><v-btn class="white--text" flat router-link to="/Home">GamerIn</v-btn></v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="menu">
        <v-btn class="white--text" flat router-link to="/Home">Inicio</v-btn>
        <v-btn class="white--text" flat router-link to="/Registro">Registrate</v-btn>
        <v-btn class="white--text" flat router-link to="/Login">Iniciar sesion</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
 
<style>
#text {
  font-size: 40px;
}
#toolbar {
  height: 56px;
}
</style>