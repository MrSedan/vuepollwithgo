<template>
  <div class="test">
    <ul>
      <transition-group name="grp" tag="p">
        <li v-for="i in a" :key="i">{{i}}</li>
      </transition-group>
      <button @click="add()">+</button>
      <button @click="remove()">-</button>
    </ul>
    
  </div>
</template>

<script>
/*const axios = require('axios')*/
export default {
  name: 'TestMsg',
  data () {
    return {
      a: [1,2,3,4,5,6,7,8,9],
      nextNum: 10
    }
  },
  methods: {
    add(){
      this.a.splice(this.a.length, 0, this.nextNum++)
    },
    remove(){
      this.a.splice(this.a.length-1, 1)
    }
  }
}
</script>

<style>
li{
  list-style: none;
  display: inline-block;
  margin-right: 10px;
}
button{
  padding: 10px;
}
.grp-enter-active, .grp-leave-active{
  transition: all 1s;
}
.grp-enter, .grp-leave-to{
  opacity: 0;
  transform: translateY(30px);
}
</style>
