<template>
    <div class="poll">
    <div class="container">
    <div id="myChat">
        <h1>Send Message</h1>
        <input type="tex" placeholder="Text" name="text" id="name" v-model="message" @keypress.13="enterMsg" maxlength="120">
        <h5>{{message.length}}/120</h5>
        <button id="send" @click="subForm()" type="submit"><font-awesome-icon icon="paper-plane" /></button>
    </div>
    </div>

    <transition-group name="mess" tag="div" class="chat">
        <div v-for="i in da" :key="i.time" class="message">
            <h1>{{i.text}}</h1>
            <h2>{{formatDate(i.time)}}</h2>
        </div>
    </transition-group>
    </div>
</template>
<script>
import Vue from 'vue'
import $ from 'jquery'
import axios from 'axios'
export default {
    name: "Chat",
    data() {
        return {
            da: [],
            message: "",
            timeout: 10,
            yourActionsSinceTime : (new Date(Date.now() - 172800000)).getTime()
        }
    },
    methods: {
        enterMsg: function(event){
            if (event.which === 13){
                this.subForm()
            }
            
        },
        formatDate: function(data){
            let date = new Date(data)
            let formatedDate = date.getHours() +":"+ ("0"+date.getMinutes()).substr(-2)+":"+("0"+date.getSeconds()).substr(-2)+" "+("0"+date.getDate()).substr(-2)+"."+("0"+(date.getMonth()+1)).substr(-2)+"."+date.getFullYear();
            return formatedDate
        },
        subForm: function(){
            //let mes = JSON.stringify({text: this.message})
            //console.log(mes)
            if (!(this.message.length > 120 || this.message.length===0)){
                axios.post("/api/messages", {text: this.message})
            .catch(e=>{
                console.log(e)
            })
            }
            this.message = ""
        },
        loadData: function(){
        
            var timeout = 45;
            if (this.yourActionsSinceTime){
                var optionalSince = "&since_time=" + this.yourActionsSinceTime;
            }
            var pollUrl = `/api/events?timeout=${timeout}&category=mes${optionalSince}`
            var successDelay = 10;
            var errorDelay = 3000;
            var vm = this;
            axios.get(pollUrl)
            .then(response => {
                if(response.data && response.data.events && response.data.events.length > 0){
                    for(let i=0;i<response.data.events.length;i++){
                        let event = response.data.events[i]
                        vm.da.splice(0,0,{time:event.timestamp, text: event.data.text})
                        vm.yourActionsSinceTime = event.timestamp;
                    }
                    setTimeout(vm.loadData(), 10)
                    return
                }
                if (response.data && response.data.timeout) {
                    setTimeout(vm.loadData(), 10)
                    return
                }
            })
            .catch(e => {
                setTimeout(vm.loadData(), 3000)
                return
            })
        }
    },
    mounted() {
        this.loadData()
        this.da = [] 
    },
    created() {
        this.da = [] 
    }
}
</script>
<style lang="scss" scoped>
@import '../styles/poll';
</style>