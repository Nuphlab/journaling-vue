export default {
    data: {
        loggedin: localStorage.loggedin || false
    },
    methods: {
        isloggedin: () => {
            return (this.loggedin)
        }
    }
};
