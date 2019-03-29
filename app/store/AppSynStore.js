import UserStore from "./UserStore";
import ADStore from "./ADStore";
import CookieStore from "./CookieStore";

export default AppSynStore = {

    initData() {
        UserStore.initData()
        ADStore.initData()
        CookieStore.initData()
    },
}
