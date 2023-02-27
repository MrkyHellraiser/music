<template>
  <app-header />

  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component"></component>
    </transition>
  </router-view>

  <app-player />

  <app-auth />
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue";
import AppAuth from "@/components/AppAuth.vue";
import AppPlayer from "@/components/AppPlayer.vue";
import { useUserStore } from "./stores/user";
import { auth } from "./includes/firebase";
import { onMounted } from "vue";

const userStore = useUserStore();

onMounted(() => {
  if (auth.currentUser) {
    userStore.userLoggedIn = true;
  }
});
</script>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
