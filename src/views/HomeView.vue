

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
                <p class="chatbox-answer-box-item-content-text m-0" id="text_answer">
                  <VueWriter 
                    :array="[answer]"
                    :caret="cursor"
                    :typeSpeed="40"
                    :iterations="1"
                  />
                </p>
              </div>
              <div class="chatbox-answer-box-item-icon" @click="copyAnswer">
                <small>Copy</small>
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
      
      const res = await fetch('https://chat-cortex-server.vercel.app/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Allow-Control-Allow-Origin': '*',
          'Allow-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        body: JSON.stringify({
          question: question.value,
        }),
      })

      const data = await res.json();
      const parsedData = data.bot.trim();

      answer.value = parsedData;
    
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
  background-color: #242424 !important;
  border: 1px solid #424242 !important;
  border-radius: 4px !important;
  outline: none !important;
  box-shadow: none !important;
}

.btn-send {
  border: 1px solid #424242 !important;
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
  background-color: #242424 !important;
  border: 1px solid #424242 !important;
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

.chatbox-answer-box-item-content-text {
  white-space: pre-wrap;
}

.chatbox-answer-box-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chatbox-answer-box-item-icon {
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  background-color: #4e4e4e;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #686868;
  gap: 5px;
}

.chatbox-answer-box-item-icon:hover {
  background-color: #686868;
}

.chatbox-answer-box-item-icon img {
  width: 20px;
  height: 20px;
}

.made-with-heart {
  top: 100%;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;

}

</style>