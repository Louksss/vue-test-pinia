<template>
  <h1 class="green" id="msg">{{ msg }}</h1>
  <h4 id="number">{{ number }}</h4>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    msg: {
      type: String,
      required: true
    },
    number: {
        type: Number,
        required: false
    }
  },
  setup() {

    return {  }
  },
  methods: {
  }
})
</script>
