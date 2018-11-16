<template>
    <v-toolbar id="toolbar" color="indigo">
        <v-toolbar-items class="menu">
            <v-btn class="white--text" flat router-link to="/home">GamerIn</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items class="menu">
            <v-btn class="white--text" flat router-link to="/home">Inicio</v-btn>
            <v-btn class="white--text" flat router-link to="/registro">Registrate</v-btn>
            <v-btn class="white--text" flat router-link to="/login">Iniciar sesion</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    export default {
        name: "app-toolbar"
    }
</script>

 
<style>
    #text {
        font-size: 40px;
    }
    
    #toolbar {
        height: 56px;
    }
</style>