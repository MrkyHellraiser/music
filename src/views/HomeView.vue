<template>
    <main>
        <!-- Introduction -->
        <section
            class="mb-8 py-20 text-white text-center relative">
            <div class="absolute inset-0 w-full h-full bg-contain introduction-bg"
                style="background-image: url(assets/img/header.png)">
            </div>
            <div class="container mx-auto">
                <div class="text-white main-header-content">
                    <h1 class="font-bold text-5xl mb-5">
                        Listen to Great Music!</h1>
                    <p class="w-full md:w-8/12 mx-auto">
                        Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit.
                        Phasellus
                        et dolor mollis, congue augue non,
                        venenatis elit. Nunc justo eros,
                        suscipit ac aliquet imperdiet,
                        venenatis et sapien. Duis sed magna
                        pulvinar, fringilla lorem eget,
                        ullamcorper urna.
                    </p>
                </div>
            </div>

            <img class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
                src="/assets/img/introduction-music.png" />
        </section>

        <!-- Main Content -->
        <section class="container mx-auto">
            <div
                class="bg-black rounded border border-gray-200 relative flex flex-col">
                <div
                    class="px-6 pt-6 pb-5 font-bold border-b text-white border-gray-200">
                    <span class="card-title">Songs</span>
                    <!-- Icon -->
                    <i
                        class="fa fa-headphones-alt float-right text-red-600 text-xl"></i>
                </div>
                <!-- Playlist -->
                <ol id="playlist">
                    <AppSongItem v-for="song in songs"
                        :key="song.docID" :song="song" />
                </ol>
                <!-- .. end Playlist -->
            </div>
        </section>
    </main>
</template>

<script setup>
import AppSongItem from "@/components/SongItem.vue";
import { songsCollection } from "@/includes/firebase";
import { ref } from "@vue/reactivity"
import { onBeforeUnmount, onMounted } from "vue";


let songs = ref([]);
let maxPerPage = ref(25);
let pendingRequest = ref(false);

const created = async () => {
    getSongs();

    window.addEventListener("scroll", handleScroll);
};
const beforeUnmount = () => {
    window.removeEventListener("scroll", handleScroll);
};

const handleScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    const { innerHeight } = window;
    // Alternative (less strict)
    // const bottomOfWindow =
    //   Math.round(scrollTop) + innerHeight > offsetHeight - 100;
    const bottomOfWindow =
        Math.round(scrollTop) + innerHeight === offsetHeight;

    if (bottomOfWindow) {
        getSongs();
    }
};
const getSongs = async () => {
    if (pendingRequest.value) {
        return;
    }

    pendingRequest.value = true;

    let snapshots;

    if (songs.value.length) {
        const lastDoc = await songsCollection
            .doc(songs.value[songs.value.length - 1].docID)
            .get();

        snapshots = await songsCollection
            .orderBy("modified_name")
            .startAfter(lastDoc)
            .limit(this.maxPerPage)
            .get();
    } else {
        snapshots = await songsCollection
            .orderBy("modified_name")
            .limit(maxPerPage.value)
            .get();
    }

    snapshots.forEach((document) => {
        songs.value.push({
            docID: document.id,
            ...document.data(),
        });
    });

    pendingRequest.value = false;
};
created()

</script>
