<template>
  <v-parallax class="h100vh" dark src="https://www.media-tics.com/fotos/8/esports.jpg" height>
    <v-layout column align-center justify-center>
      <div class="text-xs-center">
        <h1 class="black--text display-2 font-weight-thin mb-3">Bienvenido</h1>
        <h3 class="black--text subheading">¿Eres nuevo en GamerIn?
          <router-link to="/registro">Únete ahora</router-link>
        </h3>
      </div>
    </v-layout>
  </v-parallax>
</template>

<script>
export default {
  name: "Home"
};
</script>
 
<style scoped>
.h100vh {
  height: 100vh;
}
</style>