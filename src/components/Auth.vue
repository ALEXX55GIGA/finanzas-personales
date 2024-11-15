<script setup>
    import {ref} from 'vue'
    import { useRouter } from 'vue-router'
    import { useAuth } from '@/composables/useAuth.js'
    

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
    <div class="auth-container">
        <h1 class="auth-title">{{ isLogin ? "Iniciar Sesión" : "Registro" }}</h1>
        <form @submit.prevent="handlesubmit" class="auth-form">
            <div class="form-group" v-if="!isLogin">
                <label for="username">Nombre de Usuario</label>
                <input id="username" v-model="username" type="text" required class="form-control" placeholder="Ingresa tu nombre de usuario">
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" v-model="email" type="email" required class="form-control" placeholder="Ingresa tu email">
            </div>

            <div class="form-group">
                <label for="password">Contraseña</label>
                <input id="password" v-model="password" type="password" minlength="6" required class="form-control" placeholder="Ingresa tu contraseña">
            </div>

            <button type="submit" class="submit-button">{{ isLogin ? "Iniciar Sesión" : "Registrarse" }}</button>
            
            <button type="button" class="google-button" @click="signInWithGoogle">Iniciar Sesión con Google</button>
        </form>

        <p @click="toggleAuth" class="toggle-auth">
            {{ isLogin ? "¿Aún no tienes una cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión" }}
        </p>
    </div>
</template>

<style scoped>
/* Contenedor principal */
.auth-container {
    max-width: 500px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #f7fafc;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

/* Título */
.auth-title {
    font-size: 2rem;
    color: #1d3557;
    text-align: center;
    margin-bottom: 1.5rem;
    font-weight: bold;
}

/* Formulario */
.auth-form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}

/* Grupo de formulario */
.form-group {
    display: flex;
    flex-direction: column;
}

/* Etiquetas */
.form-group label {
    font-size: 1.1rem;
    color: #457b9d;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

/* Input */
.form-control {
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #a8dadc;
    border-radius: 8px;
    background-color: #fff;
    color: #1d3557;
    outline: none;
    transition: all 0.3s ease;
}

.form-control:focus {
    border-color: #457b9d;
    box-shadow: 0 0 5px rgba(69, 123, 157, 0.3);
}

/* Botón de envío */
.submit-button {
    padding: 0.8rem;
    font-size: 1.2rem;
    color: #fff;
    background-color: #1d3557;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.submit-button:hover {
    background-color: #457b9d;
}

/* Botón de Google */
.google-button {
    padding: 0.8rem;
    font-size: 1.1rem;
    color: #1d3557;
    background-color: #ffffff;
    border: 1px solid #1d3557;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    margin-top: 1rem;
}

.google-button:hover {
    background-color: #f1f1f1;
}

/* Enlace de alternar autenticación */
.toggle-auth {
    font-size: 1rem;
    color: #457b9d;
    text-align: center;
    cursor: pointer;
    margin-top: 1rem;
    transition: color 0.3s ease;
}

.toggle-auth:hover {
    color: #1d3557;
}
</style>
