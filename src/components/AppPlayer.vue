<template>
    <!-- Player -->
    <div
        class="fixed bottom-0 left-0 bg-black px-4 py-2 w-full">
        <!-- Track Info -->
        <div class="text-center text-white"
            v-if="current_song.modified_name">
            <span class="song-title font-bold">{{
                current_song.modified_name
            }}</span>
            by
            <span class="song-artist">{{
                current_song.display_name
            }}</span>
        </div>
        <div class="flex flex-nowrap gap-4 items-center">
            <!-- Play/Pause Button -->
            <button type="button"
                @click.prevent="playerStore.toggleAudio()">
                <i class="fa text-white text-xl"
                    :class="{ 'fa-play': !playing, 'fa-pause': playing }"></i>
            </button>
            <!-- Current Position -->
            <div class="player-currenttime text-white">{{
                seek
            }}</div>
            <!-- Scrub Container  -->
            <div @click.prevent="updateSeek"
                class="w-full h-2 rounded bg-white relative cursor-pointer">
                <!-- Player Ball -->
                <span
                    class="absolute -top-2.5 -ml-2.5 text-red-600 text-lg"
                    :style="{ left: playerProgress }">
                    <i class="fas fa-circle"></i>
                </span>
                <!-- Player Progress Bar-->
                <span
                    class="block h-2 rounded bg-gradient-to-r from-purple-800 to-purple-500"
                    :style="{ width: playerProgress }"></span>
            </div>
            <!-- Duration -->
            <div class="player-duration text-white">{{
                duration
            }}</div>
        </div>
    </div>
</template>

<script setup>
import { usePlayerStore } from "@/stores/player";
import { computed } from "@vue/reactivity";

const playerStore = usePlayerStore();

const toggleAudio = computed(() => playerStore.toggleAudio);
const updateSeek = computed(() => playerStore.updateSeek);
const playing = computed(() => playerStore.playing);
const duration = computed(() => playerStore.duration);
const seek = computed(() => playerStore.seek);
const playerProgress = computed(() => playerStore.playerProgress);
const current_song = computed(() => playerStore.current_song);



</script>
