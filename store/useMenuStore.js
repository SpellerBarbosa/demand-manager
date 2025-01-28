import { defineStore } from "pinia";

const useMenuStore = defineStore('menu',{
    state:() =>({
        startMenu: "home"
    }),
    actions:{
        setMenu(startMenu){
            this.startMenu = startMenu
        }
    }
})

export default useMenuStore;