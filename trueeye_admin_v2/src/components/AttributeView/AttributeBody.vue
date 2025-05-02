<template>
  <MainBody>
    <template v-slot:maincomponent>
      <div class="p-6">
        <p class="text-2xl/6 text-[#a4a4a4] mb-2">Attribute</p>
        <div class="mt-6">
          <div class="flex border-collapse mb-6 text-[#A9A9A9]">
            <div
              @click="onChangeMode('List')"
              :class="{
                'h-10 w-[124px] flex justify-center items-center hover:cursor-pointer bg-[#EFEFEF] border border-[#B4B4B4] border-l-0': true,
                'border-b-0 border-t-[#EB4648] text-[#EB4648] bg-[#FCFCFC] ':
                  compState.isMode == 'List',
              }"
            >
              <p>Attribute List</p>
            </div>
            <div
              @click="onChangeMode('Set')"
              :class="{
                'h-10 w-[124px] flex justify-center items-center hover:cursor-pointer bg-[#EFEFEF] border border-[#B4B4B4] border-l-0': true,
                'border-b-0 border-t-[#EB4648] text-[#EB4648] bg-[#FCFCFC]':
                  compState.isMode == 'Set',
              }"
            >
              <p>Set</p>
            </div>
            <div class="w-full border-b border-b-[#B4B4B4]"></div>
          </div>
          <div>
            <AttriListModal v-if="compState.isMode == 'List'" />
            <AttriSetModal v-if="compState.isMode == 'Set'" />
          </div>
        </div>
      </div>
    </template>
  </MainBody>
</template>

<script setup>
import { onMounted, reactive } from "vue";

import MainBody from "@/components/MainBody.vue";
import AttriListModal from "./AttriListComp.vue";
import AttriSetModal from "./AttriSetComp.vue";

onMounted(() => {
  // checkLogin()
});

const compState = reactive({
  isMode: "List",
});
const onChangeMode = (mode) => {
  compState.isMode = mode;
};
</script>
