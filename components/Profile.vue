<script setup>
import useUserStore from '~/store/useUserStore';

const useStore = useUserStore();

onMounted(async()=>{
    await useStore.fetchUser();
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
                    <p class="capitalize">Bem vindo, <span>{{ useStore.user.user }}</span></p>
                    <p class="capitalize">setor: <span>{{ useStore.user.sector }}</span></p>
                    <p class="uppercase">{{ useStore.user.role }}</p>
                </div>
            </article>
    </section>
</template>