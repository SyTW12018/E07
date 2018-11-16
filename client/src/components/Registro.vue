<template>
    <v-container id="contenedor">
        <v-form ref="form" v-model="valid" lazy-validation id="form">
            <h2>Registrate ya!</h2>
            <v-text-field id="text-field" v-model="name" :rules="nameRules" :counter="10" label="Nombre" required></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-text-field v-model="password" :rules="passwordRules" :counter="10" label="Contraseña" required></v-text-field>
            <v-checkbox v-model="checkbox" :rules="[v => !!v ||'']" label="Al hacer clic en unirte, aceptas las Condiciones de uso, la Política de privacidad y la Política de cookies de GamerIn." required></v-checkbox>
            <v-btn :disabled="!valid" @click="submit">
                Unete ahora
            </v-btn>
            <v-btn @click="clear">Borrar</v-btn>
        </v-form>
    </v-container>
</template>
 
<style>
    #contenedor {
        src: "logo.png";
        max-width: 100%;
        padding-top: 500px;
        background-color: rgba(235, 233, 249, 1);
    }
    
    h2 {
        font-size: 30px;
        font-family: "Avenir";
        padding-top: -30px;
    }
    
    #form {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 570px;
        margin-left: -300px;
        margin-top: -230px;
        padding-left: 100px;
        padding-right: 100px;
        padding-bottom: -100px;
        font-family: "Avenir";
        background: rgba(183, 222, 237, 1);
    }
    
    #text-field {
        padding-top: -35px;
    }
</style>
 
<script>
    export default {
        name: "Registro",
        data: () => ({
            valid: true,
            name: "",
            nameRules: [
                v => !!v || "Campo vacío.Por favor rellenelo",
                v =>
                (v && v.length <= 20) ||
                "Nombre incorrecto.Debe contener menos de 20 caracteres"
            ],
            email: "",
            emailRules: [
                v => !!v || "Campo vacío.Por favor rellenelo",
                v =>
                /.+@.+/.test(v) ||
                "No reconocemos la dirección de email. Vuelve a intentarlo."
            ],
            password: "",
            passwordRules: [
                v => !!v || "Campo vacío.Por favor rellenelo",
                v => /.+@.+/.test(v) || "Contraseña incorrecta.Vuelve a intentarlo."
            ],
            select: null,
            checkbox: false
        }),
    
        methods: {}
    };
</script>