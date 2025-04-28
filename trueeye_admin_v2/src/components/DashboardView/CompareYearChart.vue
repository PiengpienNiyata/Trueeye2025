<template>
  <div class="w-full h-full bg-white py-6 px-4 rounded-lg gap-y-2 shadow-md">
    <p class="text-[20px] py-2">ตารางเปรียบเทียบผู้รับการตรวจในแต่ละปี</p>

    <div class=" pt-6 pb-4 w-full flex h-8 justify-around my-2">
      <div class="w-max-[180px] flex items-center gap-x-4">
        <svg
          width="24"
          height="12"
          viewBox="0 0 24 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="6"
            r="5"
            fill="white"
            stroke="#EB4648"
            stroke-width="2"
          />
          <path d="M0 6L24 6" stroke="#EB4648" stroke-width="2" />
        </svg>

        <div
          class="px-2 w-[140px] h-8 text-[#A4A4A4] flex items-center border border-[#A4A4A4] rounded "
        >
          <select class="w-full text-center" v-model="selectedOption1">
            <option :value="2024">2024</option>
            <option :value="2023">2023</option>
          </select>
        </div>
      </div>

      <div class="w-[180px] flex items-center gap-x-4">
        <svg
          width="24"
          height="12"
          viewBox="0 0 24 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="6"
            r="5"
            fill="white"
            stroke="#60A5FA"
            stroke-width="2"
          />
          <path d="M0 6L24 6" stroke="#60A5FA" stroke-width="2" />
        </svg>

        <div
          class="px-2 w-[140px] h-8 text-[#A4A4A4] flex items-center border border-[#A4A4A4] rounded"
        >
          <select class="w-full text-center" v-model="selectedOption2">
            <option :value="'off'">ไม่แสดง</option>
            <option :value="2024">2024</option>
            <option :value="2023">2023</option>
          </select>
        </div>
      </div>

      <div class="w-[180px] flex items-center gap-x-4">
        <svg
          width="24"
          height="12"
          viewBox="0 0 24 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="6"
            r="5"
            fill="white"
            stroke="#FBBF24"
            stroke-width="2"
          />
          <path d="M0 6L24 6" stroke="#FBBF24" stroke-width="2" />
        </svg>

        <div
          class="px-2 w-[140px] h-8 text-[#A4A4A4] flex items-center border border-[#A4A4A4] rounded"
        >
          <select class="w-full text-center" v-model="selectedOption3">
            <option :value="'off'">ไม่แสดง</option>
            <option :value="2024">2024</option>
            <option :value="2023">2023</option>
          </select>
        </div>
      </div>
    </div>
    <div class="w-full h-[70%]">
      <LineChart :chart-data="chartData" :chart-options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { computed, h, ref} from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const selectedOption1 = ref(2024);
const selectedOption2 = ref('off');
const selectedOption3 = ref('off');

const dataset1 = [65, 59, 80, 81, 56, 55];
const dataset2 = [143, 34, 134, 34, 23, 144];
const dataset3 = [45, 89, 23, 43, 56, 100];

const LineChart = {
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return () =>
      h(Line, { data: props.chartData, options: props.chartOptions });
  },
};

const chartData = computed(() => ({
  labels: [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ],
  datasets: [
    {
      backgroundColor: "#FFFFFF",
      borderColor: "#EB4648",
      borderWidth: 2,
      fill: true,
      data: selectedOption1.value !== 'off' ? dataset1 : [],
      pointRadius: 4,
    },
    {
      backgroundColor: "#FFFFFF",
      borderColor: "#60A5FA",
      borderWidth: 2,
      fill: true,
      data: selectedOption2.value !== 'off' ? dataset2 : [],
      pointRadius: 4,
    },
    {
      backgroundColor: "#FFFFFF",
      borderColor: "#FBBF24",
      borderWidth: 2,
      fill: true,
      data: selectedOption3.value !== 'off' ? dataset3 : [],
      pointRadius: 4,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    tooltip: {
      enabled: true,
    },
  },
};
</script>
