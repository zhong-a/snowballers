<template>
  <div id="create-event-template">
    <h1 id="menu-title">Create an Event</h1>
    <div class="menu-option">
      <span class="left">Event Name:</span>
      <span class="right">
        <input v-model="eventName" />
      </span>
    </div>
    <div class="menu-option">
      <span class="left">Max Number of Participants:</span>
      <span class="right">
        <select v-model="maxParticipants" name="#">
          <option
            v-for="number in [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]"
            :value="number"
            v-bind:key="number"
          >
            {{ number }}
          </option>
        </select>
      </span>
    </div>
    <div class="menu-option">
      <span class="left">Password Protected:</span>
      <span class="right">
        <input v-model="passwordProtected" type="checkbox" />
      </span>
    </div>
    <div class="menu-option" v-if="passwordProtected">
      <span class="left">Password:</span>
      <span class="right">
        <input v-model="password" />
      </span>
    </div>
    <button v-on:click="createEvent()">Create Event</button>
  </div>
</template>

<script>
export default {
  model: {
    prop: "username",
    event: "event-created",
  },
  data() {
    return {
      eventName: "",
      maxParticipants: 8,
      passwordProtected: false,
      password: "",
    };
  },
  methods: {
    createEvent: function () {
      if (this.eventName.length === 0) {
        alert("You have to input an event name!");
        return;
      }
      if (this.passwordProtected && this.password.length === 0) {
        alert("You have to input a password!");
        return;
      }
      console.log(this.eventName)
      console.log(this.maxParticipants)
      console.log(this.passwordProtected)
      console.log(this.password)
      this.$store
        .dispatch("createEvent", {
                eventName: this.eventName,
                maxParticipants: this.maxParticipants,
                pwProtected: this.passwordProtected,
                password: this.password
            }
        )
        .then(() => {
          this.$emit("event-created");

          // this was broken, but now it works after we fixed the login button issues, so it was probably the same bug
          this.$root.$emit("createEventBtnClicked");
        })
        .catch((error) => {
          if (error === "already exists") {
            alert("An event with that name already exists!");
          }
        });
    },
  },
};
</script>

<style>
.left {
  float: left;
}
.right {
  float: right;
}
.menu-option {
  clear: both;
  float: left;
  width: 100%;
  height: 25px;
}
#create-event-template {
  float: left;
  width: 300px;
}
</style> 
