import UserStore from "./UserStore";
import ADStore from "./ADStore";
import globalStore from "./globalStore";

export default AppSynStore = {

    initData() {
        UserStore.initData()
        ADStore.initData()
        globalStore.initData()
        // CookieStore.initData()
    },
}
