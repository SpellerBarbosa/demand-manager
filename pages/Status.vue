<script setup>
import useUserStore from '~/store/useUserStore.js';
import { ref } from 'vue';
import { watchEffect } from 'vue';
import Menu from '~/components/Menu.vue';
import Profile from '~/components/Profile.vue';


const secureRouter = 'http://localhost:3001/api/secure';
const statusRouter = 'http://localhost:3001/api/status';
const token = useCookie('token');

const requests = async() =>{
    const response = await fetch(secureRouter,{
        method:'POST',
        headers:{
            'Authorization': `Bearer ${token.value}`
        }
    });

    const data = await response.json();
    console.log(data.token.id);
    if(response.ok){
        const request = await fetch(statusRouter,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({id: data.token.id})
        });

        const dataRequest = await request.json();

        console.log(dataRequest);
    }
}

watchEffect(()=>{
    requests();
})
</script>

<template>
    <section>
        <Profile />
        <Menu />
    </section>
</template>