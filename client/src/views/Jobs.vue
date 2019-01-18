<template>
  <div>
    <Navbar/>
    <JobList/>
    <Footer/>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import JobList from "../components/JobList";
export default {
  components: {
    Navbar,
    Footer,
    JobList
  }
};
</script>
