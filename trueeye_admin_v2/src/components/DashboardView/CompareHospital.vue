<template>
  <div class="w-full h-full bg-white py-6 px-4 rounded-lg gap-y-2 shadow-md">
    <div class="text-[20px]">จำนวนผู้รับการตรวจแต่ละโรงพยาบาล</div>
    <div class="py-2">
      <div class="h-12 border-[#a2a2bf] border-b flex justify-between">
        <div
          @click="sort()"
          class="h-10 w-10 border bg-[#EB4648] rounded flex justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            :style="{
              transform: compState.isAscending ? 'none' : 'scaleY(-1)',
            }"
          >
            <rect
              width="20"
              height="19.5311"
              transform="translate(0 0.121704)"
              fill="#EB4648"
            />
            <path
              d="M2.22559 4.80896V14.9656"
              stroke="white"
              stroke-linejoin="round"
            />
            <path
              d="M2.51031 0.298158L4.3969 4.07388C4.43561 4.15123 4.45392 4.23719 4.45009 4.32361C4.44626 4.41002 4.42042 4.49403 4.37503 4.56766C4.32963 4.64129 4.26618 4.7021 4.19068 4.74433C4.11519 4.78656 4.03017 4.80881 3.94367 4.80896H0.508194C0.421586 4.80902 0.336402 4.78693 0.260738 4.74479C0.185073 4.70265 0.121444 4.64186 0.0758967 4.5682C0.0303498 4.49453 0.00439948 4.41045 0.000511933 4.32393C-0.00337562 4.2374 0.0149289 4.15133 0.0536859 4.07388L1.94154 0.298158C1.9678 0.245174 2.00834 0.200579 2.05859 0.169401C2.10884 0.138224 2.1668 0.121704 2.22593 0.121704C2.28506 0.121704 2.34302 0.138224 2.39327 0.169401C2.44352 0.200579 2.48406 0.245174 2.51031 0.298158ZM2.51031 19.4764L4.39817 15.7006C4.43693 15.6232 4.45524 15.5371 4.45135 15.4506C4.44746 15.3641 4.42151 15.28 4.37596 15.2063C4.33042 15.1327 4.26679 15.0719 4.19112 15.0297C4.11546 14.9876 4.03027 14.9655 3.94367 14.9656H0.508194C0.421586 14.9655 0.336402 14.9876 0.260738 15.0297C0.185073 15.0719 0.121444 15.1327 0.0758967 15.2063C0.0303498 15.28 0.00439948 15.3641 0.000511933 15.4506C-0.00337562 15.5371 0.0149289 15.6232 0.0536859 15.7006L1.94154 19.4764C1.9678 19.5294 2.00834 19.5739 2.05859 19.6051C2.10884 19.6363 2.1668 19.6528 2.22593 19.6528C2.28506 19.6528 2.34302 19.6363 2.39327 19.6051C2.44352 19.5739 2.48406 19.5294 2.51031 19.4764Z"
              fill="white"
            />
            <path
              d="M9.84375 4.80896H20.0004M9.84375 9.88726H16.0004M9.84375 14.9656H14.0004"
              stroke="white"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <div
          class="h-10 w-[86px] border border-[#A4A4A4] rounded flex items-center pl-2"
        >
          <select v-model="compState.selectedRange" class="w-[90%] text-center">
            <option :value="1">1 - 10</option>
            <option :value="11">11 - 20</option>
            <option :value="21">21 - 30</option>
          </select>
        </div>

        <div class="h-10 w-[208px] border border-[#A4A4A4] rounded">
          <Datepicker
            class="w-full"
            v-model="compState.selectedDates"
            :range="true"
            :enable-time-picker="false"
            :max-date="new Date()"
            :format="'dd/MM/yy'"
          />
        </div>
      </div>
    </div>

    <div
      v-for="(hospital, index) in hospitals"
      :key="index"
      class="h-[60px] w-full"
    >
      <div class="h-10 flex items-center p-0">
        <p class="text-[20px] w-full">{{ hospital.name }}</p>
      </div>
      <div class="h-[20px] w-full justify-between flex">
        <div
          class="h-[20px] bg-[#EB4648]"
          :style="{ width: hospital.percentage + '%' }"
        ></div>
        <p>{{ hospital.count }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// Using ref to make hospitals reactive
const hospitals = ref([
  { name: "รพ A", count: 2345 },
  { name: "รพ B", count: 100 },
  { name: "รพ C", count: 1000 },
  { name: "รพ D", count: 450 },
  { name: "รพ E", count: 780 },
  { name: "รพ F", count: 1500 },
  { name: "รพ G", count: 300 },
  { name: "รพ H", count: 600 },
  { name: "รพ I", count: 1250 },
  { name: "รพ J", count: 200 },
]);

const compState = reactive({
  selectedDates: [new Date(new Date().getFullYear(), 0, 1), new Date()],
  isAscending: true,
  selectedRange: 1,
});

const sort = () => {
  hospitals.value.sort((a, b) =>
    compState.isAscending ? a.count - b.count : b.count - a.count
  );
  compState.isAscending = !compState.isAscending;
};

watch(
  hospitals,
  (newHospitals) => {
    const maxCount = Math.max(
      ...newHospitals.map((hospital) => hospital.count)
    );
    newHospitals.forEach((hospital) => {
      hospital.percentage = (hospital.count / maxCount) * 80;
    });
  },
  { immediate: true }
);

hospitals.value.sort((a, b) => b.count - a.count);
</script>

<style></style>
