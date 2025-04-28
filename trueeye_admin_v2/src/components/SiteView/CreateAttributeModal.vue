<template>
  <div
    class="bg-slate-800 bg-opacity-30 flex justify-center items-center fixed h-screen w-screen top-0 left-0 z-30"
  >
    <div
      class="z-50 bg-white drop-shadow-md rounded-lg flex flex-col justify-evenly gap-y-8 items-center p-4"
    >
      <p class="text-xl text-[#707070] w-[400px] text-center">
        Create Attribute
      </p>
      <p v-if="none" class="text-sm text-[#EB4648] text-center">
        Attribute มีอยู่แล้ว กรุณากรอกข้อมูลใหม่
      </p>
      <p v-if="none" class="text-sm text-[#EB4648] text-center">
        กรอกข้อมูลไม่ครบ กรุณากรอกข้อมูลใหม่
      </p>
      <p class="text-xl text-[#707070] w-[400px] text-center">Key</p>
      <input
        class="pl-2 w-full h-10 rounded border border-[#a4a4a4] placeholder:text-[#D6D6D6]"
        placeholder="Key"
        v-model="compState.key"
      />
      <p class="text-xl text-[#707070] w-[400px] text-center">Value</p>
      <input
        class="pl-2 w-full h-10 rounded border border-[#a4a4a4] placeholder:text-[#D6D6D6]"
        placeholder="Value"
        v-model="compState.value"
      />
      <div class="w-full flex justify-center gap-x-4">
        <button
          @click="onCancelClick"
          class="w-full h-10 bg-white rounded border border-[#a4a4a4] text-[#a4a4a4]"
        >
          Cancel
        </button>
        <button :disabled="!canSubmit"
          @click="onConfirmClick"
          class="w-full h-10 bg-[#EB4648] rounded text-[#fff] text-sm disabled:bg-[#a4a4a4] disabled:cursor-not-allowed"
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
import { defineEmits, reactive, computed } from "vue";
import { store } from "../../utility/store";

const compState = reactive({
  key: "",
  value: "",
});

const canSubmit = computed(() => {
  return (compState.key)
})


const emits = defineEmits(["cancel", "confirm"]);
const onCancelClick = () => {
  emits("cancel");
};

const onConfirmClick = () => {
  store.attributeKey = compState.key;
  store.attributeValue = compState.value;
  emits("confirm");
};
</script>
