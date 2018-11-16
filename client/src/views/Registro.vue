<template>
  <div>
    <Navbar />
    <Registro />
    <Footer />
  </div>
  
</template>

<script>
  import Footer from '../components/Footer'
  import Navbar from '../components/Navbar'
  import Registro from '../components/Registro'
  export default {
    components: {
      Navbar,
      Footer,
      Registro
    }
  }
</script>
