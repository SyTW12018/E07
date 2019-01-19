<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-content>
            <img class="logo inverted" src="@/assets/logo.png" alt="lel"></img>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense v-if="isLoggedIn">
        <v-divider></v-divider>
        <v-list-tile :to="item.path" v-for="item in loggedItems" @click>
          <v-list-tile-action>
            <v-icon>{{item.action}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Desconectarse</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense v-else>
        <v-divider></v-divider>
        <v-list-tile :to="item.path" v-for="item in guestItems" @click>
          <v-list-tile-action>
            <v-icon>{{item.action}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dense dark color="indigo" app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <router-link to="/home" class="toolbar-title logo">
        <v-toolbar-title class="white--text">
          <img class="logo" src="@/assets/logo.png" alt="lel"></img>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="isLoggedIn" class="menu hidden-sm-and-down">
        <v-btn class="white--text" flat router-link to="/home">Muro</v-btn>
        <v-btn class="white--text" flat router-link to="/jobs">Trabajos</v-btn>
        <v-btn class="white--text" flat router-link to="/account">Cuenta</v-btn>
        <v-btn class="white--text" flat @click="logout">Desconectarse</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else class="menu hidden-sm-and-down">
        <v-btn class="white--text" flat router-link to="/home">Inicio</v-btn>
        <v-btn class="white--text" flat router-link to="/registro">Registrate</v-btn>
        <v-btn class="white--text" flat router-link to="/login">Iniciar sesion</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "app-toolbar",
  data: () => ({
    drawer: null,
    loggedItems: [
      {
        action: "public",
        title: "Muro",
        path: "/feed"
      },
      {
        action: "work",
        title: "Trabajos",
        path: "/jobs"
      },
      {
        action: "settings",
        title: "Cuenta",
        path: "/account"
      }
    ],
    guestItems: [
      {
        action: "home",
        title: "Inicio",
        path: "/home"
      },
      {
        action: "assignment",
        title: "Registro",
        path: "/registro"
      },
      {
        action: "person",
        title: "Iniciar Sesión",
        path: "/login"
      }
    ]
  }),
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/home");
      });
    }
  }
};
</script>

 
<style scoped>
.inverted{
  filter:invert(100%)
}

.logo {
  height: 48px;
  object-fit: cover;
}

.toolbar-title {
  text-decoration: none;
}
</style>