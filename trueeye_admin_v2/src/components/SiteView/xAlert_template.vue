<template>
  <div
    class="bg-slate-800 bg-opacity-30 flex justify-center items-center fixed h-screen w-screen top-0 left-0 z-30"
  >
    <div
      class="z-50 bg-white drop-shadow-md rounded-lg flex flex-col justify-evenly gap-y-8 items-center p-4"
    >
      <p class="text-xl text-[#707070] w-[400px] text-center">
        ระบบจัดส่งข้อมูลเรียบร้อยแล้ว
      </p>
      <p class="text-sm text-[#EB4648] text-center">
        กรอกรหัสไม่ครบ/ไม่ตรงกัน กรุณากรอกข้อมูลใหม่
      </p>
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

const emits = defineEmits(["cancel"]);
const onCancelClick = () => {
  emits("cancel");
};

const onConfirmClick = () => {
  emits("confirm");
};
</script>
