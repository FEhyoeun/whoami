<template>
  <div class="wrap">
    <div class="contents">
      <div>
        <strong>당신의 영어 이름을 입력해주세요.</strong>
        <input class="name-input" v-model="user.name" @keypress.enter="getInfo()"/><br />
        <button class="result-btn" @click="getInfo()">결과 확인 🎉</button>
      </div>
      <div class="result-content" v-show="isShowResult">
        <div class="tenor-gif-embed" data-postid="17399212" data-share-method="host" data-aspect-ratio="1" data-width="100%">
          <a href="https://tenor.com/view/emoji-spin-hmm-thinking-thinking-emoji-gif-17399212">Emoji Spin Sticker</a>from
          <a href="https://tenor.com/search/emoji-stickers">Emoji Stickers</a>
        </div>
        <ul>
          <li>{{ `${showName}님의 나이는 아마도... ${user.age}살이군요?` }}</li>
          <li>{{ `${showName}님의 성별은 아마도... ${user.gender === 'female' ? '여자' : '남자'}군요?` }}</li>
        </ul>
        <div class="test-share-content">
          <h4>테스트 공유하기</h4>
          <div class="share-sns">
            <button @click="sendKakaoLink()">카카오</button>
            <button @click="sendTwitterLink()">트위터</button>
            <button @click="copyURL()">URL</button>
          </div>
        </div>
      </div>
    </div>
    <Alert v-if="isShowModal" @close="isShowModal = false">
      <h3 slot="header">
        알림!
        <i class="fas fa-times close-modal-btn" @click="isShowModal = false"></i>
      </h3>
      <div slot="body">{{ msg }}</div>
    </Alert>
  </div>
</template>

<script>
import Alert from "./Alert";
export default {
  name: "Index",
  components: { Alert },
  data() {
    return {
      user: {
        name: '',
        age: 0,
        gender: '',
      },
      isShowResult : false,
      isShowModal : false,
      showName : '',
      msg: '',
      currentUrl: '',
    }
  },
  created() {
    this.currentUrl = window.document.location.href;
  },
  methods: {
    getInfo() {
      if(this.user.name === '') {
        this.isShowModal = !this.isShowModal;
        this.isShowResult = false;
        this.msg = '이름을 입력해주세요!';
      } else if(this.$checkKorean(this.user.name)) {
        this.isShowModal = !this.isShowModal;
        this.isShowResult = false;
        this.msg = '이름은 영어로 입력해주세요!';
        return
      }

      this.showName = this.user.name
      this.$GET(`https://api.agify.io/?name=${this.user.name}`, (result) => {
        this.user.age = result.age;
        this.isShowResult = true;
      }, () => {
        console.error(`나이 요청 실패!`);
      })
      this.$GET(`https://api.genderize.io/?name=${this.user.name}`, (result) => {
        this.user.gender = result.gender;
        this.isShowResult = true;
      }, () => {
        console.error(`성별 요청 실패!`);
      })

      this.clearName()
    },
    clearName() {
      this.user.name = '';
    },
    sendKakaoLink() {
      window.Kakao.init(process.env.VUE_APP_KAKAO_LINK)
      window.Kakao.Link.sendDefault({
        objectType: 'text',
        text: '당신의 영어 이름을 입력하시면, 성별과 나이를 추측해드립니다!',
        link: {
          mobileWebUrl: this.currentUrl,
          webUrl: this.currentUrl,
        }
      })
    },
    sendTwitterLink() {
      const sendText = "Who am I 👀? 영어 이름을 입력하고 내 나이와 성별을 알아보자!";
      const sendUrl = this.currentUrl;
      window.open(`https://twitter.com/intent/tweet?text=${sendText}&url=${sendUrl}`);
    },
    copyURL() {
      let t = document.createElement("textarea");
      document.body.appendChild(t);
      t.value = this.currentUrl;
      t.select();
      document.execCommand('copy');
      document.body.removeChild(t);

      this.isShowModal = !this.isShowModal;
      this.msg = 'URL이 복사되었습니다!';
    },
  },
}
</script>

<style scoped>
.wrap {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.contents {
  background: white;
  border-radius: 15px;
  padding: 30px;
  width: 50vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

@media (min-width: 290px) {
  .contents strong {
    font-size: 25px;
  }
}

.tenor-gif-embed {
  width: 200px;
  height: 200px;
}

.tenor-gif-embed > div {
  padding-top: 0px;
}

@media (max-width: 480px) {
  .tenor-gif-embed {
    display: none;
  }
}

.result-content {
  justify-content: center;
  align-items: center;
  align-content: center;
}

.test-share-content {
  margin-top: 20px;
}

.name-input {
  border-radius: 15px;
  font-size: 20px;
  width: 70%;
}

.result-btn {
  border: none;
  border-radius: 5px;
  width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 50px;
  background: #F2F7FF;
  font-size: 20px;
  margin: 15px 0px 15px 0;
  cursor: pointer;
}

@media (max-width: 290px) {
  .result-btn {
    font-size: 15px;
  }
}

.share-sns {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.share-sns > button:not(:last-child) {
  margin-right: 10%;
}

.share-sns > button {
  border: none;
  background: none;
  font-size: 16px;
}

.share-sns > button:hover {
  font-weight: 600;
  cursor: pointer;
}

.share-sns > button:active {
  position: relative;
  top: 2px;
}

</style>