<template>
    <!-- Composition Items -->
    <div class="border border-gray-200 p-3 mb-4 rounded">
        <div v-show="!showForm">
            <h4 class="inline-block text-2xl font-bold">{{
                song.modified_name
            }}</h4>
            <button
                class="ml-1 py-1 px-2 text-sm rounded text-red-600 border border-red-600 float-right"
                @click.prevent="deleteSong">
                <i class="fa fa-times"></i>
            </button>
            <button
                class="ml-1 py-1 px-2 text-sm rounded text-blue-600 border border-blue-600 float-right"
                @click.prevent="showForm = !showForm">
                <i class="fa fa-pencil-alt"></i>
            </button>
        </div>
        <div v-show="showForm">
            <div class="text-white text-center font-bold p-4 mb-4"
                v-if="show_alert" :class="alert_variant">
                {{ alert_message }}
            </div>
            <vee-form :validation-schema="schema"
                :initial-values="song" @submit="edit">
                <div class="mb-3">
                    <label class="inline-block mb-2">Song
                        Title</label>
                    <vee-field type="text"
                        name="modified_name"
                        class="block w-full py-1.5 px-3 text-white border border-white bg-black transition duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Enter Song
          Title" @input="updateUnsavedFlag(true)" />
                    <ErrorMessage class="text-red-600"
                        name="modified_name" />
                </div>
                <div class="mb-3">
                    <label
                        class="inline-block mb-2">Genre</label>
                    <vee-field type="text" name="genre"
                        class="block w-full py-1.5 px-3 text-white border border-white bg-black transition duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Enter Genre"
                        @input="updateUnsavedFlag(true)" />
                    <ErrorMessage class="text-red-600"
                        name="genre" />
                </div>
                <button type="submit"
                    class="py-1.5 px-3 rounded text-green-600 border border-green-600"
                    :disabled="in_submission">
                    Submit
                </button>
                <button type="button"
                    class="py-1.5 px-3 ml-1 rounded text-blue-500 border border-blue-500"
                    :disabled="in_submission"
                    @click.prevent="showForm = false">
                    Go Back
                </button>
            </vee-form>
        </div>
    </div>
</template>

<script setup>
import { songsCollection, storage } from "@/includes/firebase";
import { ref } from "vue";
const props = defineProps({
    song: {
        type: Object,
        required: true,
    },
    updateSong: {
        type: Function,
        requiered: true,
    },
    index: {
        type: Number,
        required: true,
    },
    removeSong: {
        type: Function,
        required: true,
    },
    updateUnsavedFlag: {
        type: Function,
    },
})

let showForm = ref(false);
const schema = ref({
    modified_name: "required",
    genre: "alpha_spaces",
});
let in_submission = ref(false);
let show_alert = ref(false);
let alert_variant = ref("bg-blue-500");
let alert_message = ref("Please wait! Updating song info.");

const edit = async (values) => {
    in_submission.value = true;
    show_alert.value = true;
    alert_variant.value = "bg-blue-500";
    alert_message.value = "Please wait! Updating song info.";

    try {
        await songsCollection.doc(props.song.docID).update(values);
    } catch (error) {
        in_submission.value = false;
        show_alert.value = true;
        alert_variant.value = "bg-red-500";
        alert_message.value = "Something went wrong! Try again later.";
        return;
    }
    props.updateSong(props.index, values);
    props.updateUnsavedFlag(false);

    in_submission.value = false;
    alert_variant.value = "bg-green-500";
    alert_message.value = "Success";
};
const deleteSong = async () => {
    const storageRef = storage.ref();
    const songRef = storageRef.child(`songs/${props.song.original_name}`);

    await songRef.delete();

    await songsCollection.doc(props.song.docID).delete();

    props.removeSong(props.index);
};

</script>
