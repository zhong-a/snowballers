<template>
    <div>
        <ul style="list-style-type:none;">
            <li v-for="chat in chats" :key="chat.timestamp">
                <span class="chatname">{{chat.username}}</span>: {{chat.message}}
            </li>
        </ul>
        <input v-model="content" />
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
            content: '',
        };
    },
    created: function() {
        this.username = store.state.userProfile.name;
        chatsCollection.onSnapshot(onNext=function(doc){
            chats.push[doc.data()]
        })
    },
    methods: {
        sendMessage: function() {
            
        }
    }  
}
</script>

<style scoped>
    .chatname {
        color: lightcoral;
    }
</style>