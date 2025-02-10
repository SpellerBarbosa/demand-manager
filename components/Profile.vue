<script setup>
import { watchEffect } from 'vue';
import { ref } from 'vue';
import useUserStore from '~/store/useUserStore';

const token = useCookie('token')
const userStore = useUserStore();
const url = "http://localhost:3001/api/secure";
const id = ref('');
const user = ref('');
const sector = ref('');
const role = ref('');


watchEffect(async () => {
    try {

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })

        const data = await response.json();
        if (response.ok) {
            id.value = data.token.id;
            user.value = data.token.user;
            sector.value = data.token.sector;
            role.value = data.token.role;
            userStore.setUser(data.token.id, data.token.user, data.token.sector, data.token.role)
            return
        }

    } catch (error) {
        console.error(error);
    }
})

</script>

<template>
    <section class="w-full h-[15vh] bg-blue-500 flex items-center px-4 md:px-8 lg:w-[30%] lg:border-b-1 lg: lg:h-[30vh]">
        <!-- Logo -->
        <figure class="w-1/4 md:w-1/6 flex items-center justify-center">
            <img src="~/assets/img/logo.png" alt="Logo" class="w-16 h-16 object-contain">
        </figure>

        <!-- Informações do Usuário -->
        <article class="flex-1 flex flex-col justify-center space-y-2 text-white">
            <h1 class="text-lg md:text-2xl text-center uppercase font-bold">Gestão de Demandas</h1>
            <div class="text-sm md:text-base text-center md:text-left">
                <p class="capitalize">
                    Bem-vindo, <span class="font-semibold">{{ user }}</span>
                </p>
                <p class="capitalize">
                    Setor: <span class="font-semibold">{{ sector }}</span>
                </p>
                <p class="uppercase font-medium">
                    {{ role }}
                </p>
            </div>
        </article>
    </section>
</template>
