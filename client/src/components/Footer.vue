<template>
  <div id="footer">
    <v-footer height="auto" color="indigo">
      <v-layout class="white--text" align-center justify-center row wrap>
        <v-text>&copy;2018 —</v-text>
        <strong>GamerIn</strong>
        <v-btn v-for="link in links" :key="link" color="white" flat round>{{ link }}</v-btn>
      </v-layout>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    links: [
      "Sobre nosotros",
      "Condiciones de uso",
      "Contactanos",
      "Política de privacidad",
      "Política de copyright"
    ]
  })
};
</script>

<style scoped>
#footer {
  margin-top: 10px;
}
</style>
