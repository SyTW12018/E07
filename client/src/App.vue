<template>
<div id="app">
  <app-toolbar></app-toolbar>
  <app-home></app-home>
  <app-footer></app-footer>
</div>
</template>

<script>
import AppToolbar from "./components/AppToolbar";
import AppFooter from "./components/AppFooter";
import AppHome from "./components/AppHome";

export default {
  name: "App",
  components: {
    AppFooter,
    AppToolbar,
    AppHome
  },
  data() {
    return {
      //
    };
  }
};
</script>
