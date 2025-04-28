<template>
  <button
    @click="onCreateAttribute"
    class="w-[124px] h-8 flex justify-center items-center gap-x-1 hover:cursor-pointer rounded bg-[#EB4648] text-white mb-4"
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="16" height="16" rx="8" fill="#EB4648" />
      <path
        d="M11.9999 8.66671H8.66658V12C8.66658 12.3667 8.36658 12.6667 7.99992 12.6667C7.63325 12.6667 7.33325 12.3667 7.33325 12V8.66671H3.99992C3.63325 8.66671 3.33325 8.36671 3.33325 8.00004C3.33325 7.63337 3.63325 7.33337 3.99992 7.33337H7.33325V4.00004C7.33325 3.63337 7.63325 3.33337 7.99992 3.33337C8.36658 3.33337 8.66658 3.63337 8.66658 4.00004V7.33337H11.9999C12.3666 7.33337 12.6666 7.63337 12.6666 8.00004C12.6666 8.36671 12.3666 8.66671 11.9999 8.66671Z"
        fill="#FCFCFC"
      />
    </svg>
    <span>Create List</span>
  </button>

  <table class="w-full">
    <thead>
      <tr>
        <td class="w-4/12 px-4 text-left text-[#A4A4A4]">Key</td>
        <td class="w-4"></td>
        <td class="w-4/12 px-4 text-left text-[#A4A4A4]">Value</td>
        <td class="p-4"></td>
      </tr>
    </thead>
    <tbody>
      <tr
        class="gap-4"
        v-for="(item, index) in compState.attributes"
        :key="index"
      >
        <td class="p-0">
          <div
            class="pl-4 h-10 border border-[#B4B4B4] text-[#696969] flex items-center mt-4"
          >
            {{ item.key }}
          </div>
        </td>
        <td class="p-0"></td>
        <td class="p-0">
          <div
            class="pl-4 h-10 border border-[#B4B4B4] text-[#696969] flex items-center mt-4"
          >
            {{ item.value }}
          </div>
        </td>
        <td class="p-0" v-if="!compState.defaultAttributes.includes(item.key)">
          <div class="pl-4 mt-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clip-path="url(#clip0_126_16868)">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16 13H8C7.45 13 7 12.55 7 12C7 11.45 7.45 11 8 11H16C16.55 11 17 11.45 17 12C17 12.55 16.55 13 16 13Z"
                  fill="#EB4648"
                />
              </g>
              <defs>
                <clipPath id="clip0_126_16868">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <transition name="fade">
    <CreateAttributeModal
      v-if="compState.isCreateAttributeModal"
      @cancel="onCloseCreateAttribute"
      @confirm="onConfirmCreateAttribute"
    />
  </transition>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import CreateAttributeModal from "./CreateAttributeSetModal.vue";
import { attributes, defaultAttributes } from "../../utility/data.js";

onMounted(() => {
  compState.attributes = attributes;
  compState.defaultAttributes = defaultAttributes;
});
const compState = reactive({
  attributes: [],
  defaultAttributes: [],
  isCreateAttributeModal: false,
});

const onCreateAttribute = () => {
  compState.isCreateAttributeModal = true;
};

const onCloseCreateAttribute = () => {
  compState.isCreateAttributeModal = false;
};
</script>
