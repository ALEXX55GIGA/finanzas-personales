<template>
    <div class="dashboard-container">
        <h1 class="dashboard-title">Finanzas  Dashboard</h1>
        <h2 v-if="user" class="welcome-message">BIENVENIDO, {{ user.displayName }}</h2>

        <div v-if="chartData && chartData.labels.length > 0" class="chart-container">
            <BarChart :chartData="chartData" />
        </div>

        <div class="stats-container">
            <div class="stat-box">
                <h3>Total ingresos</h3>
                <p>$15,000</p>
            </div>
            <div class="stat-box">
                <h3>Total gastos </h3>
                <p>$8,500</p>
            </div>
            <div class="stat-box">
                <h3>Ahorros</h3>
                <p>$6,500</p>
            </div>
        </div>
    </div>
</template>

<style scoped>

.dashboard-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background: linear-gradient(135deg, #f0f5fa, #e0ebf5);
    border-radius: 10px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
    max-width: 1000px;
    margin: 2rem auto;
}


.dashboard-title {
    font-size: 2.5rem;
    color: #1d3557;
    margin-bottom: 1rem;
    font-weight: bold;
    text-align: center;
}


.welcome-message {
    font-size: 1.2rem;
    color: #457b9d;
    margin-bottom: 2rem;
}


.chart-container {
    width: 100%;
    max-width: 800px;
    background-color: white;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
}


.stats-container {
    display: flex;
    gap: 1.5rem;
    width: 100%;
    max-width: 800px;
    justify-content: space-between;
}

/* Stat Box */
.stat-box {
    flex: 1;
    background-color: #a8dadc;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    color: #1d3557;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s, box-shadow 0.2s;
}

.stat-box:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
}

/* Stat Titles */
.stat-box h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #1d3557;
    margin-bottom: 0.5rem;
}

/* Stat Values */
.stat-box p {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1d3557;
}

/* Responsive Design */
@media (max-width: 768px) {
    .stats-container {
        flex-direction: column;
        align-items: center;
    }

    .stat-box {
        width: 100%;
        margin-bottom: 1rem;
    }
}
</style>



<script setup >
import {useAuth } from "@/composables/useAuth.js";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import { onMounted, ref } from 'vue'
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import BarChart  from "../components/BarChart.vue";


const { user } = useAuth()

const chartData = ref({
    labels: [],
    datasets: [
        {
            label: "gastos",
            backgroundColor: "#ff3333",
            data: []

        },
        {
            label: "ingresos",
            backgroundColor: "#c1ff33",
            data: [] 
        }
    ]

})

// inicializo la base de datos
const db = getDatabase();

// funcion para obtener los datos de las transacciones
const fetchData = (userUid) => {
    //referencia a las transacciones del ususario registrado
    const transactionsRef = dbRef(db, `transactions/${userUid}`);   

    onValue(transactionsRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) return console.log("no hay datos");

        const labels = []
        const ingresos = []
        const gastos = []

        for ( const key in data) {
            const { type, amount, date } = data[key]
            labels.push(new Date(date).toLocaleDateString()) 

            if (type === 'ingresos') {
                ingresos.push(amount)
            } else if (type === 'gasto') {
                gastos.push(amount)
            }
        }

        chartData.value.labels = labels
        chartData.value.datasets[0].data = gastos
        chartData.value.datasets[1].data = ingresos
        
        
    })
    
}
onMounted(() => {
    onAuthStateChanged (auth, (user) => {  
        if (user) {
            const userUid = auth.currentUser.uid
            fetchData(userUid)
        } else {
            console.log("no hay usuario autenticado");
        }


    })

})



</script>

