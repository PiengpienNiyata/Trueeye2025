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
        <div class="text-white text-xl leading-loose">ชื่อ Attribute</div>
      </div>
      <div class="p-4 w-full flex-grow flex flex-col">
        <div class="flex items-center gap-2 justify-center text-[#a4a4a4] mb-4">
          <p>ชื่อ Attribute</p>
          <input
            type="text"
            class="w-[318px] border border-[#a4a4a4] rounded h-10 p-2"
            placeholder="คำค้นหา"
          />
        </div>

        <table class="">
          <thead>
            <tr>
              <td class="w-[360px] px-4 text-left text-[#A4A4A4]">Key</td>
              <td class="w-4"></td>
              <td class="w-[360px] text-left text-[#A4A4A4]">Value</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in compState.attributes" :key="index">
              <td class="p-0">
                <div
                  class="pl-4 h-10 border border-[#B4B4B4] text-[#696969] flex items-center mt-4 gap-2"
                >
                  <input
                    v-if="compState.isSet.name !== 'Master Set'"
                    class="w-4 h-4"
                    type="checkbox"
                    name="abc"
                    value="all"
                  />
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
            </tr>
          </tbody>
        </table>

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
import { attributes } from "../../utility/data.js";

onMounted(() => {
  compState.attributes = attributes;
});

const compState = reactive({
  isSetPasswordModal: false,
  isJoinSitesModal: false,
  attributes: [],
});

const emits = defineEmits(["cancel"]);
const onCancelClick = () => {
  emits("cancel");
};
</script>
