<template>
  <div>
    <v-layout>
      <v-flex mt-3 xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title primary-title>
            <v-layout row>
              <v-layout column xs1>
                <v-img
                  max-height="125"
                  contain
                  src="https://www.w3schools.com/w3images/avatar2.png"
                ></v-img>
              </v-layout>
              <v-layout column xs1 class="ml-2">
                <h3 class="headline">{{this.enterprise}}</h3>
                <div>{{this.place}}</div>
              </v-layout>
            </v-layout>
          </v-card-title>
          <v-card-text>
            <p>{{this.description}}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn router-link to="./jobs" append flat color="blue">Ofertas de Trabajo</v-btn>
          </v-card-actions>
        </v-card>
        <v-divider class="m-3"></v-divider>
        <PostList :id="this.id"/>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import PostList from "./PostList";
export default {
  name: "EnterpriseProfile",
  props: ["loading", "enterprise", "place", "description", "id"],
  components: {
    PostList
  }
};
</script>

<style scoped>
.m-3 {
  margin: 30px;
}
</style>

