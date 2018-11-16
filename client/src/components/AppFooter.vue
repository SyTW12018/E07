<template>
  <v-footer
    height="auto" fixed
    color="indigo"
  >
    <v-layout id="footer"
      justify-center
      row
      wrap
    >
    &copy;2018 — <strong>GamerIn</strong>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        flat
        round
      >
        {{ link }}
      </v-btn>
      <v-flex
        primary
        lighten-2
        py-2
        text-xs-center
        white--text
        xs12
      >  
      </v-flex>
    </v-layout>
  </v-footer>
</template>
 
 
<style>
#footer {
  height: 55px;
}
</style>
<script>
export default {
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