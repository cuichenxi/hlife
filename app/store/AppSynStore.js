import UserStore from "./UserStore";
import ADStore from "./ADStore";
import globalStore from "./globalStore";
import BuyCarStore from "./BuyCarStore";

export default AppSynStore = {

    initData() {
        UserStore.initData()
        ADStore.initData()
        globalStore.initData()
        BuyCarStore.initData()
        // CookieStore.initData()
    },
}
