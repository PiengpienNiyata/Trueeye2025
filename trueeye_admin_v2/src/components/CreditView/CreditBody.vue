<template>
  <MainBody>
    <template v-slot:maincomponent>
      <div class="w-full h-full p-5 bg-[#EFEFEF] select-none overflow-scroll bg-white">
        <HeadComp />
        <div class="w-full py-4">
          <CreditSite />
        </div>
      </div>
    </template>
  </MainBody>
</template>

<script setup>
import MainBody from "@/components/MainBody.vue";
import HeadComp from "./HeadComp.vue";
import CreditSite from "./CreditSite.vue";
</script>

<style scoped>
td {
  min-width: 0;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-color: #a3a3a3;
}
</style>
