<script setup>
import { ref } from 'vue'
import {getDatabase, ref as dbRef, push } from "firebase/database";
import { auth } from '../firebase.js'



const type = ref('ingresos')
const amount = ref(0)
const db = getDatabase();


const addTransaction = async () => {
    const user = auth.currentUser
    if(user && amount.value != null){
        const transactionsRef = dbRef(db, `transactions/${user.uid}`);
                                          
    
    const newTransaction = {
        type: type.value,
        amount: amount.value,
        date: new Date().toISOString().slice(0,10),
        userId: user.uid
    }
    await push(transactionsRef, newTransaction)
    alert('transaccion añadida')
    amount.value = null
    } else {
        alert('Debes ingresar una cantidad valida')
    }
}

</script>


<template>
    <div class="add-transaction-container">
        <h1 class="form-title">Añadir Transacción</h1>
        <form @submit.prevent="addTransaction" class="transaction-form">
            <div class="form-group">
                <label for="transaction-type">Tipo de Transacción</label>
                <select v-model="type" id="transaction-type" class="form-control">
                    <option value="ingresos">Ingreso</option>
                    <option value="gasto">Gasto</option>
                </select>
            </div>

            <div class="form-group">
                <label for="amount">Cantidad</label>
                <input v-model="amount" type="number" required class="form-control" id="amount" placeholder="Ingrese la cantidad">
            </div>

            <button type="submit" class="submit-button">Agregar Transacción</button>
        </form>
    </div>
</template>


<style scoped>

/* Contenedor principal */
.add-transaction-container {
    max-width: 500px;
    margin: 2rem auto;
    padding: 2rem;
    background: #f7fafc;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

/* Título del formulario */
.form-title {
    font-size: 2rem;
    color: #1d3557;
    text-align: center;
    margin-bottom: 1.5rem;
    font-weight: bold;
}

/* Formulario */
.transaction-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
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

/* Input y Select */
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

/* Diseño responsivo */
@media (max-width: 600px) {
    .add-transaction-container {
        padding: 1.5rem;
    }
}

</style>