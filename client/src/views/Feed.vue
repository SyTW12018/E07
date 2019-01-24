<template>
  <div>
    <Navbar/>
    <v-container fluid>
      <v-layout column>
        <v-layout row justify-center>
          <v-flex xs8 lg5 class="text-xs-center">
            <PostBuilder/>
          </v-flex>
        </v-layout>
        <v-divider class="mb-3"></v-divider>
        <v-layout row justify-center>
          <v-flex xs8 lg5>
            <PostList/>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>

    <Footer/>
  </div>
</template>

<script>
import PostBuilder from "../components/PostBuilder";
import PostList from "../components/PostList";
export default {
  components: {
    PostBuilder,
    PostList
  }
};
</script>
