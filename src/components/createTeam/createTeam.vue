<template>
  <div id="create-team-template">
    <h1 id="menu-title">Create a Team</h1>
    <div class="menu-option">
      <span class="left">Team Name:</span>
      <span class="right">
        <input v-model="teamName" />
      </span>
    </div>
    <div class="menu-option">
      <span class="left">Max Number of Team Members:</span>
      <span class="right">
        <select v-model="maxTeamMembers" name="#">
          <option
            v-for="number in [4, 5, 6, 7, 8, 9, 10]"
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
    <button v-on:click="createTeam()">Create Team</button>
    <button v-on:click="back()">back</button>
  </div>
</template>

<script>
export default {
  model: {
    prop: "username",
    event: "team-created",
  },
  data() {
    return {
      teamName: "",
      maxTeamMembers: 8,
      passwordProtected: false,
      password: "",
    };
  },
  methods: {
    createTeam: function () {
      if (this.teamName.length === 0) {
        alert("You have to input a team name!");
        return;
      }
      if (this.passwordProtected && this.password.length === 0) {
        alert("You have to input a password!");
        return;
      }
      this.$store
        .dispatch("createTeam", {
                teamName: this.teamName,
                maxTeamMembers: this.maxTeamMembers,
                pwProtected: this.passwordProtected,
                password: this.password,
                challenged: false
            }
        )
        .then(() => {
          this.$emit("team-created");

          // this was broken, but now it works after we fixed the login button issues, so it was probably the same bug
          this.$root.$emit("createTeamBtnClicked");
        })
        .catch((error) => {
          if (error === "already exists") {
            alert("A team with that name already exists!");
          }
        });
    },
    back: function () {
      this.$root.$emit("showMakeSeeTeamBtnsMenu");
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
#create-team-template {
  float: left;
  width: 300px;
}
</style> 
