<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>
          <div class="modal-body">
            <slot name="body">default body</slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                CLOSE
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Alert"
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 40vw;
  height: 20vh;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

@media (min-width: 750px) {
  .modal-container {
    width: 200px;
    height: 20vh;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
}

.modal-header h3 {
  margin-top : 0px;
  color: #42b983;
}

.modal-body {
  margin: 20px 0px;
  word-wrap: break-word;
}

.modal-default-button {
  text-align: center;
  border: none;
  border-radius: 5px;
  background: lightgray;
  color: white;
  margin: 0px;
  padding: 10px;
}

@media (max-width: 240px) {
  .modal-body {
    margin: 0px;
  }
  .modal-default-button {
    text-align: center;
    border: none;
    border-radius: 5px;
    background: lightgray;
    color: white;
    margin: 0px;
    width: 50px;
    height: 30px;
    padding: 0px;
  }
}

.modal-default-button:hover {
  transition: all ease-in 0.1s 0s;
  background: gray;
  cursor: pointer;
}

.modal-default-button:active {
  position: relative;
  top: 2px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-body,
.modal {
  color: #666 !important;
}


</style>