<template>
    <div class="chatbox">
        <div class='chatlistbox'>
            <ul class="chatlist">
                <li v-for="chat in chats" :key="chat.timestamp">
                    <span class="chatname">{{chat.username}}</span>: {{chat.message}}
                </li>
            </ul>
        </div>
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

        let now = Date.now();
        let query = fb.chatsCollection.orderBy('timestamp').
            where('timestamp', '>', now);
        query.onSnapshot((doc) => {
            thisptr.chats = []
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
    .chatListBox {
        overflow-y: scroll;
        text-align: left;
    }
    .chatbox {
        height: 300px;
        width: 150px;
        border-style: solid;
        border-color: black;
    }
</style>
