<template>
  <div>
    <Navbar/>
    <Home/>
    <Footer/>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
export default {
  components: {
    Navbar,
    Footer,
    Home
  }
};
</script>
