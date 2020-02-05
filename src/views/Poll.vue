<template>
    <div class="poll">
        <ul>
            <li v-for="(i, z) in da" :key="z">{{i.text}}</li>
        </ul>
        <button>te4st</button>
        <p>{{info}}</p>
    </div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
import axios from 'axios'
var yourActionsSinceTime = (new Date(Date.now() - 120000)).getTime();
export default {
    name: 'Poll',
    data() {
        return {
            da: [],
            success: false,
            info: ""
        }
    },
    methods: {
        loadData: function(){
        
            var timeout = 45;
            if (yourActionsSinceTime){
                var optionalSince = "&since_time=" + yourActionsSinceTime;
            }
            var pollUrl = `http://localhost:5500/events?timeout=${timeout}&category=mes${optionalSince}`
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

<style>
li{
    list-style: none;
    display: inline-block;
    margin: 10px;
}
ul{
    text-align: center;
    padding: 50px;
    border: 2px solid black;
}
</style>