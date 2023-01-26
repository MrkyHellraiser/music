  import { defineStore, acceptHMRUpdate } from "pinia";
  import { auth, usersCollection } from "@/includes/firebase";
  // stores/counter.js
  import { ref } from "vue";
  export const useModalStore = defineStore("modal", () => {
    
    let isOpen = ref(false);
    
    return {
        isOpen,
    };
  });
  
  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useModalStore, import.meta.hot));
  }
  