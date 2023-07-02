<template>
  <div v-html="compiledMarkdown"></div>
</template>

<script setup>
import { computed, ref } from "vue";
import { marked  } from 'marked';
import highlight from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

const compiledMarkdown = computed(() => {
  return marked(markdown.answer, {
    highlight: function(code) {
      return highlight.highlightAuto(code).value;
    }
  });
});

const markdown = defineProps (['answer']);


</script>