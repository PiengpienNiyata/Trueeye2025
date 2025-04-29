<template>
  <div
    class="bg-slate-800 bg-opacity-30 flex justify-center items-center fixed h-screen w-screen top-0 left-0 z-30"
  >
    <div
      class="z-50 bg-white drop-shadow-md rounded-lg flex flex-col justify-evenly gap-y-8 items-center p-4"
    >
      <p class="text-xl text-[#707070] w-[400px] text-center">
        ระบบจะทำการลบข้อมูล
      </p>
      <p class="text-[#EB4648] text-center">
        “ต้องการลบ {{ compState.siteSelected }}"
      </p>
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
import { useRoute } from "vue-router";
import { store } from "../../utility/store";
import { fetchAccessToken } from '@/service/service.js';

const route = useRoute();

const compState = reactive({
  siteSelected: store.siteSelected,
});

const emits = defineEmits(["cancel"]);
const onCancelClick = () => {
  emits("cancel");
};

const onConfirmClick = () => {
  onConfirmDeleteSite();
  emits("cancel");
};

const onConfirmDeleteSite = async () => {
  try {
    const accessToken = await fetchAccessToken();
    await deleteSite(accessToken);
    location.reload()
  } catch (error) {
    console.error("Error in main function:", error);
  }
};

const deleteSite = async (accessToken) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", accessToken);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };
  const siteId = route.params.id;
  fetch(
    `https://id.trueeye.co/admin/realms/master/groups/${siteId}`,
    requestOptions
  )
    .then((response) => response.text())
    .catch((error) => console.error(error));
};
</script>
