<template>
  <div>
    <div v-if="!this.id">
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-progress-circular indeterminate color="blue"></v-progress-circular>
        </v-layout>
      </v-container>
    </div>
    <router-view v-else :id="this.id" :enterprise="this.enterprise" :loading="this.loading"></router-view>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    id: "",
    enterprise: "",
    loading: true
  }),
  computed: {
    name() {
      return this.$route.params.name;
    }
  },
  methods: {
    async info() {
      this.loading = true;
      let url = `/api/business/${this.name}`;
      await axios
        .get(url)
        .then(res => {
          this.enterprise = res.data.enterprise;
          this.id = res.data.enterprise._id;
          this.loading = false;
        })
        .catch(err => {
          this.$router.push({ name: "Home" });
        });
    }
  },
  async mounted() {
    await this.info();
  }
};
</script>
