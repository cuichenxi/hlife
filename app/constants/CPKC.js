import {Platform} from "react-native";

/**
 *  rOfQ8XGOt98_57EL3FJIogtaEFaL1847071a-a410-40be-8295-ea5fb8bf4b4a staging //安卓
 *  K6yVS_qXUMNuWuppkSEpFyOVmB921847071a-a410-40be-8295-ea5fb8bf4b4a Production  //安卓
 *  ttINUFwHSiyS40PcWa39-eTQB2Q5ryhtF9zA7  staging //ios
 *  37_lnnPrUpSXghoyqf-CpGYKPcZ_BJZnYF9z07 Production  //ios
 */
const ANDROID_KEY_STAGING = "rOfQ8XGOt98_57EL3FJIogtaEFaL1847071a-a410-40be-8295-ea5fb8bf4b4a";
const ANDROID_KEY_PRODUCTION = 'K6yVS_qXUMNuWuppkSEpFyOVmB921847071a-a410-40be-8295-ea5fb8bf4b4a';
const IOS_KEY_STAGING = "ttINUFwHSiyS40PcWa39-eTQB2Q5ryhtF9zA7";
const IOS_KEY_PRODUCTION = "37_lnnPrUpSXghoyqf-CpGYKPcZ_BJZnYF9z07";
export const CPKEY = {
    CP_KEY_STAGING: Platform.OS === 'android' ? ANDROID_KEY_STAGING : IOS_KEY_STAGING,
    CP_KEY_PRO: Platform.OS === 'android' ? ANDROID_KEY_PRODUCTION : IOS_KEY_PRODUCTION,
};