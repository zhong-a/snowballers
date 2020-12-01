<template>
    <div>
        <ul style="list-style-type:none;">
            <li v-for="chat in chats" :key="chat.timestamp">
                <span class="chatname">{{chat.username}}</span>: {{chat.message}}
            </li>
        </ul>
        <input v-model="message" />
        <button v-on:click="sendMessage()">Send</button>
    </div>
</template>

<script>
import store from '../../store.js'
import chatsCollection from '../../firebase/firebase'
export default {
    data() {
    return {
            username: '',
            chats: [],
            message: '',
        };
    },
    created: function() {
        this.username = store.state.userProfile.name;
        let thisptr = this
        chatsCollection.onSnapshot(onNext=function(doc){
            thisptr.chats.push[doc.data()]
        })
    },
    methods: {
        sendMessage: function() {
            chatsCollection.add({
                username: this.username,
                message: this.message,
                timestamp: Date.now()
            })
        }
    }  
}
</script>

<style scoped>
    .chatname {
        color: lightcoral;
    }
</style>