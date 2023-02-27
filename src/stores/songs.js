import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
export const useSongsStore = defineStore("songs", () => {
 
  let songs = ref([]);
  return {
    songs,
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSongsStore, import.meta.hot));
}
