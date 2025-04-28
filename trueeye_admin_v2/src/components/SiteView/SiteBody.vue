<template>
  <MainBody>
    <template v-slot:maincomponent>
      <div class="relative grid grid-cols-9 h-full">
        <div class="col-span-2 pt-6 flex flex-col">
          <div class="pl-6">
            <p class="text-2xl/6 text-[#a4a4a4] mb-2">Site Names</p>
            <button
              @click="onCreateSite"
              class="w-[124px] h-8 flex justify-center items-center gap-x-1 hover:cursor-pointer rounded bg-[#EB4648] text-white mb-6"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="16" height="16" rx="8" fill="#EB4648" />
                <path
                  d="M11.9999 8.66671H8.66658V12C8.66658 12.3667 8.36658 12.6667 7.99992 12.6667C7.63325 12.6667 7.33325 12.3667 7.33325 12V8.66671H3.99992C3.63325 8.66671 3.33325 8.36671 3.33325 8.00004C3.33325 7.63337 3.63325 7.33337 3.99992 7.33337H7.33325V4.00004C7.33325 3.63337 7.63325 3.33337 7.99992 3.33337C8.36658 3.33337 8.66658 3.63337 8.66658 4.00004V7.33337H11.9999C12.3666 7.33337 12.6666 7.63337 12.6666 8.00004C12.6666 8.36671 12.3666 8.66671 11.9999 8.66671Z"
                  fill="#FCFCFC"
                />
              </svg>
              <span>Create Site</span>
            </button>
          </div>
          <div
            v-for="site in compState.sites"
            :key="site.id"
            @click="onChangeSite(site)"
            class="h-10 flex justify-between px-2 items-center mb-1"
            :class="{
              'bg-[#F2F2F2] text-[#EB4648] cursor-default ':
                compState.isSite.name === site.name,
              'text-[#696969] cursor-pointer':
                compState.isSite.name !== site.name,
            }"
          >
            <div class="pl-6 truncate">{{ site.name }}</div>

            <div
              :class="
                compState.isSite.id === site.id
                  ? 'cursor-pointer'
                  : 'cursor-not-allowed'
              "
            >
              <svg
                @click="compState.isSite.id === site.id && onDeleteSite()"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_99_8653)">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16 13H8C7.45 13 7 12.55 7 12C7 11.45 7.45 11 8 11H16C16.55 11 17 11.45 17 12C17 12.55 16.55 13 16 13Z"
                    :fill="
                      compState.isSite.name === site.name
                        ? '#EB4648'
                        : '#F2F2F2'
                    "
                  />
                </g>
                <defs>
                  <clipPath id="clip0_99_8653">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div class="col-span-7 p-6 bg-[#FCFCFC] flex flex-col">
          <p class="pl-3 text-2xl/6">{{ compState.isSite.name }}</p>
          <div class="mt-6">
            <div class="flex border-collapse mb-6 text-[#A9A9A9]">
              <div
                @click="onChangeMode('Members')"
                :class="{
                  'h-10 w-[124px] flex justify-center items-center hover:cursor-pointer bg-[#EFEFEF] border border-[#B4B4B4] border-l-0': true,
                  'border-b-0 border-t-[#EB4648] text-[#EB4648] bg-[#FCFCFC]':
                    compState.isMode == 'Members',
                }"
              >
                <p>Members</p>
              </div>
              <div
                @click="onChangeMode('Attributes')"
                :class="{
                  'h-10 w-[124px] flex justify-center items-center hover:cursor-pointer bg-[#EFEFEF] border border-[#B4B4B4] border-l-0': true,
                  'border-b-0 border-t-[#EB4648] text-[#EB4648] bg-[#FCFCFC]':
                    compState.isMode == 'Attributes',
                }"
              >
                <p>Attributes</p>
              </div>
              <!-- <div
                @click="onChangeMode('Services')"
                :class="{
                  'h-10 w-[124px] flex justify-center items-center hover:cursor-pointer bg-[#EFEFEF] border border-[#B4B4B4] border-l-0': true,
                  'border-b-0 border-t-[#EB4648] text-[#EB4648] bg-[#FCFCFC]':
                    compState.isMode == 'Services',
                }"
              >
                <p>Services</p>
              </div> -->
              <!-- <div
                @click="onChangeMode('Camera')"
                :class="{
                  'h-10 w-[124px] flex justify-center items-center hover:cursor-pointer bg-[#EFEFEF] border border-[#B4B4B4] border-l-0': true,
                  'border-b-0 border-t-[#EB4648] text-[#EB4648] bg-[#FCFCFC]':
                    compState.isMode == 'Camera',
                }"
              >
                <p>Camera</p>
              </div> -->
              <div class="w-full border-b border-b-[#B4B4B4]"></div>
            </div>
          </div>
          <div class="flex-grow">
            <!-- Ensures this area grows to fit remaining space -->
            <MemberModal v-if="compState.isMode == 'Members'" />
            <CameraModal v-if="compState.isMode == 'Camera'" />
            <ServiceModel v-if="compState.isMode == 'Services'" />
            <AttributeModal v-if="compState.isMode == 'Attributes'" />
          </div>
        </div>
      </div>

      <transition name="fade">
        <CreateSiteModal
          v-if="compState.isCreateSiteModal"
          @cancel="onCloseCreateSite"
        />
      </transition>

      <transition name="fade">
        <DeleteSiteModal
          v-if="compState.isDeleteSiteModal"
          @cancel="onCloseDeleteSite"
        />
      </transition>
    </template>
  </MainBody>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import MainBody from "../MainBody.vue";
import MemberModal from "./MemberComp.vue";
import CameraModal from "./CameraComp.vue";
import AttributeModal from "./AttributeComp.vue";
import ServiceModel from "./ServiceComp.vue";
import CreateSiteModal from "./CreateSiteModal.vue";
import DeleteSiteModal from "./DeleteSiteModal.vue";
import { useRouter, useRoute } from "vue-router";
import { store } from "../../utility/store";

const router = useRouter();
const route = useRoute();

onMounted(() => {
  checkLogin();
  run();
});

const compState = reactive({
  isSite: {},
  isMode: "Members",
  isCreateSiteModal: false,
  isDeleteSiteModal: false,
  sites: [],
});

const onChangeSite = (site) => {
  compState.isSite = site;
  navigateTo(`/site/${site.id}`);
  store.siteSelected = site.name;
};
const onChangeMode = (mode) => {
  compState.isMode = mode;
};

const onCreateSite = () => {
  compState.isCreateSiteModal = true;
};

const onCloseCreateSite = () => {
  compState.isCreateSiteModal = false;
};

const onDeleteSite = () => {
  compState.isDeleteSiteModal = true;
};

const onCloseDeleteSite = () => {
  compState.isDeleteSiteModal = false;
};

const run = async () => {
  try {
    const accessToken = await fetchAccessToken();
    await fetchAllDetails(accessToken);
    const selectedSite = route.params.id
      ? compState.sites.find((site) => site.id == route.params.id)
      : compState.sites[0];
    onChangeSite(selectedSite || compState.sites[0]);
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

const navigateTo = (path) => {
  router.push(path);
};
const checkLogin = () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    navigateTo("/login");
  }
};
</script>
