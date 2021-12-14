import axios from "axios";

export default Object.freeze({
    install(Vue) {
        Vue.prototype.$GET = function (callUrl, success, fail) {
            axios.get(callUrl)
            .then(res => {
                success(res.data)
            }).catch(e => {
                fail(e.response)
            })
        }

        Vue.prototype.$checkKorean= function (_word) {
            const korean = /[ㄱ-ㅎ]|[ㅏ-ㅣ]|[가-힣]/;
            return korean.test(_word);
        }
    }
})

