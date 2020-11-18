<template>
    <div id='create-team-template'>
        <h1 id='menu-title'>Create a Team</h1>
        <div>
            <span class='left'>Team Name</span>
            <span class='right'>
                <input v-model='teamName' />
            </span>
        </div>
        <div>
            <span class='left'>Max Number of Team Members</span>
            <span class='right'>
                <select v-model='maxTeamMembers' name='#'>
                    <option v-for='number in [4,5,6,7,8,9,10] :value='number'>
                        {{number}}
                    </option>
                </select>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    model: {
      prop: 'username',
      event: 'team-created',  
    },
    data() {
        return {
            teamName: '',
            maxTeamMembers: 8,
            password-protected: false,
            password: '',
        }
    },
    methods: {
        createTeam: function() {
            console.log('aaaa')
            this.$emit('team-created')
        },
    },
}
</script>
