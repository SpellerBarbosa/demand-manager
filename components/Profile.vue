<script setup>
import { watchEffect } from 'vue';
import { ref } from 'vue';
const token = useCookie('token')

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
    <section class="w-screen h-[15vh] bg-blue-400 flex">
        <figure class="w-[30%] flex items-center justify-center">
            <img src="~/assets/img/logo.png" alt="Logo" class="">
        </figure>

        <article class="">
            <h1 class="text-xl text-center uppercase">Gesto de demandas</h1>
            <div>
                <p class="capitalize">Bem vindo, <span>{{ user }}</span></p>
                <p class="capitalize">setor: <span>{{ sector }}</span></p>
                <p class="uppercase">{{ role }}</p>
            </div>
        </article>
    </section>
</template>