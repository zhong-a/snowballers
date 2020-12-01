<template>
  <div id="eventsMenu">
    <b>Choose an Event to join</b>
    <ul>
      <li v-for="event in events" :key="event.name">
        <p>
          <span> {{ event.name }} </span> <br />
          <span>
            {{ event.currentParticipants }}/{{ event.maxParticipants }} members, privacy:
            {{ event.pwProtected }}
          </span>
          <div class="passProtec" v-if="event.pwProtected">
            <input v-model.trim="team.inputPassword" type="password" placeholder="password" />
          </div>
          <button v-on:click="join(team)">Join Team</button>
      </li>
    </ul>  
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [],
    };
  },
  methods: {
    join: function (event) {
      if (event.pwProtected) {
          if (event.inputPassword != event.password) {
            alert("this password does not match");
            return;
          }
      }

      this.$root.$emit("joinEventBtnClicked");
      this.$store.dispatch("joinEvent", event);
    },
  },
  created: function() {
    //bad cludge, please ignore
    let thisPtr = this
    this.$store.dispatch('fetchEvents').then(function(eventsList) {
      thisPtr.events = eventsList
    })
  }  
}
</script>

<style>
#eventsMenu {
  text-align: left;
}
</style>
