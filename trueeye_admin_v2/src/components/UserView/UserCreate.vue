<template>
  <MainBody>
    <template v-slot:maincomponent>
      <div class="p-6">
        <p class="text-2xl/6 text-[#a4a4a4]">Create Account</p>
        <div class="w-[985px] pt-7 grid grid-cols-2 gap-x-4 gap-y-2">
          <div class="w-full h-[78px]">
            <p class="mb-2 text-[#a4a4a4]">Username <span class="text-[#EB4648] text-sx">*</span></p>
            <input
              class="w-full h-10 p-2 rounded border-[1px] border-[#a4a4a4]"
              v-model="compState.username"
            />
          </div>
          <div class="w-full h-[78px]">
            <p class="mb-2 text-[#a4a4a4]">Email <span class="text-[#EB4648] text-sx">*</span></p>
            <input
              class="w-full h-10 p-2 rounded border-[1px] border-[#a4a4a4]"
              v-model="compState.email" type="email" placeholder="example@email.com"
            />
          </div>
          <div class="w-full h-[78px]">
            <p class="mb-2 text-[#a4a4a4]">Frist name <span class="text-[#EB4648] text-sx">*</span></p>
            <input
              class="w-full h-10 p-2 rounded border-[1px] border-[#a4a4a4]"
              v-model="compState.firstName"
            />
          </div>
          <div class="w-full h-[78px]">
            <p class="mb-2 text-[#a4a4a4]">Last name <span class="text-[#EB4648] text-sx">*</span></p>
            <input
              class="w-full h-10 p-2 rounded border-[1px] border-[#a4a4a4]"
              v-model="compState.lastName"
            />
          </div>
          <div class="w-full h-[78px]">
            <p class="mb-2 text-[#a4a4a4]">Telephone Number <span class="text-[#EB4648] text-sx">*</span></p>
            <input
              class="w-full h-10 p-2 rounded border-[1px] border-[#a4a4a4]"
              v-model="compState.phone"  type="tel" maxLength="10" minLength="10" @input="sanitize"
            />
          </div>
          <div
            @click="onSetPasswordModal"
            class="w-full h-[78px] cursor-pointer"
          >
            <p class="mb-2 text-[#a4a4a4]">Set Password <span class="text-[#EB4648] text-sx">*</span></p>
            <div :class="[compState.password === '' ? 'bg-[#EB4648]' : 'bg-[#a4a4a4]']"
                  class="w-full h-10 p-2 rounded text-center text-white">
                  {{ compState.password === '' ? 'Set password' : 'Password Set' }}
            </div>
          </div>
        </div>

        <p class="py-2 text-[#a4a4a4]">Sites</p>
        <div class="w-full flex flex-wrap gap-4">
          <div
            v-if="compState.sites.length > 0"
            class="w-[207px] bg-white h-16 p-2 rounded justify-center items-center gap-2 inline-flex border-[1px] border-[#a4a4a4]"
          >
            <div class="truncate">
              <ul>
                <li v-for="site in compState.sites" :key="site.id">
                  {{ site.name || "" }}
                </li>
              </ul>
            </div>
            <svg
              @click="onJoinSitesModal"
              class="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18.3 5.70973C17.91 5.31973 17.28 5.31973 16.89 5.70973L12 10.5897L7.10997 5.69973C6.71997 5.30973 6.08997 5.30973 5.69997 5.69973C5.30997 6.08973 5.30997 6.71973 5.69997 7.10973L10.59 11.9997L5.69997 16.8897C5.30997 17.2797 5.30997 17.9097 5.69997 18.2997C6.08997 18.6897 6.71997 18.6897 7.10997 18.2997L12 13.4097L16.89 18.2997C17.28 18.6897 17.91 18.6897 18.3 18.2997C18.69 17.9097 18.69 17.2797 18.3 16.8897L13.41 11.9997L18.3 7.10973C18.68 6.72973 18.68 6.08973 18.3 5.70973Z"
                fill="#A4A4A4"
              />
            </svg>
          </div>
          <div
            v-if="compState.sites.length <= 0"
            @click="onJoinSitesModal"
            class="w-[207px] h-16 p-2 bg-[#EB4648] rounded justify-center items-center gap-2 inline-flex cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"
                fill="white"
              />
            </svg>
            <div class="grow text-center text-white">Join Sites</div>
          </div>
        </div>
        <div class="flex gap-4 mt-8">
          <div
            class="w-[182px] h-10 p-2 border-[#a4a4a4] border rounded cursor-pointer"
          >
            <div class="grow text-center text-[#a4a4a4]">Cancel</div>
          </div>
          <button
            @click="onSaveUserModal"
            :disabled="!canSubmit"
            class="w-[182px] h-10 p-2 bg-[#EB4648] rounded cursor-pointer disabled:bg-[#a4a4a4] disabled:cursor-not-allowed">
            <div class="grow text-center text-white">Save</div>
          </button>
        </div>
      </div>
      <transition name="fade">
        <SetPasswordModal
          v-if="compState.isSetPasswordModal"
          @cancel="onCloseSetPasswordModal"
          @confirm="onConfirmSetPasswordModal"
        />
      </transition>
      <transition name="fade">
        <JoinSitesModal
          v-if="compState.isJoinSitesModal"
          @cancel="onCloseJoinSitesModal"
          @confirm="onConfirmJoinSitesModal"
        />
      </transition>
      <transition name="fade">
        <SaveUserModal
          v-if="compState.isSaveUserModal"
          @cancel="onCloseSaveUserModal"
          @confirm="onConfirmSaveUserModal"
        />
      </transition>
      <transition name="fade">
        <ErrorUserModal
          v-if="compState.isErrorUserModal"
          @cancel="onCloseErrorUserModal"
        />
      </transition>
    </template>
  </MainBody>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import SetPasswordModal from "./SetPasswordModal.vue";
import JoinSitesModal from "./JoinSitesModal.vue";
import SaveUserModal from "./SaveUserModal.vue";
import ErrorUserModal from "./ErrorUserModal.vue";
import MainBody from "@/components/MainBody.vue";
import { useRoute } from "vue-router";

// import { store } from "../../utility/store.js";

const router = useRoute();

onMounted(() => {
  checkLogin();
});
const compState = reactive({
  isSetPasswordModal: false,
  isJoinSitesModal: false,
  isErrorUserModal: false,
  sites: [],
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
});

const sanitize = (event) => {
  let input = event.target.value
  input = input.replace(/[^0-9]/g, '')
  if (input === '') {
    event.target.value = ''
    return
  }
  compState.phone = input
}

const canSubmit = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (compState.username && compState.firstName && compState.lastName && emailRegex.test(compState.email) && compState.phone && compState.password)
})

// const memberSite = () => {
//   store.memberSite = compState.sites[0].name;
// };

const onSetPasswordModal = () => {
  compState.isSetPasswordModal = true;
};

const onCloseSetPasswordModal = () => {
  compState.isSetPasswordModal = false;
};
const onJoinSitesModal = () => {
  compState.isJoinSitesModal = true;
};

const onCloseJoinSitesModal = () => {
  compState.isJoinSitesModal = false;
};

const onSaveUserModal = () => {
  compState.isSaveUserModal = true;
};

const onCloseSaveUserModal = () => {
  compState.isSaveUserModal = false;
};
// const onErrorUserModal = () => {
//   compState.isErrorUserModal = true;
// };

const onCloseErrorUserModal = () => {
  compState.isErrorUserModal = false;
};


const onConfirmSetPasswordModal = (value) => {
 compState.password = value
 onCloseSetPasswordModal()
};

const onConfirmJoinSitesModal = () => {};

const onConfirmSaveUserModal = async () => {
  try {
    const accessToken = await fetchAccessToken();
    await createUserData(accessToken);
    // memberSite();
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

const createUserData = async (accessToken) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", accessToken);

  const raw = JSON.stringify({
    username: compState.username,
    firstName: compState.firstName,
    lastName: compState.lastName,
    email: compState.email,
    emailVerified: false,
    enabled: true,
    attributes: {
      locale: ["th"],
      phone: [compState.phone],
    },
  credentials: [
    {
      type: "password",
      value: compState.password,
      temporary: false
    }
  ]
  
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://id.trueeye.co/admin/realms/master/users/", requestOptions)
  .then((response) => response.text())
  .then(() => {
    compState.isSaveUserModal = false;
  })
  .catch(() => {
    compState.isErrorUserModal = true;
  });
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
