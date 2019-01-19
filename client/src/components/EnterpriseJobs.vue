<template>
  <div>
    <v-card v-for="offer in paginatedData">
      <v-card-text>
        <v-layout row align-center>
          <v-layout column xs1>
            <v-img max-height="50" contain src="https://www.w3schools.com/w3images/avatar2.png"></v-img>
          </v-layout>
          <v-layout column xs11>
            <router-link class="router-link" :to="`/business/${enterprise}`">
              <h3 class="headline">{{enterprise}}</h3>
            </router-link>
            <div>
              <p>
                Lugar: {{offer.place}}
                <br>
                Experiencia Necesaria: {{offer.exp}}
                <br>
                Tipo de trabajo: {{offer.kindOfJob}}
                <br>
                Salario: {{offer.salary}} €
              </p>
            </div>
          </v-layout>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-btn class="a" @click="apply(offer._id)" flat color="blue">Apúntate</v-btn>
      </v-card-actions>
    </v-card>
    <div class="text-xs-center">
      <v-pagination id="paginator" v-model="page" :length="this.pages"></v-pagination>
    </div>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ snackbarText }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    loading: true,
    offers: "",
    pages: "",
    page: 1,
    snackbar: false,
    snackbarText: ""
  }),
  computed: {
    paginatedData() {
      const start = this.page * 3 - 3;
      const end = start + 3;
      return this.offers.slice(start, end);
    }
  },
  props: {
    id: "",
    enterprise: ""
  },
  mounted() {
    this.getJobs();
  },
  methods: {
    getJobs() {
      let url = `/api/enterpriseOffers/${this.id}`;
      console.log("url", url);
      axios
        .get(url)
        .then(res => {
          this.offers = res.data.offers;
          console.log(this.offers);
          this.loading = false;
          this.pages =
            res.data.offers.length % 3
              ? Math.trunc(res.data.offers.length / 3) + 1
              : Math.trunc(res.data.offers.length / 3);
          console.log(this.pages);
        })
        .catch(err => {
          console.log(err);
        });
    },
    apply(offerid) {
      console.log(this.$store.getters.user);
      let params = {
        description: "test",
        offerid: offerid,
        userid: this.$store.getters.user._id
      };
      console.log(params);
      axios
        .post("/api/newApply", params)
        .then(res => {
          this.snackbar = true;
          this.snackbarText = res.data.message;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          this.snackbar = true;
          this.snackbarText = err.response.data.message;
        });
    }
  }
};
</script>

<style scoped>
#paginator {
  margin-top: 10px;
}
.a {
  margin-left: auto;
}
.router-link {
  text-decoration: none;
}
</style>
