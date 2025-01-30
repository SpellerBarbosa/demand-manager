<script setup>
import { ref } from 'vue';
import useMenuStore from '~/store/useMenuStore';

const toggleMenu = ref(false);
const useMenu = useMenuStore()

const openMenu = () => {
    toggleMenu.value = !toggleMenu.value;
}
</script>

<template>
    <section class="w-screen h-[10vh] bg-blue-500 relative">
        <button class=" w-12 h-12  flex flex-col justify-evenly items-center absolute bottom-1 right-1" @click="openMenu">
            <span class="w-[90%] h-0.5 block bg-black transition-all duration-300"
                :class="toggleMenu ? 'translate-y-3 rotate-[42deg]' : ''"></span>
            <span class="w-[90%] h-0.5 block bg-black transition-all duration-300"
                :class="toggleMenu ? 'opacity-0 -translate-2' : 'opacity-100 translate-y-0'"></span>
            <span class="w-[90%] h-0.5 block bg-black transition-all duration-300"
                :class="toggleMenu ? '-translate-y-3 rotate-[-42deg]' : ''"></span>
        </button>
        
        <nav  class="w-[100%] h-[auto] border transition-all duration-500 ease-in-out transform absolute right-0 bottom-[10vh] shadow-lg rounded-lg bg-blue-500/85  text-white" 
             :class="toggleMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'">
            <ul class="w-full flex gap-1.5 flex-wrap justify-center transition-all duration-300"
                :class="toggleMenu ? 'flex' : 'hidden'">
                <li class="w-[75px] h-[75px]  flex flex-col-reverse items-center justify-center" @click="()=>{openMenu(); useMenu.setMenu('home')}">
                    <span>Inicio</span>
                    <img class="w-8" src="~/assets/img/home.png" alt="">
                </li>
                <li class="w-[75px] h-[75px]  flex flex-col-reverse items-center justify-center" @click="()=>{openMenu(); useMenu.setMenu('signup')}">
                    Cadastro
                    <img class="w-8" src="~/assets/img/cadastro.png" alt="">
                </li>
                <li class="w-[75px] h-[75px]  flex flex-col-reverse items-center justify-center"@click="()=>{openMenu(); useMenu.setMenu('request')}">
                    Solicitar
                    <img class="w-8" src="~/assets/img/solicitacao.png" alt="">
                </li>
                <li class="w-[75px] h-[75px]  flex flex-col-reverse items-center justify-center" @click="()=>{openMenu(); useMenu.setMenu('requests')}">
                    Solicitações
                    <img class="w-8" src="~/assets/img/solicitacoes.png" alt="">
                </li>
                <li class="w-[75px] h-[75px]  flex flex-col-reverse items-center justify-center" @click="()=>{openMenu(); useMenu.setMenu('agenda')}">
                    Agendar
                    <img class="w-8" src="~/assets/img/agenda.png" alt="">
                </li>
                <li class="w-[75px] h-[75px]  flex flex-col-reverse items-center justify-center"@click="()=>{openMenu(); useMenu.setMenu('agenda')}">
                    Agenda
                    <img class="w-8" src="~/assets/img/home.png" alt="">
                </li>
            </ul>
        </nav>
    </section>
</template>