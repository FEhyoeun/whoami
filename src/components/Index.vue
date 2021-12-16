<template>
  <div class="wrap">
    <div class="contents">
      <div>
        <h1>당신의 영어 이름을 입력해주세요.</h1>
        <input class="nameInput" v-model="user.name" @keypress.enter="getInfo()"/><br />
        <button class="resultBtn" @click="getInfo()">결과 확인!</button>
      </div>
      <div class="result-content" v-show="isShow">
        <ul>
          <li>{{ `${showName}님의 나이는 아마도... ${user.age}살이군요?` }}</li>
          <li>{{ `${showName}님의 성별은 아마도... ${user.gender === 'female' ? '여자' : '남자'}군요?` }}</li>
        </ul>
        <div>
          <h4>결과 공유하기</h4>
          <ul class="shareSNS">
            <li>카카오</li>
            <li>트위터</li>
            <li>URL</li>
          </ul>
        </div>
      </div>
    </div>

    <input type="button" @click="sendLinkCustom()" value="Custom"/>

    <Alert v-if="showModal" @close="showModal = false">
      <h3 slot="header">
        알림!
      <i class="fas fa-times closeModalBtn" @click="showModal = false"></i>
      </h3>
      <div slot="body">할 일을 입력하세요.</div>
<!--      <div slot="footer">테스트?</div>-->
    </Alert>
  </div>
</template>

<script>
import Alert from "./Alert";
export default {
  name: "Index",
  components: {Alert},
  data() {
    return {
      user: {
        name: '',
        age: 0,
        gender: '',
      },
      isShow : false,
      showName : '',
      showModal : false,
    }
  },
  created() {

  },
  methods: {
    getInfo() {
      if(this.user.name === '') {
        this.showModal = !this.showModal;
        //alert('이름을 입력해주세요!')
      } else if(this.$checkKorean(this.user.name)) {
        alert('이름은 영어로 입력해주세요!')
        return
      }

      this.showName = this.user.name
      this.$GET(`https://api.agify.io/?name=${this.user.name}`, (result) => {
        this.user.age = result.age
        this.isShow = true
      }, () => {
        console.error(`나이 요청 실패!`);
      })
      this.$GET(`https://api.genderize.io/?name=${this.user.name}`, (result) => {
        this.user.gender = result.gender
        this.isShow = true
      }, () => {
        console.error(`성별 요청 실패!`);
      })

      this.clearName()
    },
    clearName() {
      this.user.name = ''
    },

    sendLinkCustom() {
      window.Kakao.init(process.env.VUE_APP_KAKAO_LINK)
      window.Kakao.Link.sendDefault({
            objectType: 'text',
            text:
                '기본 템플릿으로 제공되는 텍스트 템플릿은 텍스트를 최대 200자까지 표시할 수 있습니다. 텍스트 템플릿은 텍스트 영역과 하나의 기본 버튼을 가집니다. 임의의 버튼을 설정할 수도 있습니다. 여러 장의 이미지, 프로필 정보 등 보다 확장된 형태의 카카오링크는 다른 템플릿을 이용해 보낼 수 있습니다.',
            link: {
              mobileWebUrl:
                  'https://developers.kakao.com',
              webUrl:
                  'https://developers.kakao.com'
            }
          }
      )
    }
  },
  watch: {

  }
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
  height: 70vh;
}

.result-content {
  justify-content: center;
  align-items: center;
  align-content: center;

}

.nameInput {
  border-radius: 15px;
  font-size: 20px;
}

.resultBtn {
  border: none;
  border-radius: 5px;
  width: 200px;
  height: 50px;
  background: #F2F7FF;
  font-size: 20px;
  margin: 15px 0px 15px 0;
  cursor: pointer;
}

.shareSNS {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.shareSNS > li {
  margin-right: 10px;
}

.shareSNS > li:hover {
  font-weight: 600;
  cursor: pointer;
}
</style>