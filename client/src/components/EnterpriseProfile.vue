<template>
  <div>
    <div v-if="this.loading==true">
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-progress-circular indeterminate color="blue"></v-progress-circular>
        </v-layout>
      </v-container>
    </div>
    <div v-else>
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
                  <div>Lugar: {{this.place}}</div>
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
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "EnterpriseProfile",
  data: () => ({
    loading: true,
    enterprise: "",
    place: "",
    description: ""
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
      console.log("url", url);
      await axios
        .get(url)
        .then(res => {
          console.log(res);
          this.enterprise = res.data.enterprise.nameEnterprise;
          this.place = res.data.enterprise.place;
          this.description = res.data.enterprise.description;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.$router.push({ name: "Home" });
        });
    }
  },
  async mounted() {
    let wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    await wait(2000).then(async () => {
      await this.info();
    });
  }
};
</script>


<style scoped>
</style>

