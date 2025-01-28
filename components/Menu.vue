<script setup>
import { ref } from 'vue';
import useMenuStore from '~/store/useMenuStore';

const token = useCookie('token')
const useMenu = useMenuStore();
const url = "http://localhost:3001/api/secure";
const id = ref('');
const user = ref('');
const sector = ref('');
const role = ref('');

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
    <nav class="w-screen h-[10vh] bg-blue-400 fixed bottom-0">
        <ul class="w-full h-full flex">
            <li class="w-[calc(100%/3)] flex flex-col items-center justify-center cursor-pointer" @click="useMenu.setMenu('home')">
                <img class="w-7" src="~/assets/img/home.png" alt="imagem home">
                Home
            </li>
            <li class="w-[calc(100%/3)] flex flex-col items-center justify-center cursor-pointer"
                :class="{ 'hidde': role !== 'admin' }" @click="useMenu.setMenu('signup')">
                <img class="w-7" src="~/assets/img/cadastro.png" alt="imagem home">
                Cadastro
            </li>
            <li class="w-[calc(100%/3)] flex flex-col items-center justify-center cursor-pointer"
                :class="{ 'hidde': role === 'motoboy' || role === 'funcionario' }">
                <img class="w-7" src="~/assets/img/solicitacoes.png" alt="imagem solicitações">
                Solicitações
            </li>
            <li :class="{'hidden': role === 'admin' || role === 'motoboy'}">
                Solicitar
            </li>
            <li class="w-[calc(100%/3)] flex flex-col items-center justify-center cursor-pointer">
                <img class="w-7" src="~/assets/img/status.png" alt="imagem status">
                Status
            </li>
            <li :class="{ 'hidden': role !== 'motoboy' }">
                <img class="w-7" src="~/assets/img/agenda.png" alt="imagem agenda">
                Agenda
            </li>
        </ul>
    </nav>
</template>