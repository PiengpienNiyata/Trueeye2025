export const fetchAccessToken = async () => {
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

// const fetchAccessToken = async () => {
//   const response = await fetch(
//     "https://id.trueeye.co/realms/master/protocol/openid-connect/token",
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams({
//         username: "trueeye_admin",
//         password: "trueeye_adminpwd",
//         client_id: "TRUEEYE_SERVICE",
//         grant_type: "password",
//         client_secret: "VA3GHImiEK8wzEpwmFg2ixuzfRFDwU7C",
//         scope: "openid",
//       }),
//       redirect: "follow",
//     }
//   );
//   const { access_token } = await response.json();
//   if (!access_token) throw new Error("Access token not found in the response.");
//   return `Bearer ${access_token}`;
// };