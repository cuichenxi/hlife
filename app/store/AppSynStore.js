import UserStore from "./UserStore";
import ADStore from "./ADStore";

export default AppSynStore = {

    initData() {
        UserStore.initData()
        ADStore.initData()
    },
}
