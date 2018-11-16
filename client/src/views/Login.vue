<template>
  <div>
    <Navbar />
    <Login />
    <Footer />
  </div>
  
</template>

<script>
  import Footer from '../components/Footer'
  import Navbar from '../components/Navbar'
  import Login from '../components/Login'
  export default {
    components: {
      Navbar,
      Footer,
      Login
    }
  }
</script>
