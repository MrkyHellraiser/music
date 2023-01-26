import { defineStore, acceptHMRUpdate } from "pinia";
import { auth, usersCollection } from "@/includes/firebase";
// stores/counter.js
import { ref } from "vue";
export const useUserStore = defineStore("user", () => {
  let userLoggedIn = ref(false);

  const createUser = async (values) => {
    const userCred = await auth.createUserWithEmailAndPassword(
      values.email,
      values.password
    );

    await usersCollection.doc(userCred.user.uid).set({
      name: values.name,
      email: values.email,
      age: values.age,
      country: values.country,
    });

    await userCred.user.updateProfile({
      displayName: values.name,
    });

    userLoggedIn.value = true;
  };
  const authenticate = async (values) => {
    await auth.signInWithEmailAndPassword(values.email, values.password);

    userLoggedIn.value = true;
  };
  const signOut = async () => {
    await auth.signOut();

    userLoggedIn.value = false;
  };
  return {
    userLoggedIn,
    createUser,
    authenticate,
    signOut,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
