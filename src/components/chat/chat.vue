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
import Firebase from "firebase";
export default {
    data() {
    return {
            username: '',
            chats: [],
            message: '',
        };
    },
    created: function() {
        let thisptr = this

        let now = new Date().getTime();
        let query = fb.chatsCollection.orderBy('timestamp').startAt(now);
        query.onSnapshot((doc) => {
            doc.forEach(chat => {
                thisptr.chats.push(chat.data())
            })
        })
    },
    methods: {
        sendMessage: function() {
            fb.chatsCollection.add({
                username: store.state.userProfile.name,
                message: this.message,
                timestamp: Firebase.database.ServerValue.TIMESTAMP
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