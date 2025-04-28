
import router from '@/router'
const coreServiceApi = 'https://core.trueeye.co'
const getStorageToken = () => {
    return sessionStorage.getItem('token') || ' '
  }

  export function handleUnAuth (res) {
    if (res.status === 401) {
      sessionStorage.clear()
      router.push('/login')
    }
  }

export async function getDashboardStat (payload) {
    const token = getStorageToken()
    const apiOtpToken = sessionStorage.getItem('api_otp_token') || ''
    const res = await fetch(`${coreServiceApi}/getDashboardStat`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Api-OTP-Token': apiOtpToken
      },
      method: 'post',
      body: JSON.stringify(payload)
    })
    handleUnAuth(res)
    return res
  }