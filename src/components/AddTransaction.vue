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
    <h1>añadir transacción</h1>
    <form @submit.prevent ="addTransaction">
        <div>
            <label style="margin-right: 5px">tipo de transacción</label>
            <select v-model="type" id="">
                <option value="ingresos">ingreso</option>
                <option value="gasto">gasto</option>
            </select>
        </div>

        <div>
            <label style="margin-right: 5px">cantidad</label>
            <input v-model="amount" type="number" required>
        </div>
        <button type="submit">agregar transaccion</button>
   </form>
</template>