<template>
  <div>
    <div v-if="!this.id">
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-progress-circular indeterminate color="blue"></v-progress-circular>
        </v-layout>
      </v-container>
    </div>
    <UserProfile v-else :id="this.id" :user="this.user"/>
  </div>
</template>

<script>
import axios from "axios";
import UserProfile from "../components/UserProfile";
export default {
  data: () => ({
    id: "",
    user: "",
    loading: true
  }),
  computed: {
    username() {
      return this.$route.params.username;
    }
  },
  methods: {
    async info() {
      this.loading = true;
      let url = `/api/user/${this.username}`;
      await axios
        .get(url)
        .then(res => {
          this.user = res.data.user;
          this.id = res.data.user._id;
        })
        .catch(err => {
          this.$router.push({ name: "Home" });
        });
    }
  },
  async mounted() {
    await this.info();
  },
  components: {
    UserProfile
  }
};
</script>
