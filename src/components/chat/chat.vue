<template>
    <div class="chatbox">
        <ul class="chatlist">
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
import * as fb from '../../firebase/firebase'
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
        fb.chatsCollection.onSnapshot((doc) => {
            doc.forEach(chat => {
                thisptr.chats.append(chat.data())
            })
        })
    },
    methods: {
        sendMessage: function() {
            fb.chatsCollection.add({
                username: 'shark',
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
    .chatlist {
        list-style-type:none;
        height: 230px;
    }
    .chatbox {
        height: 300px;
        width: 150px;
        border-style: solid;
        border-color: black;
    }
</style>