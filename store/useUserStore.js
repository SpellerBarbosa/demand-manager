import { defineStore } from "pinia";
import { useCookie } from "#app";



const useUserStore = defineStore('user',{
    state: () =>({
        user: null,
    }),
    actions:{
        async fetchUser(){
            if(!this.user){
               try {
                const token = useCookie('token');
                
                const response = await fetch("http://localhost:3001/api/secure",{
                    method:"POST",
                    headers:{
                        "Authorization" : `Bearer ${token.value}`
                    }
                });
                
                if(!response.ok){
                    throw new Error(`Erro na API: ${response.statusText}`);
                }

                const data = await response.json();
                this.user = data.token

               } catch (error) {
                    console.log(`Erro ao buscar o usuario: ${error.message}`);
               }
            }
        }
    }
})

export default useUserStore;