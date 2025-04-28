<template>
  <div
    class="bg-slate-800 bg-opacity-30 flex justify-center items-center fixed h-screen w-screen top-0 left-0 z-30"
  >
    <div
      class="z-50 bg-white w-[654px] h-[431px] drop-shadow-md rounded-lg flex flex-col"
    >
      <div
        class="self-stretch px-6 py-2 bg-red-500 rounded-tl-lg rounded-tr-lg flex justify-center items-center"
      >
        <div class="text-white text-xl leading-loose">Move sites</div>
      </div>
      <div class="p-4 w-full flex-grow flex flex-col">
        <div class="flex items-center gap-2 justify-center text-[#a4a4a4] mb-4">
          <p>ชื่อ Site</p>
          <input
            type="text"
            class="w-[318px] border border-[#a4a4a4] rounded h-10 p-2"
            placeholder="คำค้นหา"
          />
        </div>
        <div
          class="grid grid-cols-2 justify-around flex-grow overflow-y-auto mb-4"
        >
          <div
            v-for="(site, index) in sites"
            :key="index"
            class="flex items-center mb-2 text-[#a4a4a4]"
          >
            <input type="checkbox" class="mr-2" />
            {{ site.name }}
          </div>
        </div>
        <div class="w-full flex justify-between gap-4 mt-auto">
          <button
            @click="onCancelClick"
            class="w-full h-10 bg-white rounded border border-[#a4a4a4] text-[#a4a4a4]"
          >
            Cancel
          </button>
          <button
            @click="onCancelClick"
            class="w-full h-10 bg-[#EB4648] rounded text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
    <div
      class="fixed left-0 right-0 bottom-0 top-0"
      @click.capture="onCancelClick"
    ></div>
  </div>
</template>
<script setup>
import { defineEmits, reactive, onMounted } from "vue";
import { sites } from "../../utility/data.js";

onMounted(() => {
  compState.sites = sites;
});

const compState = reactive({
  isSetPasswordModal: false,
  isJoinSitesModal: false,
  sites: [],
});

const emits = defineEmits(["cancel"]);
const onCancelClick = () => {
  emits("cancel");
};
</script>
