<template>
  <div class="wrap">
    <div class="contents">
      <div>
        <h1>당신의 영어 이름을 입력해주세요.</h1>
        <input class="nameInput" v-model="user.name" @keypress.enter="getInfo()"/><br />
        <button class="resultBtn" @click="getInfo()">결과 확인!</button>
      </div>
      <div class="result-content" v-show="isShow">
        <list>
          <ul>{{ `${showName}님의 나이는 아마도... ${user.age}살이군요?` }}</ul>
          <ul>{{ `${showName}님의 성별은 아마도... ${user.gender === 'female' ? '여자' : '남자'}군요?` }}</ul>
        </list>
        <div>
          <h4>결과 공유하기</h4>
          <list class="shareSNS">
            <ul>카카오</ul>
            <ul>트위터</ul>
            <ul>URL</ul>
          </list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      user: {
        name: '',
        age: 0,
        gender: '',
      },
      isShow : false,
      showName : '',
    }
  },
  created() {

  },
  methods: {
    getInfo() {
      if(this.user.name === '') {
        alert('이름을 입력해주세요!')
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

.shareSNS > ul {
  margin-right: 10px;
}

.shareSNS > ul:hover {
  font-weight: 600;
  cursor: pointer;
}
</style>