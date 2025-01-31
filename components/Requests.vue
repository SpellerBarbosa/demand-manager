<script setup>
import { watchEffect } from 'vue';
import { ref } from 'vue';


const url = 'http://localhost:3001/api/requests';
const requests = ref([]);


onMounted(() => {
    watchEffect(async () => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();

        if (response.ok) {
            requests.value = data.requests.filter(req => req.status === 'aguardando');
            console.log(requests.value)
        }
    })
})

</script>

<template>
    <section class="w-screen min-h-[75vh] p-6 bg-gray-50">
        <h1 class="text-3xl font-bold text-center mt-5 text-gray-800 mb-8">Solicitações recebidas</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <form v-for="(request, index) in requests" :key="index"
                class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div class="space-y-4">

                    <div>
                        <label for="data-solicitacao" class="block text-sm font-medium text-gray-700">ID da
                            solicitação:</label>
                        <input type="text" id="data-solicitacao" disabled v-model="request.id"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 text-gray-700">
                    </div>
                    <div>
                        <label for="data-solicitacao" class="block text-sm font-medium text-gray-700">Data
                            solicitação:</label>
                        <input type="text" id="data-solicitacao" disabled v-model="request.date"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 text-gray-700">
                    </div>
                    <div>
                        <label for="solicitante" class="block text-sm font-medium text-gray-700">Solicitante:</label>
                        <input type="text" id="solicitante" disabled v-model="request.usuario.userName"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 text-gray-700">
                    </div>
                    <div>
                        <label for="tipo-servico" class="block text-sm font-medium text-gray-700">Tipo de
                            serviço:</label>
                        <input type="text" id="tipo-servico" disabled v-model="request.type_service"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 text-gray-700">
                    </div>
                    <div>
                        <label for="descricao" class="block text-sm font-medium text-gray-700">Descrição:</label>
                        <textarea id="descricao" disabled v-model="request.description"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 text-gray-700"></textarea>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-700">Status: <span
                                :class="{ 'text-green-600': request.status === 'entregue', 'text-red-600': request.status === 'pendente', 'text-yellow-600': request.status === 'aguardando' }">{{
                                request.status }}</span></p>
                    </div>
                    <div>
                        <label for="planned" class="block text-sm font-medium text-gray-700">Agendar:</label>
                        <input type="date" id="planned"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-700">
                    </div>
                    <div>
                        <label for="new_status" class="block text-sm font-medium text-gray-700">Mudar status:</label>
                        <select id="new_status"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-700">
                            <option value="" disabled selected>Selecione um status</option>
                            <option value="pendente">PENDENTE</option>
                            <option value="cancelar">CANCELADO</option>
                        </select>
                    </div>
                    <div>
                        <button
                            class="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300">
                            Agendar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>
