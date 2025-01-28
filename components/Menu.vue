<script setup>
import { ref } from 'vue';
import useMenuStore from '~/store/useMenuStore';

const token = useCookie('token')
const useMenu = useMenuStore();
const url = "http://localhost:3001/api/secure";
let id = ref('');
let user = ref('');
let sector = ref('');
let role = ref('');

onMounted(() => {
    watchEffect(async () => {
        try {

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token.value}`
                }
            })

            const data = await response.json();

            if(response.ok){
                id.value = data.token.id;
                user.value = data.token.user;
                sector.value = data.token.sector;
                role.value = data.token.role;
                return
            }

        } catch (error) {
            throw new Error(error.message);
        }
    })
})


</script>

<template>
    <nav class="w-full h-16 bg-blue-500 shadow-lg">
        <ul class="w-full h-full flex justify-around items-center">
            <!-- Home -->
            <li 
                class="flex flex-col items-center justify-center text-white cursor-pointer hover:bg-blue-600 p-2 rounded-md transition-all duration-300"
                @click="useMenu.setMenu('home')">
                <img class="w-6 h-6" src="~/assets/img/home.png" alt="Home">
                <span class="text-xs mt-1">Home</span>
            </li>

            <!-- Cadastro -->
            <li 
                v-if="role === 'admin'"
                class="flex flex-col items-center justify-center text-white cursor-pointer hover:bg-blue-600 p-2 rounded-md transition-all duration-300"
                @click="useMenu.setMenu('signup')">
                <img class="w-6 h-6" src="~/assets/img/cadastro.png" alt="Cadastro">
                <span class="text-xs mt-1">Cadastro</span>
            </li>

            <!-- Solicitações -->
            <li 
                v-if="role !== 'motoboy' && role !== 'funcionario'"
                class="flex flex-col items-center justify-center text-white cursor-pointer hover:bg-blue-600 p-2 rounded-md transition-all duration-300"
                @click="useMenu.setMenu('requests')">
                <img class="w-6 h-6" src="~/assets/img/solicitacoes.png" alt="Solicitações">
                <span class="text-xs mt-1">Solicitações</span>
            </li>

            <!-- Solicitar -->
            <li 
                v-if="role !== 'admin' && role !== 'motoboy'"
                class="flex flex-col items-center justify-center text-white cursor-pointer hover:bg-blue-600 p-2 rounded-md transition-all duration-300"
                @click="useMenu.setMenu('requests')">
                <img class="w-6 h-6" src="~/assets/img/solicitacao.png" alt="Solicitar">
                <span class="text-xs mt-1">Solicitar</span>
            </li>

            <!-- Status -->
            <li 
                class="flex flex-col items-center justify-center text-white cursor-pointer hover:bg-blue-600 p-2 rounded-md transition-all duration-300">
                <img class="w-6 h-6" src="~/assets/img/status.png" alt="Status">
                <span class="text-xs mt-1">Status</span>
            </li>

            <!-- Agenda -->
            <li 
                v-if="role === 'motoboy'"
                class="flex flex-col items-center justify-center text-white cursor-pointer hover:bg-blue-600 p-2 rounded-md transition-all duration-300">
                <img class="w-6 h-6" src="~/assets/img/agenda.png" alt="Agenda">
                <span class="text-xs mt-1">Agenda</span>
            </li>
        </ul>
    </nav>
</template>
