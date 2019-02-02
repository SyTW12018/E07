<template>
  <div>
    <v-layout>
      <v-flex mt-3 xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title primary-title>
            <v-layout row>
              <v-layout column xs1>
                <v-img max-height="125" contain :src="`/public/user/${this.user.avatar}`"></v-img>
              </v-layout>
              <v-layout column xs1 class="ml-2">
                <h3 class="headline">{{this.user.name}} {{this.user.surname}}</h3>
              </v-layout>
            </v-layout>
          </v-card-title>
          <v-card-text>
            <p>{{this.user.description}}</p>
          </v-card-text>
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
  name: "UserProfile",
  props: ["user", "id"],
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

