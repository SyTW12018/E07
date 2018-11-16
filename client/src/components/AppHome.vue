<template>
  <v-parallax
    dark
    src="http://www.e-sportsmag.com/wp-content/uploads/2017/12/esports-2018-torneos.jpg" height="550"
  >
    <v-layout
      align-center
      column
      justify-center
    >
    <v-container fluid>
    <v-layout justify-space-around>
    <v-flex xs5>
          <v-img src="logo" aspect-ratio="1.7"></v-img>
      </v-flex>
      </v-layout>
      </v-container>
      <h1 class="display-2 font-weight-thin mb-3">Bienvenido</h1>
      <h3>
      ¿Eres nuevo en GamerIn?<router-link to="/Registro"> Únete ahora</router-link>
      </h3>
      <router-view></router-view>  
    </v-layout>
  </v-parallax>
</template>

<script>
export default {
  data: () => ({})
};
</script>
 
<style>
h1 {
  color: black;
  padding-top: 400px;
}
h3 {
  color: black;
  padding-bottom: 1000px;
}
</style>