<template>
  <div id="teamsMenu">
    <b>Team Options</b>
    <ul>
      <li v-for="team in teams" :key="team.num">
        <p>
          <span> team {{ team.num }} </span> <br />
          <span>
            {{ team.members }}/{{ team.capacity }} members, privacy:
            {{ team.privacy }}
          </span>
        </p>
        <button v-on:click="join(team.num)">Join Team</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teams: [
        {
          num: 1,
          members: 0,
          capacity: 10,
          privacy: "public",
        },
        {
          num: 2,
          members: 5,
          capacity: 10,
          privacy: "public",
        },
      ],
    };
  },
  methods: {
    join: function (num) {
      if (this.teams[num - 1]["members"] >= this.teams[num - 1]["capacity"]) {
        alert("this team is full!");
      } else {
        this.teams[num - 1]["members"] += 1;
      }

      this.$root.$emit("joinTeamBtnClicked");
    },
  },
};
</script>

<style>
#teamsMenu {
  text-align: left;
}
</style>
