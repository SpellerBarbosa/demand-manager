<script setup>
import useUserStore from '~/store/useUserStore';

const userStore = useUserStore();

</script>

<template>
    <nav class="w-screen h-[10vh] bg-blue-400 fixed bottom-0">
        <ul class="w-full h-full flex">
            <li class="w-[calc(100%/3)] flex flex-col items-center justify-center cursor-pointer">
                <img class="w-7" src="~/assets/img/home.png" alt="imagem home">
                Home
            </li>
            <li>
                Cadastro
            </li>
            <li class="w-[calc(100%/3)] flex flex-col items-center justify-center cursor-pointer"
                :class="{ 'hidde': userStore.user.role === 'motoboy' || userStore.user.role === 'funcionario' }">
                <img class="w-7" src="~/assets/img/solicitacoes.png" alt="imagem solicitações">
                Solicitações
            </li>
            <li :class="{'hidden': userStore.user.role === 'admin' || userStore.user.role === 'motoboy'}">
                Solicitar
            </li>
            <li class="w-[calc(100%/3)] flex flex-col items-center justify-center cursor-pointer">
                <img class="w-7" src="~/assets/img/status.png" alt="imagem status">
                Status
            </li>
            <li :class="{ 'hidden': userStore.user.role !== 'motoboy' }">
                <img class="w-7" src="~/assets/img/agenda.png" alt="imagem agenda">
                Agenda
            </li>
        </ul>
    </nav>
</template>