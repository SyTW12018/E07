<template>
  <div>
    <Navbar/>
    <EnterpriseProfile/>
    <Footer/>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import EnterpriseProfile from "../components/EnterpriseProfile";
export default {
  components: {
    Navbar,
    Footer,
    EnterpriseProfile
  }
};
</script>
