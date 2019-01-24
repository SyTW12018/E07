<template>
  <div>
    <v-container fluid>
      <template v-if="this.loading">
        <v-layout row justify-center>
          <v-progress-circular indeterminate color="blue"></v-progress-circular>
        </v-layout>
      </template>
      <template v-else>
        <v-layout column>
          <div v-if="this.err">
            <v-layout row justify-center xs12>
              <v-alert v-model="this.err" type="info" transition="scale-transition">{{alertText}}</v-alert>
            </v-layout>
          </div>
          <div v-else>
            <v-layout row justify-center>
              <v-flex class="text-xs-center pb-2" xs12>
                <h1>Ofertas de Trabajo Disponibles!</h1>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row justify-center class="pb-2 pt-2 mt-2 mb-2">
              <v-flex xs8 lg5>
                <v-card v-for="offer in this.offers" class="card">
                  <v-card-text>
                    <v-layout row align-center>
                      <v-layout column xs1>
                        <v-img
                          max-height="50"
                          contain
                          src="https://www.w3schools.com/w3images/avatar2.png"
                        ></v-img>
                      </v-layout>
                      <v-layout column xs11>
                        <div v-if="enterprise">
                          <router-link class="router-link" :to="`/business/${enterprise}`">
                            <h3 class="headline">{{enterprise}}</h3>
                          </router-link>
                        </div>
                        <div v-else>
                          <router-link
                            class="router-link"
                            :to="`/business/${offer.enterprise.nameEnterprise}`"
                          >
                            <h3 class="headline">{{offer.enterprise.nameEnterprise}}</h3>
                          </router-link>
                        </div>
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
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row justify-center>
              <v-flex class="text-xs-center mt-2" xs12>
                <v-pagination v-model="page" :length="this.pages" @input="next"></v-pagination>
              </v-flex>
            </v-layout>
          </div>
        </v-layout>
      </template>
    </v-container>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
      right
    >
      {{ snackbarText }}
      <v-btn dark flat @click="snackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    loading: false,
    page: 1,
    pages: 1,
    offers: [],
    snackbar: false,
    snackbarText: "",
    err: false,
    alertText: ""
  }),
  props: ["id", "enterprise"],
  async mounted() {
    await this.getPage(1);
  },
  methods: {
    async next() {
      this.loading = true;
      this.getPage(this.page);
    },
    async getPage(page) {
      let url;
      if (!this.id) {
        url = `/api/jobOffers/${page}`;
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
            this.err = true;
            this.loading = false;
            this.alertText = err.response.data.message;
          });
      } else {
        url = `/api/enterpriseOffers/${this.id}/${page}`;
        console.log("url", url);
        axios
          .get(url)
          .then(res => {
            this.offers = res.data.offers;
            this.loading = false;
            this.pages =
              res.data.total % 3
                ? Math.trunc(res.data.total / 3) + 1
                : Math.trunc(res.data.total / 3);
          })
          .catch(err => {
            this.err = true;
            this.loading = false;
            this.alertText = err.response.data.message;
          });
      }
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
.card {
  margin-bottom: 3px;
}
.router-link {
  text-decoration: none;
}
</style>
