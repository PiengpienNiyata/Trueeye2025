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

const fetchAccessToken = async () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("username", "trueeye_admin");
  urlencoded.append("password", "trueeye_adminpwd");
  urlencoded.append("client_id", "TRUEEYE_SERVICE");
  urlencoded.append("grant_type", "password");
  urlencoded.append("client_secret", "VA3GHImiEK8wzEpwmFg2ixuzfRFDwU7C");
  urlencoded.append("scope", "openid");

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: urlencoded,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://id.trueeye.co/realms/master/protocol/openid-connect/token",
      requestOptions
    );
    const result = await response.json();

    if (result.access_token) {
      return `Bearer ${result.access_token}`;
    } else {
      throw new Error("Access token not found in the response.");
    }
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
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
