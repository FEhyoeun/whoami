<template>
  <div>
    <div>
      <div>
        <h4>영어 이름을 입력해주세요.</h4>
        <input v-model="user.name"/>
        <button @click="getInfo()">결과 확인!</button>
      </div>
      <div v-show="isShow">
        <div>
          <span>{{ `${showName}의 나이는 아마도... ${user.age}살이군요?` }}</span><br>
          <span>{{ `${showName}의 성별은 아마도... ${user.gender === 'female' ? '여자' : '남자'}군요?` }}</span>
        </div>
        <div>
          <span>결과 공유하기</span>
          <div>
            <span style="margin-right:10px;">카카오</span>
            <span style="margin-right:10px;">트위터</span>
            <span style="margin-right:10px;">URL</span>
          </div>
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
        alert('이름은 한글로 입력해주세요!')
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

</style>