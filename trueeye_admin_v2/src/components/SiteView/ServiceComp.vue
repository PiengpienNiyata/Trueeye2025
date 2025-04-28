<template>
  <div class="px-9">
    <div class="flex justify-between">
      <p>Two-Factor Authentication Setting</p>
      <button
        @click="onDeleteClick"
        class="w-[124px] text-sm/6 h-8 flex justify-center items-center gap-x-2 hover:cursor-pointer rounded bg-[#EFEFEF] text-[#A4A4A4]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <g clip-path="url(#clip0_112_14691)">
            <path
              d="M11.7267 2.39333C11.4733 2.14 11.1333 2 10.78 2H3.33333C2.59333 2 2 2.6 2 3.33333V12.6667C2 13.4 2.6 14 3.33333 14H12.6667C13.4 14 14 13.4 14 12.6667V5.22C14 4.86667 13.86 4.52667 13.6067 4.28L11.7267 2.39333ZM8 12.6667C6.89333 12.6667 6 11.7733 6 10.6667C6 9.56 6.89333 8.66667 8 8.66667C9.10667 8.66667 10 9.56 10 10.6667C10 11.7733 9.10667 12.6667 8 12.6667ZM8.66667 6H4.66667C3.93333 6 3.33333 5.4 3.33333 4.66667C3.33333 3.93333 3.93333 3.33333 4.66667 3.33333H8.66667C9.4 3.33333 10 3.93333 10 4.66667C10 5.4 9.4 6 8.66667 6Z"
              fill="#A4A4A4"
            />
          </g>
          <defs>
            <clipPath id="clip0_112_14691">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span>Save</span>
      </button>
    </div>
    <div class="w-5/12">
      <div class="flex justify-between m-2">
        <p>Two-Factor Authentication</p>
        <label class="relative inline-flex cursor-pointer items-center">
          <input
            id="2FA"
            type="checkbox"
            class="peer sr-only"
            v-model="compState.is2FAEnabled"
          />
          <label for="2FA" class="hidden"></label>
          <div
            class="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"
          ></div>
        </label>
      </div>

      <div class="flex flex-col pl-3 space-y-2">
        <div class="inline-flex items-center space-x-2">
          <label
            class="relative flex items-center cursor-pointer"
            :class="{
              'cursor-not-allowed opacity-50': !compState.is2FAEnabled,
            }"
            for="SMS"
          >
            <input
              name="type"
              type="radio"
              class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border transition-all"
              :class="
                !compState.is2FAEnabled
                  ? 'border-blue-gray-200 checked:border-gray-900'
                  : 'border-gray-400 cursor-not-allowed '
              "
              id="SMS"
              :disabled="!compState.is2FAEnabled"
              v-model="compState.authType"
              value="SMS"
            />
            <span
              class="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none peer-checked:opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <circle cx="8" cy="8" r="8"></circle>
              </svg>
            </span>
          </label>
          <label class="cursor-pointer select-none" for="SMS">SMS</label>
        </div>

        <div class="inline-flex items-center space-x-2">
          <label
            class="relative flex items-center cursor-pointer"
            :class="{
              'cursor-not-allowed opacity-50': !compState.is2FAEnabled,
            }"
            for="Email"
          >
            <input
              name="type"
              type="radio"
              class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border transition-all"
              :class="
                !compState.is2FAEnabled
                  ? 'border-blue-gray-200 checked:border-gray-900'
                  : 'border-gray-400 cursor-not-allowed '
              "
              id="Email"
              :disabled="!compState.is2FAEnabled"
              v-model="compState.authType"
              value="Email"
            />
            <span
              class="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none peer-checked:opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <circle cx="8" cy="8" r="8"></circle>
              </svg>
            </span>
          </label>
          <label class="cursor-pointer select-none" for="Email">Email</label>
        </div>
      </div>

      <p class="mb-2 mt-6">System Setting</p>
      <div class="flex justify-between m-2">
        <p>Single Upload</p>
        <label class="relative inline-flex cursor-pointer items-center">
          <input id="switch" type="checkbox" class="peer sr-only" />
          <label for="switch" class="hidden"></label>
          <div
            class="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white"
          ></div>
        </label>
      </div>
      <div class="flex justify-between m-2">
        <p>Batch Upload</p>
        <label class="relative inline-flex cursor-pointer items-center">
          <input id="switch" type="checkbox" class="peer sr-only" />
          <label for="switch" class="hidden"></label>
          <div
            class="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white"
          ></div>
        </label>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, watch } from "vue";
import { store } from "../../utility/store";
import { useRoute } from "vue-router";

const route = useRoute();
const compState = reactive({
  is2FAEnabled: false,
  authType: "",
});
watch(route, () => {
  compState.is2FAEnabled = store.otpCheck;
});
</script>
