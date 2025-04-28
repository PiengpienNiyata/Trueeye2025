<template>
  <div
    class="bg-slate-800 bg-opacity-30 flex justify-center items-center fixed h-screen w-screen top-0 left-0 z-30"
  >
    <div
      class="z-50 bg-white w-[680px] h-[431px] drop-shadow-md rounded-lg flex flex-col"
    >
      <div
        class="self-stretch px-6 py-2 bg-red-500 rounded-tl-lg rounded-tr-lg flex justify-center items-center"
      >
        <div class="text-white text-xl leading-loose">Join sites</div>
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

        <div class="flex-grow overflow-y-auto h-[232px] mb-4">
          <div class="grid grid-cols-3 gap-3">
            <div
              v-for="(site, index) in compState.sites"
              :key="index"
              @click="selectSite(site)"
              :class="[
                'w-[207px] bg-white h-16 p-2 rounded justify-center items-center gap-2 inline-flex ',
                compState?.selectedSiteIndex == site.name ||
                compState?.selectedSiteIndex?.name == site.name
                  ? 'border-red-500 border-[3px] bg-red-100'
                  : 'border-[#a4a4a4] border-[1px]',
              ]"
            >
              <span class="text-center truncate block">
                {{ site.name }}
              </span>
            </div>
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
            @click="onConfirmClick"
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
import { useRoute } from "vue-router";

import { store } from "../../utility/store.js";

const route = useRoute();

onMounted(() => {
  run();
});

const compState = reactive({
  isSetPasswordModal: false,
  isJoinSitesModal: false,
  sites: [],
  selectedSiteIndex: store.memberSite,
});

const selectSite = (site) => {
  if (compState.selectedSiteIndex != site) {
    compState.selectedSiteIndex = site;
  } else {
    compState.selectedSiteIndex = null;
  }
};
const emits = defineEmits(["cancel"]);
const onCancelClick = () => {
  emits("cancel");
};

const run = async () => {
  try {
    const accessToken = await fetchAccessToken();
    await fetchAllDetails(accessToken);
  } catch (error) {
    console.error("Error in main function:", error);
  }
};

const onConfirmClick = async () => {
  try {
    const accessToken = await fetchAccessToken();
    if (store.memberSite) {
      await leaveSite(accessToken);
    }

    if (compState.selectedSiteIndex) {
      await joinSite(accessToken);
    }
  } catch (error) {
    console.error("Error in main function:", error);
  }
  location.reload();
  onCancelClick();
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

const fetchAllDetails = async (accessToken) => {
  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://id.trueeye.co/admin/realms/master/groups/",
      requestOptions
    );
    const result = await response.json();
    if (Array.isArray(result)) {
      const siteDetails = result.map((site) => ({
        id: site.id,
        name: site.name,
      }));
      compState.sites = siteDetails;
      console.log("Mapped site details:", siteDetails);
    }
  } catch (error) {
    console.error("Error fetching details:", error);
  }
};

const joinSite = async (accessToken) => {
  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const requestOptions = {
    method: "PUT",
    headers: headers,
    redirect: "follow",
  };
  const userId = route.params.id;
  fetch(
    `https://id.trueeye.co/admin/realms/master/users/${userId}/groups/${compState.selectedSiteIndex.id}`,
    requestOptions
  )
    .then((response) => response.text())
    .catch((error) => console.error(error));
};

const leaveSite = async (accessToken) => {
  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const requestOptions = {
    method: "DELETE",
    headers: headers,
    redirect: "follow",
  };
  const userId = route.params.id;
  fetch(
    `https://id.trueeye.co/admin/realms/master/users/${userId}/groups/${store.memberSite.id}`,
    requestOptions
  )
    .then((response) => response.text())
    .catch((error) => console.error(error));
};
</script>
