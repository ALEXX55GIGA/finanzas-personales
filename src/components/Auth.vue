<script setup>
    import {ref} from 'vue'
    import { useRouter } from 'vue-router'
    import { useAuth } from '@/composables/useAuth.js'
    //import { update } from 'firebase/database';

    const isLogin = ref (true)
    const email = ref ('')
    const password = ref ('')
    const username = ref ('')
    const router = useRouter()

    const { login, register, signInWithGoogle } = useAuth()


    const toggleAuth = () => {
        isLogin.value = !isLogin.value
    }

    const handlesubmit = async () => {
        try{
            if(isLogin.value){
                await login( email.value, password.value)
            } else {
                await register( email.value, password.value, username.value ) 
            }
            router.push('/')
        } catch (error) {
            
        }

    };

</script>

<template>
    <div> 
        <h1>{{ isLogin ? "iniciar sesion" : "registro"}}</h1>
        <form @submit.prevent="handlesubmit">
            <div class="inputs"> 

                <div v-if="!isLogin">
                    <label for="username">Username</label>
                    <input id="username" v-model="username" type="text"required>
                </div>

                <div>
                    <label for="email">Email</label>
                    <input id="email" v-model="email" type="email"required>
                </div>

                <div>
                    <label for="password">password</label>
                    <input id="password" v-model="password" type="password" minlength="6" required>
                </div>
                <button @click="signInWithGoogle">Iniciar sesion con Google</button>

            </div>
            <button type="submit">{{ isLogin ? "iniciar sesion" : "registrarse"}}</button>
        </form>


        <p @click="toggleAuth" style="cursor: pointer;">
            {{ isLogin ? "aun no tienes una cuenta" : "ya tienes cuenta? inicia sesion" }}
        </p>
    </div>
</template>

<style scoped>
.inputs{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem 8rem 1rem ;
}
input{
    width: 100%;
    padding: 0.6rem;
}
label{
    display: block;
    text-align: left;
}

</style>