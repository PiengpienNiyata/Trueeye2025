<template>
    <div class="bg-slate-800 bg-opacity-30 flex justify-center items-center fixed h-screen w-screen top-0 left-0 z-30">
        <div class=" z-50 bg-white drop-shadow-md rounded-lg flex flex-col justify-evenly gap-y-8 items-center p-4">
            <p class="text-base text-[#707070] w-[400px] text-center">ท่านต้องการออกจากระบบ <br> ใช่ หรือ ไม่</p>
            <div class="w-full flex justify-center gap-x-4">
                <button @click="onCancelClick" class="w-full h-10 border border-[#D1D1D1] rounded text-[#9F9F9F] text-sm">
                    ไม่
                </button>
                <button @click="onConfirmClick" class="w-full h-10 bg-[#EB4648] rounded text-[#fff] text-sm">
                    ใช่
                </button>
            </div>
        </div>
        <div class=" fixed left-0 right-0 bottom-0 top-0" @click.capture="onCancelClick"></div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue'
const emits = defineEmits(['cancel'])
const onCancelClick = () => {
  emits('cancel')
}
const onConfirmClick = () => {
  emits('confirm')
}
</script>
