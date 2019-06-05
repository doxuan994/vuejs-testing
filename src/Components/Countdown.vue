<template>
    <div>
        <span>{{ remaning.days }} Days, </span>
        <span>{{ remaning.hours }} Hours, </span>
        <span>{{ remaning.minutes }} Minutes, </span>
        <span>{{ remaning.seconds }} Seconds.</span>
        left...
    </div>
</template>


<script type="text/javascript">
import moment from 'moment';

export default {
    props: ['until'],
    data() {
        return {

        };
    },
    computed: {
        remaning() {
            let remaning = moment.duration(Date.parse(this.until) - new Date());

            return {
                days: remaning.days(),
                hours: remaning.hours(),
                minutes: remaning.minutes(),
                seconds: remaning.seconds()
            }
        }
    }
}
</script>
