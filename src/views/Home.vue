<template>
  <div class="home">
    <TestMsg msg="Testing"/>
  </div>
</template>

<script>
// @ is an alias to /src
import TestMsg from '@/components/TestMsg.vue'

export default {
  name: 'home',
  components: {
    TestMsg
  }
}
</script>
