<template>
    <div>
        <input class="new-reminder">
        <button @click="add">Add Reminder</button>

        <ul v-if="reminders.length">
            <li v-for="reminder in reminders" :key="reminder">{{reminder}}</li>
        </ul>
    </div>
</template>


<script type="text/javascript">
export default {
    data() {
        return {
            newReminder: '',
            reminders: []
        };
    },
    methods: {
        add() {
            this.reminders.push(this.newReminder);

            this.newReminder = '';
        }
    }
}
</script>
