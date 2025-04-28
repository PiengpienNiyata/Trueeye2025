<template>
  <div
    class="bg-slate-800 bg-opacity-30 flex justify-center items-center fixed h-screen w-screen top-0 left-0 z-30"
  >
    <div
      class="z-50 bg-white drop-shadow-md rounded-lg flex flex-col justify-evenly gap-y-2 items-center p-4"
    >
      <p class="text-xl text-[#707070] w-[400px] text-center">Set Password</p>
      <p v-if="errorMessage" class="text-sm text-[#EB4648]">
        {{ errorMessage }}
      </p>
      <div class="my-8">
        <input
          v-model="password"
          type="password"
          class="pl-2 w-full h-10 rounded border border-[#a4a4a4] placeholder:text-[#D6D6D6]"
          placeholder="Password"
        />
        <input
          v-model="passwordConfirm"
          type="password"
          class="pl-2 mt-2 w-full h-10 rounded border border-[#a4a4a4] placeholder:text-[#D6D6D6]"
          placeholder="Password Confirm"
        />
      </div>
      <div class="w-full flex justify-between gap-4">
        <button
          @click="onCancelClick"
          class="w-full h-10 bg-white rounded border border-[#a4a4a4] text-[#a4a4a4]"
        >
          Cancel
        </button>
        <button
       
          @click="onConfirmClick"
          class="w-full h-10 bg-[#EB4648] rounded text-white"
        >
          Confirm
        </button>
      </div>
    </div>
    <div
      class="fixed left-0 right-0 bottom-0 top-0"
      @click.capture="onCancelClick"
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { defineEmits } from "vue";

const emits = defineEmits(["cancel", "confirm"]);
const password = ref("");
const passwordConfirm = ref("");
const errorMessage = ref("");

const onCancelClick = () => {
  emits("cancel");
};

const onConfirmClick = () => {
  if (!password.value || !passwordConfirm.value) {
    errorMessage.value = "Password fields are required.";
  } else if (password.value !== passwordConfirm.value) {
    errorMessage.value = "Passwords do not match. Please try again.";
  } else {
    emits("confirm", password.value);
  }
};
</script>
