import axios from "axios";
import qs from 'qs'
const data ={
  av:100023299027133,
  __aaid:0,
  __user:100023299027133,
  __a:1,
  __req:16,
  __hs:"20075.HYP:comet_pkg.2.1.0.2.1",
  dpr:1,
  __ccg:'EXCELLENT',
  __rev:1018957020,
  __s:'f07g9p:q0n0r1:biwo28',
  __hsi:'7449655578661929144',
  __dyn:'7xeXxaU5a5Q1ryaxG4Vp41twWwIxu13wFwhUngS3q2ibwNw9G2Saw8i2S1DwUx60GE3Qwb-q7oc81EEc87m221Fwgo9oO0-E4a3a4oaEnxO0Bo7O2l2Utwqo31wiE567Udo5qfK0zEkxe2GewGwkUe9obrwh8lwUwgojUlDw-wUwxwjFovUaU3VwLKq2-azqwaW223908O3216xi4UK2K364UrwFg2fwxyo566k1FwgU4q3Gfw-KnzUiBG2OUqwjVqwLwHwGwbu5E4C',
  __csr:'g8A4Q8jMF5hknsYl7OiRliYv4A4Ohfn36yTqX4RFaIzX-llvGCh8BtcRayvjfFVdy2FFblTKWvHHKLhrQFH-tKgChul2LP9HlqBACUCqcyeaCyrybxN4AQK-qqqEyiXBpEyGDF7x2idzV99KUhgGLGm48gG7fCwwyUbFEG6UXy8syV8qKfx25pp8d8Lh8vwECwzxfG265qxi6EGEdoS3afx-9G4Ey3-1dwTwSxK1ExScwZxq2i13whodUy1_wh86S3y0zE0iOCw5VwTw5rG0zo0xC1GwqU5Ch4U0R2014Yw1cSVE03Esw3IVndw2do1HU0MR02Z2K58lU1x82Pw8m05iUeo1dK0HEix-06-e0W80NG0sq0hF01v-01svg0gSw0hc8',
  __comet_req:15,
  locale:'vi_VN',
  fb_dtsg:'NAcNeiFe9q6jvOmvl2KQYWFZQ1TIkIXhCTHHMMWL1pashp8_yJvWkjw:24:1734502613',
  jazoest:25574,
  lsd:'vSv7TJli2icvo7svR4emWq',
  __spin_r:1018957020,
  __spin_b:'trunk',
  __spin_t:1734508103,
  fb_api_caller_class:'RelayModern',
  fb_api_req_friendly_name:'GroupsCometFeedRegularStoriesPaginationQuery',
  variables:{"count":3,"cursor":"Cg8TZXhpc3RpbmdfdW5pdF9jb3VudAICDwtyZWFsX2N1cnNvcg+fQVFIUko5SXlDTzRKclM1VFF2MXVyYUljWGdteVY0RnNsaEllQ3NYSU9XVVZKYlU5SzhrVWpyRmFSdWhOa2Y1UENVOWJLZ3FGTnhmTTRYekswYThHakVRNkd3OmV5SXdJam94TnpNME5UQTRNVEF6TENJeElqbzNOamd5TENJeklqb3dMQ0kwSWpveExDSTFJam95TENJMklqb3dmUT09DxNoZWFkZXJfZ2xvYmFsX2NvdW50AgEPEm1haW5fZmVlZF9wb3NpdGlvbgICDw1mZWVkX29yZGVyaW5nDxtyYW5rZWRfaW50ZXJlc3RfY29tbXVuaXRpZXMPE2lzX2V2ZXJncmVlbl9jdXJzb3IRAA8iaXNfb2ZmbGluZV9hZ2dyZWdhdGVkX3Bvc3RzX2N1cnNvchEADxJncm91cF9mZWVkX3ZlcnNpb24PAlYyDxBkZW1vdGVkX3Bvc3RfaWRzCgEB","feedLocation":"GROUP","feedType":"DISCUSSION","feedbackSource":0,"focusCommentID":null,"privacySelectorRenderLocation":"COMET_STREAM","renderLocation":"group","scale":1,"sortingSetting":"TOP_POSTS","stream_initial_count":1,"useDefaultActor":false,"id":"314810416899010","__relay_internal__pv__GHLShouldChangeAdIdFieldNamerelayprovider":false,"__relay_internal__pv__GHLShouldChangeSponsoredDataFieldNamerelayprovider":false,"__relay_internal__pv__IsWorkUserrelayprovider":false,"__relay_internal__pv__CometFeedStoryDynamicResolutionPhotoAttachmentRenderer_experimentWidthrelayprovider":500,"__relay_internal__pv__CometImmersivePhotoCanUserDisable3DMotionrelayprovider":false,"__relay_internal__pv__IsMergQAPollsrelayprovider":false,"__relay_internal__pv__FBReelsMediaFooter_comet_enable_reels_ads_gkrelayprovider":false,"__relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider":false,"__relay_internal__pv__CometUFIShareActionMigrationrelayprovider":true,"__relay_internal__pv__StoriesArmadilloReplyEnabledrelayprovider":true,"__relay_internal__pv__EventCometCardImage_prefetchEventImagerelayprovider":false},
  server_timestamps:true,
  doc_id:'9622104781150262'


}
const getData = async()=>{
  try{
    const response = await axios.post('https://www.facebook.com/api/graphql/',data,
      {
        headers:{
          'accept': '*/*',
          'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
          'content-type': 'application/x-www-form-urlencoded',
          'cookie': 'sb=yY8PZ2hJgS4IYsJYftGlwNxP; datr=yY8PZ8-6cScq5TTemNkDKhaE; dpr=1.25; ps_l=1; ps_n=1; c_user=100023299027133; b_user=61569696612164; xs=24%3AhOARNA8N7E4cGw%3A2%3A1734502613%3A-1%3A6340%3AFyXLaVzW4NzA7A%3AAcV47HgGnxSWyP5BQPSGyS_WriFXDAawveQ5QqjHdA; usida=eyJ2ZXIiOjEsImlkIjoiQXNvb2hraDEwaWowYnEiLCJ0aW1lIjoxNzM0NTA2OTAzfQ%3D%3D; fr=16gJ0IJLBovKyr1FI.AWWBie6Z7SLSIPirDSUvCPPe7dQ.BnYnky..AAA.0.0.BnYnvw.AWVCZpbjCD4; wd=1280x403; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1734508111056%2C%22v%22%3A1%7D',
          'origin': 'https://www.facebook.com',
          'priority':'u=1, i',
          'referer': 'https://www.facebook.com/groups/314810416899010?locale=vi_VN',
          'sec-ch-prefers-color-scheme': 'dark',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-full-version-list':'"Google Chrome";v="131.0.6778.140", "Chromium";v="131.0.6778.140", "Not_A Brand";v="24.0.0.0"',
          'sec-ch-ua-mobile':'?0',
          'sec-ch-ua-model':'sec-ch-ua-model',
          'sec-ch-ua-platform': '"Windows"',
          'sec-ch-ua-platform-version':'"19.0.0"',
          'sec-fetch-dest':'empty',
          'sec-fetch-mode':'cors',
          'sec-fetch-site':'same-origin',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
          'x-asbd-id':'129477',
          'x-fb-friendly-name': 'GroupsCometFeedRegularStoriesPaginationQuery',
          'x-fb-lsd': 'vSv7TJli2icvo7svR4emWq',
        },

      }
    )
    console.log(response.data)


  }catch(error){
    console.log(error)
  }

}
export default getData