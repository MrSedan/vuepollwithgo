<template>
    <div class="poll">
        <div class="container">
        <div id="myChat">
            <h1>Send Message</h1>
            <input type="tex" placeholder="Text" name="text" id="name" v-model="message">
            <button id="send" @click="subForm()"><font-awesome-icon icon="paper-plane" /></button>
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
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
var yourActionsSinceTime = (new Date(Date.now() - 120000)).getTime();
export default {
    name: 'Poll',
    data() {
        return {
            da: [],
            message: "",
        }
    },
    methods: {
        formatDate: function(data){
            let date = new Date(data*1000)
            let formatedDate = date.getHours() +":"+ ("0"+date.getMinutes()).substr(-2)+":"+("0"+date.getSeconds()).substr(-2)+" "+("0"+date.getDate()).substr(-2)+"."+("0"+(date.getMonth()+1)).substr(-2)+"."+date.getFullYear();
            return formatedDate
        },
        subForm: function(){
            //let mes = JSON.stringify({text: this.message})
            //console.log(mes)
            axios.post("/api/messages", {text: this.message})
            .catch(e=>{
                console.log(e)
            })
            this.message = ""
        },
        loadData: function(){
        
            var timeout = 45;
            if (yourActionsSinceTime){
                var optionalSince = "&since_time=" + yourActionsSinceTime;
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
                        yourActionsSinceTime = event.timestamp;
                    }
                    setTimeout(vm.loadData, 10)
                    return
                }
                if (response.data && response.data.timeout) {
                    setTimeout(vm.loadData, 10)
                    return
                }
            })
            .catch(e => {
                setTimeout(vm.loadData, 3000)
                return
            })
        }
    },
    created: function(){
        this.loadData();
    }
}

</script>

<style lang="scss" scoped>
@import '../styles/poll';
</style>