<template>
  <div>
    <div v-if="this.loading">
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-progress-circular indeterminate color="blue"></v-progress-circular>
        </v-layout>
      </v-container>
    </div>
    <div v-else>
      <div v-if="this.err">
        <v-alert v-model="this.err" type="info" transition="scale-transition">{{alertText}}</v-alert>
      </div>
      <div v-else>
        <v-card class="card" v-for="post in posts">
          <v-card-text>
            <v-layout row align-center>
              <v-layout column>
                <div v-if="post.onModel == 'enterprise'">
                  <img class="avatar" :src="`/public/business/${post.creator.avatar}`">
                </div>
                <div v-else>
                  <img class="avatar" :src="`/public/user/${post.creator.avatar}`">
                </div>
              </v-layout>
              <v-layout column>
                <div v-if="post.onModel == 'enterprise'">
                  <router-link class="router-link" :to="`/business/${post.creator.nameEnterprise}`">
                    <h3 class="headline">{{post.creator.nameEnterprise}}</h3>
                  </router-link>
                </div>
                <div v-else>
                  <router-link class="router-link" :to="`/user/${post.creator.username}`">
                    <h3 class="headline">{{post.creator.username}}</h3>
                  </router-link>
                </div>
              </v-layout>
              <v-layout column>
                <h6 class="mlauto">{{postDate(post.createAt)}}</h6>
              </v-layout>
            </v-layout>
            <v-divider class="mt-1 mb-1"></v-divider>
            <v-layout row>
              <div>
                <p>{{post.body}}</p>
              </div>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-layout row justify-center>
          <v-flex class="text-xs-center mt-2" xs12>
            <v-pagination v-model="page" :length="this.pages" @input="next"></v-pagination>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
moment.locale("es");
export default {
  name: "PostList",
  data: () => ({
    loading: true,
    posts: [],
    pages: 1,
    page: 1,
    err: false,
    alertText: ""
  }),
  props: ["id"],
  mounted() {
    this.getPage(1);
  },
  methods: {
    next() {
      this.loading = true;
      this.err = false;
      this.getPage(this.page);
    },
    getPage(page) {
      let url;
      if (this.id) {
        url = `/api/posts/${this.id}/${page}`;
        axios
          .get(url)
          .then(res => {
            console.log("posts res", res);
            this.loading = false;
            this.posts = res.data.posts;
            this.pages =
              res.data.total % 7
                ? Math.trunc(res.data.total / 7) + 1
                : Math.trunc(res.data.total / 7);
          })
          .catch(err => {
            this.err = true;
            this.loading = false;
            this.alertText = err.response.data.message;
          });
      } else {
        url = `/api/posts/${page}`;

        axios
          .get(url)
          .then(res => {
            this.loading = false;
            this.posts = res.data.posts;
            this.pages =
              res.data.total % 7
                ? Math.trunc(res.data.total / 7) + 1
                : Math.trunc(res.data.total / 7);
          })
          .catch(err => {
            this.err = true;
            this.loading = false;
            this.alertText = err.response.data.message;
          });
      }
    },
    postDate(unix) {
      return moment(unix * 1000).fromNow();
    }
  }
};
</script>
<style scoped>
.avatar {
  max-height: 50px;
}
.router-link {
  text-decoration: none;
}
.card {
  margin-bottom: 3px;
}
.mlauto {
  margin-left: auto;
}
</style>
