<template>
  <div>
    <Navbar/>
    <Account/>
    <Footer/>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Account from "../components/Account";
export default {
  components: {
    Navbar,
    Footer,
    Account
  }
};
</script>
