<template>
    <div>
        <!-- Viewing the question. -->
        <div v-if="! editing">
            <h1 v-text="question.title"></h1>
            <div class="body" v-text="question.body"></div>

            <button id="edit" @click="editing = true">Edit</button>
        </div>


        <!-- Editing the question. -->
        <div v-if="editing">
            <input type="text" name="title" v-model="form.title">
            <textarea name="body" v-model="form.body"></textarea>

            <button id="update" @click="update">Update</button>
            <button id="cancel" @click="cancel">Cancel</button>
        </div>

        <p v-if="feedback">Your question has been updated.</p>

    </div>
</template>


<script type="text/javascript">
import axios from 'axios';


export default {
    props: ['question'],
    data() {
        return {
            editing: false,
            form: {
                title: this.question.title,
                body: this.question.body
            },
            feedback: false
        }
    },
    methods: {
        cancel() {
            this.editing = false;
        },
        update() {
            this.question.title = this.form.title;
            this.question.body = this.form.body;

            axios.post('/questions/\.+/', this.form).then(({data}) => {
                console.log("DONE");
                this.feedback = true;
            });



            this.editing = false;
        }
    }
}
</script>
