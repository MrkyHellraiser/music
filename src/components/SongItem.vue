<template>
    <li
        class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-500">
        <div>
            <router-link
                :to="{ name: 'song', params: { id: song.docID } }"
                class="font-bold block text-white">{{
                    song.modified_name
                }}</router-link>
            <span class="text-white text-sm">{{
                song.display_name
            }}</span>
        </div>

        <div class="text-white text-lg">
            <router-link custom
                :to="{ name: 'song', params: { id: song.docID }, hash: '#comments' }"
                v-slot="{ navigate }">
                <span class="comments" @click="navigate">
                    <i
                        class="fa fa-comments text-white"></i>
                    {{ song.comment_count }}
                </span>
            </router-link>
        </div>
    </li>
</template>

<script setup>
defineProps(["song"])

</script>
