<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<template>
    <!-- Main Content -->
    <section class="container mx-auto mt-6">
        <div class="md:grid md:grid-cols-3 md:gap-4">

            <div class="col-span-1">
                <app-upload ref="upload"
                    :addSong="addSong" />
            </div>
            <div class="col-span-2">
                <div
                    class="bg-white rounded border border-gray-200 relative flex flex-col">
                    <div
                        class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                        <span class="card-title">My
                            Songs</span>
                        <i
                            class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
                    </div>
                    <div class="p-6">
                        <composition-item
                            v-for="(song, i) in songs"
                            :key="song.docID" :song="song"
                            :updateSong="updateSong"
                            :index="i"
                            :removeSong="removeSong"
                            :updateUnsavedFlag="updateUnsavedFlag" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import AppUpload from "@/components/AppUpload.vue";
import CompositionItem from "@/components/CompositionItem.vue";
import { songsCollection, auth } from "@/includes/firebase";
import { ref } from "vue";

let songs = ref([]);
let unsavedFlag = ref(false);


const created = async () => {
    const snapshot = await songsCollection
        .where("uid", "==", auth.currentUser.uid)
        .get();

    snapshot.forEach(addSong);
};

const updateSong = (i, values) => {
    songs.value[i].modified_name = values.modified_name;
    songs.value[i].genre = values.genre;
};
const removeSong = (i) => {
    songs.value.splice(i, 1);
};
const addSong = (document) => {
    const song = {
        ...document.data(),
        docID: document.id,
    };

    songs.value.push(song);
};
const updateUnsavedFlag = (value) => {
    unsavedFlag.value = value;
};
const beforeRouteLeave = (to, from, next) => {
    if (!unsavedFlag.value) {
        next();
    } else {
        const leave = confirm(
            "You have unsaved changes. Are you sure you want to leave?"
        );
        next(leave);
    }
};
// beforeRouteLeave(to, from, next) {
//     this.$refs.upload.cancelUploads();
//     next();
// },
// beforeRouteEnter(to, from, next) {
//     const store = useUserStore();

//     if (store.userLoggedIn) {
//         next();
//     } else {
//         next({ name: "home" });
//     }
// },
</script>
