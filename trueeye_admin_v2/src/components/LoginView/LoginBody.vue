<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  />
  <div class="relative w-screen h-[100dvh] min-h-[640px] overflow-hidden">
    <img
      :src="trueEyeBanner"
      class="absolute -left-[4px] -top-1 h-[106px]"
      alt=""
    />
    <div class="absolute mt-32 sm:mt-[152px] xl:mt-16 w-full">
      <p
        class="font-medium text-center text-[#D1D1D1] tracking-[2.75px] sm:tracking-[0.5rem]"
      >
        THE FIRST AI FOR NCD SCREENING
      </p>
    </div>
    <img
      v-if="compState.isDesktop"
      :src="loginTopBG"
      class="absolute right-0 -top-1 h-[84px]"
      alt=""
    />
    <img
      v-else-if="compState.isMobile || compState.isTablet"
      :src="loginTopMobileBG"
      class="absolute right-0 -top-1 h-[84px]"
      alt=""
    />
    <img
      v-if="compState.isDesktop"
      :src="loginBottomBG"
      class="absolute -left-1 -bottom-1 w-[620px] h-[126px]"
      alt=""
    />
    <img
      v-else-if="compState.isMobile || compState.isTablet"
      :src="loginBottomMobileBG"
      class="absolute -left-1 -bottom-1 h-[84px]"
      alt=""
    />
    <div class="w-full h-full flex justify-center items-center">
      <div class="grid grid-cols-2 px-8 xl:px-0 w-full sm:w-[400px]">
        <p class="col-span-2 font-medium text-center text-xl text-black">
          Log in
        </p>
        <div class="h-5 col-span-2">
          <p
            v-if="compState.isLoginErr"
            class="font-medium text-center text-sm text-[#EB4648]"
          >
            อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณากรอกข้อมูลใหม่
          </p>
        </div>
        <input
          @focus="compState.isLoginErr = false"
          v-model="compState.username"
          class="col-span-2 mt-2 pl-5 h-[40px] rounded border-[#D1D1D1] font-light text-[#D1D1D1] placeholder-[#D1D1D1] focus:text-[#999999] focus:border-[#EB4648] focus:ring-[#EB4648]"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />
        <div class="relative col-span-2 mt-8">
          <input
            :type="compState.showPassword ? 'text' : 'password'"
            @focus="compState.isLoginErr = false"
            v-model="compState.password"
            class="pl-5 h-[40px] rounded border-[#D1D1D1] font-light text-[#D1D1D1] placeholder-[#D1D1D1] focus:text-[#999999] focus:border-[#EB4648] focus:ring-[#EB4648] w-full"
            name="password"
            id="password"
            placeholder="Password"
          />
          <i
            :class="
              !compState.showPassword
                ? 'fa-regular fa-eye-slash'
                : 'fa-regular fa-eye'
            "
            class="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
            @click="togglePasswordVisibility"
          ></i>
        </div>

        <!-- <div class="col-span-1 mt-5 flex justify-start items-center">
          <input
            type="checkbox"
            class="checkbox-img w-4 h-4 focus:ring-transparent bg-transparent checked:border-[#EB4648] border-[1.5px] rounded border-[#9F9F9F]"
            name=""
            id="remember"
          />
          <span
            class="font-medium ml-4 pb-[2px] text-xs text-[#A4A4A4] translate-y-[2px]"
            >Remember me</span
          >
        </div>
        <div class="col-span-1 mt-5 flex justify-end items-center">
          <a href=""
            ><span class="font-medium text-xs text-[#A4A4A4] translate-y-[2px]"
              >Forget password</span
            ></a
          >
        </div> -->
        <div class="py-4"></div>
        <button
          @click="onLogin"
          class="col-span-2 mt-7 rounded bg-[#EB4648] h-[40px] flex justify-center items-center gap-3"
        >
          <img class="h-[12px] w-[10px]" :src="loginIcon" alt="" />
          <span class="text-white font-normal text-[14px]">Log in</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import trueEyeBanner from "@/assets/Trueeye backend Icon/trueye_banner.png";
import loginTopBG from "@/assets/Trueeye backend Icon/LoginTopBG.png";
import loginTopMobileBG from "@/assets/Trueeye backend Icon/LoginTopMobileBG.png";
import loginBottomBG from "@/assets/Trueeye backend Icon/LoginBottomBG.png";
import loginBottomMobileBG from "@/assets/Trueeye backend Icon/LoginBottomMobileBG.png";
import loginIcon from "@/assets/Trueeye backend Icon/LoginIcon.png";
// import signUpIcon from '@/assets/Trueeye backend Icon/SignUpIcon.png'
import { reactive } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { jwtDecode } from "jwt-decode";
import router from "@/router";
// import fetcher from '@/Utility/fetcher'

const compState = reactive({
  username: "",
  password: "",
  isDesktop: useMediaQuery("(min-width: 1280px)"),
  isTablet: useMediaQuery("(min-width: 640px) and (max-width: 1279px)"),
  isMobile: useMediaQuery("(max-width: 639px)"),
  isLoginErr: false,
  language: "th",
  showPassword: false,

});

const onLogin = () => {
  const loginHeader = new Headers();
  loginHeader.append("Content-Type", "application/x-www-form-urlencoded");

  const loginParams = new URLSearchParams();
  loginParams.append("username", compState.username);
  loginParams.append("password", compState.password);
  loginParams.append("client_id", "TRUEEYE_SERVICE");
  loginParams.append("grant_type", "password");
  loginParams.append("client_secret", "VA3GHImiEK8wzEpwmFg2ixuzfRFDwU7C");

  const requestOptions = {
    method: "POST",
    headers: loginHeader,
    body: loginParams,
    redirect: "follow",
  };

  fetch(
    "https://id.trueeye.co/realms/master/protocol/openid-connect/token",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.access_token) {
        const decoded = jwtDecode(result.access_token);
        console.log(decoded);
        sessionStorage.setItem("token", result.access_token);
        sessionStorage.setItem("name", decoded.preferred_username);
        if (decoded.realm_access.roles.includes('admin')) {
    router.push("/user");
  } else {
    console.log("Admin role not found");
    compState.isLoginErr = true;
  }
      } else {
        console.log(result.error);
        compState.isLoginErr = true;
      }
    })
    .catch((error) => {
      console.error(error);
      compState.isLoginErr = true;
    });
};

const togglePasswordVisibility = () => {
  compState.showPassword = !compState.showPassword;
};
</script>

<style scoped>
.checkbox-img:checked {
  /* background-image: url('@/assets/Trueeye backend Icon/checkWhite.png'); */
  color: #eb4648;
}
</style>
