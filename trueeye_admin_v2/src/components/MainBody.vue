<template>
  <div>
    <div class="p-0 m-0 min-w-[1280px] min-h-[720px] w-screen h-screen">
      <div class="grid grid-cols-12 h-full w-full overflow-hidden">
        <div
          class="select-none col-span-2 h-full bg-white shadow z-20 overflow-hidden flex flex-col"
        >
          <div class="w-full">
            <div class="h-[120px] w-full flex items-center">
              <img
                :src="trueEyeLogo"
                alt="trueEyeLogo"
                class="w-[80%] mx-auto"
              />
            </div>
          </div>
          <div class="w-full flex-grow overflow-y-scroll flex">
            <div class="flex flex-col items-center pt-5 w-full">
              <button
                class="pl-4 gap-2 flex w-full items-center h-[50px] text-[#a4a4a4]"
                :class="
                  currentRoute.includes('user') ? 'bg-[#EB4648] text-white' : ''
                "
                @click="navigateTo('/user')"
                title="User"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="22"
                  viewBox="0 0 18 20"
                  fill="none"
                >
                  <path
                    d="M1 19V18C1 14.6863 3.68629 12 7 12H11C14.3137 12 17 14.6863 17 18V19"
                    :fill="!currentRoute.includes('user') ? '#EB4648' : 'white'"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M9 9C6.79086 9 5 7.20914 5 5C5 2.79086 6.79086 1 9 1C11.2091 1 13 2.79086 13 5C13 7.20914 11.2091 9 9 9Z"
                    :fill="!currentRoute.includes('user') ? '#EB4648' : 'white'"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>

                <p class="pt-1">USER</p>
              </button>
              <button
                class="pl-4 gap-2 flex w-full items-center h-[50px] text-[#a4a4a4]"
                :class="
                  currentRoute.includes('site') ? 'bg-[#EB4648] text-white' : ''
                "
                @click="navigateTo('/site')"
                title="Site"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="14"
                  viewBox="0 0 22 12"
                  fill="none"
                >
                  <path
                    d="M12 6.75C13.63 6.75 15.07 7.14 16.24 7.65C17.32 8.13 18 9.21 18 10.38V11C18 11.55 17.55 12 17 12H7C6.45 12 6 11.55 6 11V10.39C6 9.21 6.68 8.13 7.76 7.66C8.93 7.14 10.37 6.75 12 6.75ZM4 7C5.1 7 6 6.1 6 5C6 3.9 5.1 3 4 3C2.9 3 2 3.9 2 5C2 6.1 2.9 7 4 7ZM5.13 8.1C4.76 8.04 4.39 8 4 8C3.01 8 2.07 8.21 1.22 8.58C0.48 8.9 0 9.62 0 10.43V11C0 11.55 0.45 12 1 12H4.5V10.39C4.5 9.56 4.73 8.78 5.13 8.1ZM20 7C21.1 7 22 6.1 22 5C22 3.9 21.1 3 20 3C18.9 3 18 3.9 18 5C18 6.1 18.9 7 20 7ZM24 10.43C24 9.62 23.52 8.9 22.78 8.58C21.93 8.21 20.99 8 20 8C19.61 8 19.24 8.04 18.87 8.1C19.27 8.78 19.5 9.56 19.5 10.39V12H23C23.55 12 24 11.55 24 11V10.43ZM12 0C13.66 0 15 1.34 15 3C15 4.66 13.66 6 12 6C10.34 6 9 4.66 9 3C9 1.34 10.34 0 12 0Z"
                    :fill="!currentRoute.includes('site') ? '#EB4648' : 'white'"
                  />
                </svg>

                <p class="pt-1">SITES</p>
              </button>
              <button
                class="pl-4 gap-2 flex w-full items-center h-[50px] text-[#a4a4a4]"
                :class="
                  currentRoute.includes('credit')
                    ? 'bg-[#EB4648] text-white'
                    : ''
                "
                @click="navigateTo('/credit')"
                title="Credit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                  d="M4 4h16a2 2 0 012 2v2H6a2 2 0 00-2 2v8h16v-2a1 1 0 112 0v2a4 4 0 01-4 4H6a4 4 0 01-4-4V8a4 4 0 014-4zm4 8a1 1 0 100-2 1 1 0 000 2z"
                  :fill="
                      !currentRoute.includes('credit') ? '#EB4648' : 'white'
                    "
                  />
                </svg>
                <p class="pt-1">CREDIT</p>
              </button>

              <button
                class="pl-4 gap-2 flex w-full items-center h-[50px] text-[#a4a4a4]"
                :class="
                  currentRoute.includes('summarize')
                    ? 'bg-[#EB4648] text-white'
                    : ''
                "
                @click="navigateTo('/summarize')"
                title="Summarize"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10z"
                    :fill="
                      !currentRoute.includes('summarize') ? '#EB4648' : 'white'
                    "
                  />
                </svg>
                <p class="pt-1">SUMMARIZE</p>
              </button>

             <!-- dashboard disable -->
              <!-- <button
                class="pl-4 gap-2 flex w-full items-center h-[50px] text-[#a4a4a4]"
                :class="
                  currentRoute.includes('dashboard')
                    ? 'bg-[#EB4648] text-white'
                    : ''
                "
                @click="navigateTo('/dashboard')"
                title="Dashboard"
              >
                <svg
                  width="32"
                  height="22"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    id="dashboard"
                    :stroke="
                      !currentRoute.includes('dashboard') ? '#EB4648' : 'white'
                    "
                    stroke-width="4"
                  >
                    <line x1="3" x2="29" y1="29" y2="29" />
                    <line x1="3" x2="3" y1="3" y2="29" />
                    <line x1="16" x2="16" y1="7" y2="25" />
                    <line x1="22" x2="22" y1="11" y2="25" />
                    <line x1="10" x2="10" y1="16" y2="25" />
                  </g>
                </svg>
                <p class="pt-1">DASHBOARD</p>
              </button> -->


<!-- Testing disable -->
               <!-- <button
                class="pl-4 gap-2 flex w-full items-center h-[50px] text-[#a4a4a4]"
                :class="
                  currentRoute.includes('testing')
                    ? 'bg-[#EB4648] text-white'
                    : ''
                "
                @click="navigateTo('/testing')"
                title="Testing"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M22.756 10H9.244C6.352 10 4 12.688 4 16C4 19.312 6.352 22 9.244 22H22.756C25.648 22 28 19.312 28 16C28 12.688 25.648 10 22.756 10ZM14.932 14.32L10.72 18.532C10.6 18.652 10.444 18.712 10.3 18.712C10.156 18.712 9.988 18.652 9.88 18.532L7.648 16.3C7.408 16.06 7.408 15.688 7.648 15.448C7.888 15.208 8.26 15.208 8.5 15.448L10.312 17.26L14.104 13.468C14.344 13.228 14.716 13.228 14.956 13.468C15.196 13.708 15.16 14.08 14.932 14.32Z"
                    :fill="
                      !currentRoute.includes('testing') ? '#EB4648' : 'white'
                    "
                  />
                </svg>
                <p class="pt-1">TESTING</p>
              </button> -->





            </div>
          </div>
          <div class="w-full h-[45px] relative">
            <div
              @click="onShowLogout"
              class="w-full h-[45px] flex gap-x-4 items-center pl-4 bg-[#E4E4E4] hover:cursor-pointer"
            >
              <img class="w-5 h-5" :src="userIcon" alt="" />
              <div class="text-sm leading-[14px] text-[#9F9F9F]">
                <p>{{ `${compState.userName}` }}</p>
              </div>
              <div class="right-2 absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M10.3 7.7C9.91 8.09 9.91 8.71 10.3 9.1L12.2 11H3C2.45 11 2 11.45 2 12C2 12.55 2.45 13 3 13H12.2L10.3 14.9C9.91 15.29 9.91 15.91 10.3 16.3C10.69 16.69 11.31 16.69 11.7 16.3L15.29 12.71C15.68 12.32 15.68 11.69 15.29 11.3L11.7 7.7C11.31 7.31 10.69 7.31 10.3 7.7ZM20 19H13C12.45 19 12 19.45 12 20C12 20.55 12.45 21 13 21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H13C12.45 3 12 3.45 12 4C12 4.55 12.45 5 13 5H20V19Z"
                    fill="#A4A4A4"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-10 h-full overflow-y-auto">
          <!-- Header  -->
          <div
            class="select-none w-full h-[7rem] bg-trueEye-theme grid grid-cols-12"
          >
            <div class="col-span-4 flex justify-start items-center">
              <span class="ml-5 font-[500] text-white text-[1.25rem]">{{
                compState.activePageText
              }}</span>
            </div>
            <div class="col-span-8 h-full flex items-end justify-end">
              <img
                :src="techIcon"
                class="h-[6rem] opacity-40 w-auto relative bottom-[-0.25rem]"
                alt="techIcon"
              />
            </div>
          </div>
          <!-- Main Component -->
          <div class="w-full h-[calc(100%_-_7rem)] relative overflow-y-scroll">
            <slot name="maincomponent"></slot>
          </div>
        </div>
      </div>
      <slot name="modal"></slot>
    </div>
  </div>
  <transition name="fade">
    <LogoutModel
      v-if="compState.isShowLogoutModel"
      @cancel="onCancelLogout"
      @confirm="onLogout"
    />
  </transition>
</template>

<script setup>
import { reactive, computed, onBeforeUnmount } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";
import LogoutModel from "./LoginView/LogoutModel.vue";
// icon imported
import trueEyeLogo from "@/assets/Trueeye backend Icon/Logo 2.png";
import techIcon from "@/assets/Trueeye backend Icon/Group 73.png";
import userIcon from "@/assets/Trueeye backend Icon/User settings icon-R.png";

const route = useRoute();
const router = useRouter();

const compState = reactive({
  isDesktop: useMediaQuery("(min-width: 1280px)"),
  isTablet: useMediaQuery("(min-width: 640px) and (max-width: 1279px)"),
  isMobile: useMediaQuery("(max-width: 639px)"),
  station: null,
  getPatientintervalId: null,
  isShowLogoutModel: false,
  activePageText:
    route.name === "siteView"
      ? "SITES"
      : route.name === "dashboard"
      ? "DASHBOARD"
      : route.name === "testing"
      ? "TESTING"
      : route.name === "credit"
      ? "CREDIT"
      : route.name === "summarize"
      ? "SUMMARIZE"
      : "USER",
  userName: sessionStorage.getItem("name"),
  singleUpload: sessionStorage.getItem("single_upload") === "true",
});
const currentRoute = computed(() => {
  return route.path;
});

const navigateTo = (path) => {
  router.push(path);
};
const onLogout = () => {
  sessionStorage.clear();
  navigateTo("/login");
};
const onCancelLogout = () => {
  compState.isShowLogoutModel = false;
};

const onShowLogout = () => {
  compState.isShowLogoutModel = true;
};
const stopGetPatientInterval = () => {
  clearInterval(compState.getPatientintervalId);
};

onBeforeUnmount(() => {
  stopGetPatientInterval();
});
</script>
<style>
.bg-trueEye-theme {
  background: linear-gradient(
    93.83deg,
    #eb4648 3.16%,
    #f28a8b 48.46%,
    #f49899 56.63%,
    #ffffff 133.52%
  );
}

/* transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
