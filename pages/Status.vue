<script setup>
import useUserStore from '~/store/useUserStore.js';
import { ref } from 'vue';
import { watchEffect } from 'vue';
import Menu from '~/components/Menu.vue';
import Profile from '~/components/Profile.vue';
definePageMeta({
    middleware:'auth'
});


const secureRouter = 'http://localhost:3001/api/secure';
const statusRouter = 'http://localhost:3001/api/status';
const token = useCookie('token');
const myRequest = ref([]);

const requests = async () => {
    const response = await fetch(secureRouter, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token.value}`
        }
    });

    const data = await response.json();

    if (response.ok) {
        const request = await fetch(statusRouter, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: data.token.id })
        });

        const dataRequest = await request.json();
        myRequest.value = dataRequest.requestUser
    }
}

watchEffect(() => {
    requests();
})
</script>

<template>
    <section>
        <Profile />
        <section class="w-screen h-[77vh] overflow-y-auto absolute top-0 lg:w-[70%] lg:ml-[30%] lg:h-[100vh]">
            <div v-for="(request, index) in myRequest.filter(req => req.status === 'pendente')" :key="index"
                class="bg-white rounded-2xl shadow-lg p-6 mb-6 transition-transform transform hover:shadow-xl">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <!-- Data Solicitação -->
                    <div class="space-y-1">
                        <label class="block text-sm font-semibold text-gray-700">Data Solicitação:</label>
                        <input type="text" disabled v-model="request.date"
                            class="w-full bg-gray-100 rounded-md p-3 text-gray-600 cursor-not-allowed border border-gray-200">
                    </div>

                    <!-- Status -->
                    <div class="space-y-1">
                        <span class="block text-sm font-semibold text-gray-700">Status:</span>
                        <span :class="{
                            'bg-green-100 text-green-800': request.status === 'concluído',
                            'bg-yellow-100 text-yellow-800': request.status === 'pendente',
                            'bg-blue-100 text-blue-800': request.status === 'em andamento'
                        }" class="inline-block px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                            {{ request.status }}
                        </span>
                    </div>
                </div>

                <!-- Tipo de Serviço -->
                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                    <span class="text-gray-600">Tipo de Serviço: </span> {{ request.type_service }}
                </h3>

                <!-- Descrição -->
                <h4 class="text-sm font-semibold text-gray-700">Serviço que será executado:</h4>
                <textarea disabled v-model="request.description"
                    class="w-full bg-gray-100 rounded-md p-3 text-gray-600 resize-none cursor-not-allowed border border-gray-200"
                    rows="4"></textarea>
            </div>
        </section>
        <Menu />
    </section>
</template>