import {getCurrentUser} from '../components/Index.js';

const BookingPage = {
    template: `
        <div>
            <div>
                <p>{{status}} {{user.name}}</p>
            </div>
            <make-appointment></make-appointment>
        </div>
        `,
    data() {
        return {
            status: "",
            user: ""
        }
    },
    mounted() {
        if(getCurrentUser()){
            this.status = "Du er innlogget som:";
            this.user = getCurrentUser();
        }
    },
    methods: {

    }

};

export default BookingPage;