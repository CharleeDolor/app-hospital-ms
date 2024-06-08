<template>
    <h1>Consultation is ongoing.</h1>
    <button @click="doneConsulting" class="btn btn-primary">Done</button>
</template>

<script>

export default {

    data(){
        return {
            isDone: false,
        }
    },

    beforeUnmount(){
        // using lifecycle hook before unmount to prevent user from leaving the page
        // only leaves when data property isDone is true
        // to be fixed...
        if(this.isDone){
            alert('*Required to create a patient medical record')
        } else {
            this.$router.push('/records/consultation');
        }
        
    },

    methods: {
        doneConsulting(){
            
            let conf = confirm('Are you sure the consultation is done?');

            if(conf){
                this.isDone = true;
                this.$router.push({
                    name: 'recordsCreate',
                    params: {id: this.$route.params.id}
                })
            }
        }
    }
}
</script>