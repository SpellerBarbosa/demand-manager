<script setup>
import { ref } from 'vue';
import useMenuStore from '~/store/useMenuStore';
import { useRouter } from 'vue-router';
import useUserStore from '~/store/useUserStore';

const toggleMenu = ref(false);
const useMenu = useMenuStore();
const useUser = useUserStore();
const router = useRouter();
const openMenu = () => {
    toggleMenu.value = !toggleMenu.value;
}
</script>

<template>
    <section class="w-screen h-[8vh] bg-blue-500 absolute">
        <button class=" w-12 h-12  flex flex-col justify-evenly items-center absolute bottom-0 right-2" @click="openMenu">
            <span class="w-[90%] h-0.5 block bg-black transition-all duration-300"
                :class="toggleMenu ? 'translate-y-3 rotate-[42deg]' : ''"></span>
            <span class="w-[90%] h-0.5 block bg-black transition-all duration-300"
                :class="toggleMenu ? 'opacity-0 -translate-2' : 'opacity-100 translate-y-0'"></span>
            <span class="w-[90%] h-0.5 block bg-black transition-all duration-300"
                :class="toggleMenu ? '-translate-y-3 rotate-[-42deg]' : ''"></span>
        </button>
        
        <nav  class="w-[100%] h-[auto] border transition-all duration-500 ease-in-out transform absolute right-0 bottom-[8vh] shadow-lg rounded-lg bg-blue-500/85  text-white" 
             :class="toggleMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'">
            <ul class="w-full flex gap-1.5 flex-wrap justify-center transition-all duration-300"
                :class="toggleMenu ? 'flex' : 'hidden'">
                <li class="w-[75px] h-[75px]  flex flex-col-reverse items-center justify-center" @click="()=>{openMenu(); router.push('/home')}">
                    <span>Inicio</span>
                    <img class="w-8" src="~/assets/img/home.png" alt="">
                </li>
                <li class="w-[75px] h-[75px]  flex flex-col-reverse items-center justify-center" 
                    @click="()=>{openMenu(); router.push('/signup')}"
                    :class="useUser.role !== 'admin' ? 'hidden': ''"
                    >
                    Cadastro
                    <img class="w-8" src="~/assets/img/cadastro.png" alt="">
                </li>
                <li class="w-[75px] h-[75px]  flex flex-col-reverse items-center justify-center"@click="()=>{openMenu(); router.push('/request')}">
                    Solicitar
                    <img class="w-8" src="~/assets/img/solicitacao.png" alt="">
                </li>
                <li class="w-[75px] h-[75px]  flex flex-col-reverse items-center justify-center" 
                    @click="()=>{openMenu(); router.push('/requests')}"
                    :class="useUser.role !== 'admin' ? 'hidden': ''"
                    >
                    Solicitações
                    <img class="w-8" src="~/assets/img/solicitacoes.png" alt="">
                </li>
                <li class="w-[75px] h-[75px]  flex flex-col-reverse items-center justify-center" @click="()=>{openMenu(); useMenu.setMenu('agenda')}">
                    Status
                    <img class="w-8" src="~/assets/img/status.png" alt="">
                </li>
                <li class="w-[75px] h-[75px]  flex flex-col-reverse items-center justify-center hidden"
                    @click="()=>{openMenu(); useMenu.setMenu('agenda')}"
                    
                    >
                    Agenda
                    <img class="w-8" src="~/assets/img/home.png" alt="">
                </li>
            </ul>
        </nav>
    </section>
</template>