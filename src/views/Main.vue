

<template>
  <main class="pt-5 mt-5">
    <div class="chat-container">
      <div class="chat-title my-5">
        <img class="chat-banner" src="@/assets/imgs/banner.png" alt="chat-banner" />
      </div>
      <form @submit.prevent="fetchAnswer">
        <textarea
          class="chatbox form-control"
          rows="5"
          cols="1"
          placeholder="Ask Chat Cortex a question..."
          v-model="question"
          :id="text_question"
        ></textarea>
        <button class="btn btn-success btn-md w-100 mt-3 p-2 fw-bold btn-send" type="submit">
            SEND YOUR QUESTION
            <span v-if="spinner" class="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>
            <img v-else class="mx-1 mb-1" src="@/assets/send.svg" alt="send"/>
        </button>
      </form>

      <div class="chat-answer mt-5">
        <div v-if="loadAnswer" class="d-flex justify-content-center mt-3 spinner">
          <div class="spinner-grow spinner-grow-sm text-white mx-1" role="status"></div> 
          <div class="spinner-grow spinner-grow-sm text-white mx-1" role="status"></div> 
          <div class="spinner-grow spinner-grow-sm text-white mx-1" role="status"></div> 
        </div>
        <div v-if="showAnswer" class="chatbox-answer">
          <div class="chatbox-answer-title mb-3">
            <h3 class="text-white text-center fw-bold">Here is your answer:</h3>
          </div>
          <div class="chatbox-answer-box">
            <div class="chatbox-answer-box-item">
              <div class="chatbox-answer-box-item-content p-3">
                <Markdown :answer="answer" />
              </div>
              <div class="chatbox-answer-box-item-icon" @click="copyAnswer">
                <img src="@/assets/copy.svg" alt="copy" />
              </div> 
            </div>
          </div>
        </div>
      </div>  
      <!-- made with heart -->
    <div class="made-with-heart mt-5">
      <p class="text-center text-white">
        Made with <img src="@/assets/heart.svg" alt="heart" /> by <a href="https://github.com/coricss" class="text-white text-decoration-none">Rico Guinanao</a> 
      </p>
    </div>
    </div>
    
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from "vue-toastification";
import axios from 'axios';

import Markdown from './Markdown.vue';

const toast = useToast();

const question = ref('');
const answer = ref('');
const spinner = ref(false);
const loadAnswer = ref(false);
const showAnswer = ref(false);

const fetchAnswer = async () => {
  if (question.value === '') {
    toast.error("Please enter your question!");
  } else {
    try {
      spinner.value = true;
      loadAnswer.value = true;
      showAnswer.value = false;

      const btn = document.querySelector('.btn-send');
      btn.disabled = true;
      
      const res = await axios.post('api', {
        question: question.value
      });
      
      answer.value = res.data;
      
    } catch (error) {
      if (error) {
        toast.error("Something went wrong!");
      }
    } finally {
      spinner.value = false;
      loadAnswer.value = false;

      const btn = document.querySelector('.btn-send');
      btn.disabled = false;

      answer.value ? showAnswer.value = true : showAnswer.value = false;
    }
  }
}

const copyAnswer = () => {
  const text = answer.value;
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  toast.success("Copied to clipboard");
}

</script>

<style scoped>
.chat-banner {
  width: 100%;
  pointer-events: none;
}

.chatbox {
  resize: none;
  color: #fff !important;
  background-color: #141414 !important;
  border: 1px solid #68686860 !important;
  border-radius: 4px !important;
  outline: none !important;
  box-shadow: none !important;
}

.btn-send {
  border: 1px solid #68686860 !important;
  outline: none !important;
  color: #fff !important;
  box-shadow: none !important;
  background: linear-gradient(90deg, #5700c3 5%, #15009d 100%) !important;
  word-wrap: break-word;
}

.btn-send:hover {
  background: linear-gradient(90deg, #5800c3e5 5%, #15009de8 100%) !important;
}

.chatbox-answer-box {
  background-color: #141414 !important;
  border: 1px solid #68686860 !important;
  border-radius: 4px !important;
  box-shadow: none !important;
  color: #fff !important;
  padding: 20px;
  margin: 10px 0;
}
.spinner .spinner-grow:nth-child(1) {
  animation-delay: 0.5s;
}
.spinner .spinner-grow:nth-child(2) {
  animation-delay: 1s;
}
.spinner .spinner-grow:nth-child(3) {
  animation-delay: 0.1s;
}

.chatbox-answer-box-item-content ::v-deep(p) {
  margin: 0;
}

.chatbox-answer-box-item-content ::v-deep(pre) {
  white-space: pre-wrap !important;
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
  padding: 1rem !important;
  border-radius: 0.3rem !important;
  background-color: #202020 !important;
 
}

.chatbox-answer-box-item-content ::v-deep(code span) {
  font-family: 'Courier New', Courier, monospace !important;
  white-space: pre-wrap !important;
  background-color: #202020 !important;
}
.chatbox-answer-box-item-content ::v-deep(code) {
  font-family: 'Courier New', Courier, monospace !important;
  white-space: pre-wrap !important;
  background-color: #202020 !important;
  color: #dbdbdb !important;
  border-radius: 0.3rem !important;
  padding: 2px;
}

.chatbox-answer-box-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.chatbox-answer-box-item-icon {
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  background-color: #202020;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #68686860;
  gap: 5px;
}

.chatbox-answer-box-item-icon:hover {
  background-color: #68686860;
}

.chatbox-answer-box-item-icon img {
  width: 20px;
  height: 20px;
}

.chatbox-answer-box {

  overflow-y: auto;
}

@media screen and (max-width: 1440px) {
  .chatbox-answer-box-item-content ::v-deep(div) {
   font-size: 100% !important;
  }
}

@media screen and (max-width: 1024px) {
  .chatbox-answer-box-item-content ::v-deep(div) {
   font-size: 15px !important;
  }
}

@media screen and (max-width: 768px) {
  .chatbox-answer-box-item-content ::v-deep(div) {
    font-size: 15px !important;
  }
}

@media screen and (max-width: 425px) {
  .chatbox-answer-box-item-content ::v-deep(div) {
    font-size: 12px !important;
  }
}

@media screen and (max-width: 375px) {
  .chatbox-answer-box-item-content ::v-deep(div) {
   font-size: 12px !important;
  }
}

@media screen and (max-width: 320px) {
  .chatbox-answer-box-item-content ::v-deep(div) {
   font-size: 10px !important;
  }
}

.made-with-heart {
  top: 100%;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}

</style>