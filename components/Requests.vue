<script setup>
    import { watchEffect } from 'vue';
    import { ref } from 'vue';


    const url = 'http://localhost:3001/api/requests';
    const requests = ref([])

onMounted(()=>{
    watchEffect(async ()=>{
        const response = await fetch(url,{
            method:'GET',
            headers:{
                'Content-Type' : 'application/json'
            },
        });
        
        const data = await response.json();

        if(response.ok){
           requests.value = data.requests
        }
        
        
    })
})
</script>

<template>
    <section class="w-screen h-[75vh]">
        <h1 class="text-3xl font-bold text-center mt-5 text-gray-800">Solicitações recebidas</h1>
        <article v-for="(request, index) in requests" :key="index" class="border border-gray-300 p-4 my-2 rounded-lg bg-gray-100">
            <p class="text-lg text-gray-700">Data da Solicitação: <span class="font-semibold text-gray-900">{{ request.date }}</span></p>
            <p class="text-lg text-gray-700">Solicitante: <span class="font-semibold text-gray-900">{{ request.usuario.userName }}</span></p>
            <p class="text-lg text-gray-700">Tipo de serviço: <span class="font-semibold text-gray-900">{{ request.type_service }}</span></p>
            <p class="text-lg text-gray-700">Descrição do serviço: <span class="font-semibold text-gray-900">{{ request.description }}</span></p>
            <p class="text-lg text-gray-700">Status da solicitação: <span class="font-semibold text-gray-900">{{ request.status }}</span></p>
        </article>
    </section>
</template>
