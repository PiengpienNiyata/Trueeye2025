<template>
  <div
    class="bg-slate-800 bg-opacity-30 flex justify-center items-center fixed h-screen w-screen top-0 left-0 z-30"
  >
    <div
      class="z-50 bg-white drop-shadow-md rounded-lg flex flex-col justify-evenly gap-y-8 items-center p-4"
    >
      <p class="text-xl text-[#707070] w-[400px] text-center">ตั้งค่ากล้อง</p>
      <p class="text-sm text-[#EB4648] text-center">
        ไม่ได้ตั้งชื่อ กรุณากรอกข้อมูลใหม่
      </p>
      <input
        class="pl-2 w-full h-10 rounded border border-[#a4a4a4] placeholder:text-[#D6D6D6]"
        placeholder="ชื่อกล้อง *"
      />
      <p class="text-xl text-[#707070] w-[400px] text-center">
        Add Attribute Set *
      </p>
      <div class="flex gap-2">
        <div
          v-if="site !== null"
          class="w-[207px] bg-white h-16 p-2 rounded justify-center items-center gap-2 inline-flex border-[1px] border-[#a4a4a4]"
        >
          <div class="grow text-center text-[#a4a4a4]">{{ site.name }}</div>
          <svg
            class="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18.3 5.70973C17.91 5.31973 17.28 5.31973 16.89 5.70973L12 10.5897L7.10997 5.69973C6.71997 5.30973 6.08997 5.30973 5.69997 5.69973C5.30997 6.08973 5.30997 6.71973 5.69997 7.10973L10.59 11.9997L5.69997 16.8897C5.30997 17.2797 5.30997 17.9097 5.69997 18.2997C6.08997 18.6897 6.71997 18.6897 7.10997 18.2997L12 13.4097L16.89 18.2997C17.28 18.6897 17.91 18.6897 18.3 18.2997C18.69 17.9097 18.69 17.2797 18.3 16.8897L13.41 11.9997L18.3 7.10973C18.68 6.72973 18.68 6.08973 18.3 5.70973Z"
              fill="#A4A4A4"
            />
          </svg>
        </div>
        <button
          @click="onAddclick"
          class="w-[124px] h-10 flex justify-center items-center gap-x-1 hover:cursor-pointer rounded bg-[#EB4648] text-white"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"
              :fill="'white'"
            />
          </svg>
          <span>Add</span>
        </button>
      </div>
      <div class="w-full flex justify-center gap-x-4">
        <button
          @click="onCancelClick"
          class="w-full h-10 bg-white rounded border border-[#a4a4a4] text-[#a4a4a4]"
        >
          Cancel
        </button>
        <button
          @click="onConfirmClick"
          class="w-full h-10 bg-[#EB4648] rounded text-[#fff] text-sm"
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
import { defineEmits } from "vue";

const emits = defineEmits(["cancel", "confirm"]);
const onCancelClick = () => {
  emits("cancel");
};

const onConfirmClick = () => {
  emits("confirm");
};
</script>
