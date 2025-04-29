<template>
  <div
    class="bg-slate-800 bg-opacity-30 flex justify-center items-center fixed h-screen w-screen top-0 left-0 z-30"
  >
    <div
      class="z-50 bg-white drop-shadow-md rounded-lg flex flex-col justify-evenly gap-y-8 items-center p-4"
    >
      <p class="text-xl text-[#707070] w-[400px] text-center">
        Create new sites
      </p>
      <p v-if="none" class="text-sm text-[#EB4648] text-center">
        Sites มีอยู่แล้ว กรุณากรอกข้อมูลใหม่
      </p>
      <p v-if="none" class="text-sm text-[#EB4648] text-center">
        กรอกข้อมูลไม่ครบ กรุณากรอกข้อมูลใหม่
      </p>
      <input
        v-model="compState.nameSite"
        class="pl-2 w-full h-10 rounded border border-[#a4a4a4] placeholder:text-[#D6D6D6]"
        placeholder="Create new sites"
      />
      <div class="w-full flex justify-center gap-x-4">
        <button
          @click="onCancelClick"
          class="w-full h-10 bg-white rounded border border-[#a4a4a4] text-[#a4a4a4]"
        >
          Cancel
        </button>
        <button
          @click="onConfirmClick"
          class="w-full h-10 bg-[#EB4648] rounded text-[#fff] text-sm"
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
import { defineEmits, reactive } from "vue";
import { fetchAccessToken } from '@/service/service.js';

const compState = reactive({
  nameSite: "",
});

const emits = defineEmits(["cancel"]);
const onCancelClick = () => {
  emits("cancel");
};

const onConfirmClick = () => {
  createSite();
  emits("cancel");
};

const createSite = async () => {
  try {
    const accessToken = await fetchAccessToken();
    await createGroup(accessToken)
    location.reload()
  } catch (error) {
    console.error("Error in main function:", error);
  }
};

const createGroup = async (accessToken) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", accessToken);

  const raw = JSON.stringify({
    name: compState.nameSite,
    path: "/" + compState.nameSite,
    subGroupCount: 0,
    subGroups: [],
    attributes: {
      CFG_ENCODING: ["UTF-8"],
      CFG_IMAGE_FILENAME_FORMAT_SPLIT: ["_"],
      CFG_CUSTOMER_NAME: [compState.nameSite + " Hospital"],
      CFG_MODEL_DR5CLS_P34_THRESHOLD: ["0.4"],
      CFG_MODEL_CKD_THRESHOLD: ["0.7"],
      CFG_OTP_DIGITS: ["6"],
      CFG_CUSTOMER_DB: [""],
      CFG_MODEL_UNGRADE_THRESHOLD: ["0.65"],
      CFG_MODEL_DR5CLS_3PLUS4_THRESHOLD: ["0.6"],
      CFG_IMAGE_FILENAME_FORMAT: [
        "[HN]_[NAME]_Retina_[ODOS]_[IMAGE_DATE]_[RUNNING].[FILE_TYPE]",
      ],
      CFG_MODEL_DR5CLS_P2_THRESHOLD: ["0.85"],
      CFG_ENABLE_MENU_SINGLE_UPLOAD: ["False"],
      CFG_MODEL_DR_WEIGHT: ["20"],
      CFG_MODEL_CKD5Y_THRESHOLD: ["0.6"],
      CFG_MODEL_DR2_THRESHOLD: ["0.725"],
      CFG_OTP: ["True"],
      CFG_API_KEY: ["jkotmeVWw626e_h9y1es7S8qL3yGho"],
    },
    realmRoles: ["trueeye_customer"],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  fetch("https://id.trueeye.co/admin/realms/master/groups", requestOptions)
  .then(async (response) => {
    if (!response.ok) {
      const text = await response.text();
      console.error(`Error Code: ${response.status}, Response Body: ${text}`);
      throw new Error(text || 'Request failed with status ' + response.status);
    }
    return response.text();
  })
  .catch((error) => {
    console.error(`Request failed: ${error.message}`);
  });
};
</script>
