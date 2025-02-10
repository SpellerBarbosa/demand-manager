<script setup>
import { ref } from 'vue';
import useUserStore from '~/store/useUserStore';
import Menu from '~/components/Menu.vue';
import Profile from '~/components/Profile.vue';
definePageMeta({
    middleware:'auth'
});


const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const formattedMonth = month < 10 ? `0${month}` : month.toString();
const year = date.getFullYear();
const dateRequest = `${day}/${formattedMonth}/${year}`;
const type_service = ref("");
const description = ref("");
const userStore = useUserStore();
const msgError = ref("");
const msgSuccess = ref("");
const url = 'http://localhost:3001/api/request';

const handleRequest = async () =>{
    if(!type_service.value){
        msgError.value = "Selecione o tipo do serviço.";
        setTimeout(() => {
            msgError.value = ""
        }, 2000);
        return
    }

    if(!description.value){
        msgError.value = "Descreva o que será feito.";
        setTimeout(() => {
            msgError.value = ""
        }, 2000);
        return
    }

    const response = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({
            date: dateRequest,
            type_service: type_service.value.toLowerCase().trim(),
            description: description.value.toLowerCase().trim(),
            userId: userStore.userId,
        })
    })
    
    const data = await response.json();

    if(response.ok){
        msgSuccess.value = data.msg;
        setTimeout(() => {
            msgSuccess.value = '';
        }, 2000);
        return;
    }else{
        msgError.value = data.msg;
        setTimeout(() => {
            msgError.value = '';
        }, 2000);
        return;
    }

}


</script>

<template>
    <Profile/>
    <section class="w-full min-h-[77vh] bg-gray-200 flex items-center justify-center p-4 absolute top-0 lg:w-[70%] lg:ml-[30%] lg:h-[100vh]">
        <form class="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 flex flex-col space-y-6" @submit.prevent="handleRequest()" >
            <!-- Título -->
            <h1 class="text-center text-2xl sm:text-3xl font-bold tracking-wide text-gray-700">Solicitar</h1>
            
            <!-- Data da Solicitação -->
            <label for="date_request" class="flex flex-col">
                <span class="text-gray-600 text-sm sm:text-base font-medium mb-1">Data da Solicitação:</span>
                <input 
                    type="text" 
                    id="date_request" 
                    placeholder="MM/DD/AAAA"
                    class="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    disabled
                    v-model="dateRequest"
                />
            </label>

            <!-- Tipo de Serviço -->
            <label for="type_service" class="flex flex-col">
                <span class="text-gray-600 text-sm sm:text-base font-medium mb-1">Tipo do Serviço:</span>
                <select 
                    name="type_service" 
                    id="type_service"
                    class="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    v-model="type_service"
                >
                    <option value="" disabled selected>Selecione</option>
                    <option value="coleta">Coleta</option>
                    <option value="entrega">Entrega</option>
                </select>
            </label>

            <!-- Descrição do Serviço -->
            <label for="description_service" class="flex flex-col">
                <span class="text-gray-600 text-sm sm:text-base font-medium mb-1">Descrição:</span>
                <textarea 
                    name="description_service" 
                    id="description_service" 
                    placeholder="Descreva sua solicitação"
                    class="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 h-32 resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    v-model="description"
                ></textarea>
            </label>
            <!-- Botão -->
            <button 
                type="submit" 
                class="w-full bg-blue-500 text-white text-lg font-medium py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            >
                Solicitar
            </button>
        </form>
        <span
            class="w-[90%] h-[6vh] bg-red-500 absolute top-2 rounded-3xl overflow-hidden text-white flex items-center justify-center animate-popup lg:w-[40%]"
            v-if="msgError">{{ msgError }}
            <div class="w-screen h-1 bg-white absolute bottom-0 animate-regressive"></div>
        </span>
        <span
            class="w-[90%] h-[6vh] bg-green-500 absolute top-2 rounded-3xl overflow-hidden text-white flex items-center justify-center animate-popup lg:w-[40%]"
            v-if="msgSuccess">{{ msgSuccess }}
            <div class="w-screen h-1 bg-white absolute bottom-0 animate-regressive"></div>
        </span>
    </section>
    <Menu />
</template>


