<script setup>
    import { watchEffect } from 'vue';


    const url = 'http://localhost:3001/api/requests';

    watchEffect(async ()=>{
        const response = await fetch(url,{
            method:'GET',
            headers:{
                'Content-Type' : 'application/json'
            },
        });
        
        const data = await response.json();
        console.log(data);
    })
</script>

<template>
    <section class="w-scree h-[75vh]">
        <h1>Solicitações recebidas</h1>
    </section>
</template>