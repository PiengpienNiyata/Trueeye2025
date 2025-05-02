<template>
    <MainBody>
      <template v-slot:maincomponent>
    <div class="w-full h-[100dvh] py-5 overflow-scroll bg-[#EFEFEF] select-none">
            <HeadComp/>
            <div class="w-full flex-1 col">
                <div class="w-full grid gap-4">
                <CompareYearChart/>
                <OnlineStatus/>
                </div>
            </div>
            <CompareHospital/>
            </div>
          

</template>
    </MainBody>
</template>
<script setup>
import MainBody from "@/components/MainBody.vue";
import HeadComp from "./HeadComp.vue";
import CompareHospital from "./CompareHospital.vue";
import CompareYearChart from "./CompareYearChart.vue";
import OnlineStatus from "./OnlineStatus.vue";


</script>
