<template>
  <div>
    <v-alert v-model="res" :type="this.resType" transition="scale-transition">{{alertText}}</v-alert>
    <v-form>
      <v-textarea v-model="post" auto-grow box placeholder="¿Sobre que quieres hablar?"></v-textarea>
      <v-btn class="mb-2" @click="publish">Publicar</v-btn>
    </v-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "PostBuilder",
  data: () => ({
    post: "",
    res: false,
    resType: "",
    alertText: ""
  }),
  methods: {
    publish() {
      if (this.post != "") {
        this.res = false;
        let params = {
          onModel: "User",
          body: this.post,
          creator: this.$store.getters.user._id
        };
        axios
          .post("/api/addPost", params)
          .then(res => {
            this.res = true;
            this.resType = "success";
            this.alertText = res.data.message;
          })
          .catch(err => {
            this.res = true;
            this.resType = "error";
            this.alertText = err.response.data.message;
          });
      }
    }
  }
};
</script>
<style scoped>
</style>
