import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { Howl } from "howler";
import helper from "@/includes/helper";
export const usePlayerStore = defineStore("player", () => {
  
  let current_song = ref({});
  let sound = ref({});
  let seek = ref("00:00");
  let duration = ref("00:00");
  let playerProgress = ref("0%");

  const newSong = async (song) => {
    if (sound.value instanceof Howl) {
      sound.value.unload();
    }

    current_song = song;
    sound.value = new Howl({
      src: [song.url],
      html5: true,
    });

    sound.value.play();

    sound.value.on("play", () => {
      requestAnimationFrame(progress.value);
    });
  };
  const toggleAudio = async () => {
    if (!sound.value.playing) {
      return;
    }

    if (sound.value.playing()) {
      sound.value.pause();
    } else {
      sound.value.play();
    }
  };
  const progress = () => {
    seek.value = helper.formatTime(sound.value.seek());
    duration.value = helper.formatTime(sound.value.duration());

    playerProgress.value = `${
      (sound.value.seek() / sound.value.duration()) * 100
    }%`;

    if (sound.value.playing()) {
      requestAnimationFrame(progress.value);
    }
  };
  const updateSeek = (event) => {
    if (!sound.value.playing) {
      return;
    }

    const { x, width } = event.currentTarget.getBoundingClientRect();

    // Document = 200, Timeline = 1000, clickX = 1000, Distance + 500
    const clickX = event.clientX - x;
    const percentage = clickX / width;
    const seconds = sound.value.duration() * percentage;

    sound.value.seek(seconds);
    sound.value.once("seek", progress.value);
  };
  
  return {
    current_song, 
    sound, 
    seek,
    duration,
    playerProgress,
    newSong,
    toggleAudio,
    progress,
    updateSeek,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStore, import.meta.hot));
}
