<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const user = ref("");
const password = ref("");
const buttonText = ref("");
const msgError = ref("");
const msgSuccess = ref("");
const url = "http://localhost:3001/api/login";
const secureRouter = 'http://localhost:3001/api/secure';
const router = useRouter()
const token = useCookie("token", {
    maxAge: 60 * 60,
    sameSite: 'strict',
    secure: true,
    path:'/'
});
let ativo = ref(false);

const handleLogin = async () => {
    if (!user.value) {
        msgError.value = "Digite seu usuario";
        setTimeout(() => {
            msgError.value = ""
        }, 3000);
        return;
    }

    if (!password.value) {
        msgError.value = "Digite sua senha";
        setTimeout(() => {
            msgError.value = ""
        }, 3000);
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            user: user.value.toLowerCase().trim(),
            password: password.value.trim()
        })
    });

    const receiveData = await response.json()

    if (response.ok) {
        msgSuccess.value = receiveData.msg;
        ativo.value = true;
       token.value = receiveData.token
       
       setTimeout(() => {
           msgSuccess.value = "";
           user.value = "";
           password.value = "";
           ativo.value = false
       }, 3000);
       
       const sendToken = await fetch(secureRouter,{
            method:"POST",
            headers:{
                'Authorization':`Bearer ${token.value}`
            }
       })

       const dataSecure = await sendToken.json();

       if(dataSecure){
        setTimeout(() => {
            router.push("/home")
        }, 3000);
       }


    }else{
        msgError.value = receiveData.msg;
        setTimeout(() => {
            msgError.value = ""
        }, 3000);
    }
}

</script>

<template>    
    <section class="w-screen h-screen bg-blue-400 flex flex-col items-center justify-center lg:flex-row">

        <figure class="w-[80%] h-[43vh] flex items-center justify-center md:h-[40vh]">
            <img src="~/assets/img/logo.png" alt="Logo" class=" w-[100%] md:w-[90%]">
        </figure>
        <form class="w-[95%] h-[55vh] flex flex-col items-center justify-center bg-white rounded-3xl lg:h-[100%] lg:rounded-none"
            @submit.prevent="handleLogin()">
            <label for="user" class="flex tracking-wider  flex-col w-[90%] text-lg font-medium mb-5 uppercase">Usuario
                <input type="text" placeholder="Digite seu usuario" id="user"
                    class="mt-3 border-b-2 border-blue-300 text-center text-lg tracking-wider outline-none"
                    v-model="user">
            </label>
            <label for="password" class=" tracking-wider flex flex-col w-[90%] text-lg font-medium mb-5 uppercase">Senha
                <input type="password" placeholder="Digite sua senha" id="password"
                    class="mt-3 border-b-2 border-blue-300 text-center text-lg tracking-wider outline-none"
                    v-model="password">
            </label>
            <button
                class="w-[40%] h-11 mt-5 bg-blue-400 rounded-xl font-bold tracking-wider text-white hover:rounded-3xl lg:w-[30%]"
                :disabled="ativo">{{ ativo ? buttonText = "Carregando..." : buttonText = "Entrar" }}</button>
        </form>
        <span
            class="w-[90%] h-[6vh] bg-red-500 absolute top-2 rounded-3xl overflow-hidden text-white flex items-center justify-center animate-popup lg:w-[40%]"
            v-if="msgError">{{ msgError }}
            <div class="w-screen h-1 bg-white absolute bottom-0 animate-regressive"></div>
        </span>
        <span
            class="w-[90%] h-[6vh] bg-green-500 absolute top-2 rounded-3xl overflow-hidden text-white flex items-center justify-center animate-popup lg:w-[40%]"
            v-if="msgSuccess">{{ msgSuccess }}
            <div class="w-screen h-1 bg-white absolute bottom-0 animate-regressive"></div>
        </span>
    </section>
</template>