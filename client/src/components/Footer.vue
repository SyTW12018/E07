<template>
    <v-footer height="auto" fixed color="indigo">
        <v-layout id="footer" justify-center row wrap>
            &copy;2018 — <strong>GamerIn</strong>
            <v-btn v-for="link in links" :key="link" color="white" flat round>
                {{ link }}
            </v-btn>
        </v-layout>
    </v-footer>
</template>

<script>
    export default {
        name: "Footer",
        data: () => ({
            links: [
                "Sobre nosotros",
                "Condiciones de uso",
                "Contactanos",
                "Política de privacidad",
                "Política de copyright"
            ]
        })
    };
</script>

<style>
    #footer {
        height: 55px;
    }
</style>
