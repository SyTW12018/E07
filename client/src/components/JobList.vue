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
      <v-card v-for="offer in offers">
        <v-card-text>
          <v-layout row align-center>
            <v-layout column xs1>
              <v-img max-height="50" contain src="https://www.w3schools.com/w3images/avatar2.png"></v-img>
            </v-layout>
            <v-layout column xs11>
              <h3 class="headline">{{offer.enterprise.nameEnterprise}}</h3>
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
    </div>
    <div class="text-xs-center mt-2">
      <v-pagination id="paginator" v-model="page" :length="this.pages" @input="next"></v-pagination>
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
    page: 1,
    pages: 1,
    offers: [],
    snackbar: false,
    snackbarText: ""
  }),
  mounted() {
    this.getPage(1);
  },
  methods: {
    async next() {
      this.loading = true;
      this.getPage(this.page);
    },
    getPage(page) {
      let url = `/api/jobOffers/${page}`;
      console.log(url);
      axios
        .get(url)
        .then(res => {
          this.loading = false;
          this.offers = res.data.offers;
          this.pages =
            res.data.total % 3
              ? Math.trunc(res.data.total / 3) + 1
              : Math.trunc(res.data.total / 3);
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    apply(offerid) {
      let params = {
        description: "test",
        offerid: offerid,
        userid: this.$store.getters.user.id
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
</style>
