import {Appointment, appointments, getCurrentUser, updateAppointmentsData} from './Index.js';
import { router } from "../router.js";

export default Vue.component('appointment-form-preview', {
    template: `
    <div>
        <h3>Din Nåværende Bestilling:</h3>
        <h5><strong>Behandling:</strong></h5><p> {{type}} </h5>
        <h5><strong>Dato og Tid: </strong></h5><p> {{date}} - {{time}} </p>
        <h5><strong>Din Kommentar:</strong></h5><p> {{comment}} </p>
        <button @click="makeAppointment">Bestill Time!</button>
    </div>
    `,
    props: ['type', 'date', 'time', 'comment'],
    methods: {
        makeAppointment() {
            //Make sure all required fields are filled
            if(this.type && this.date && this.time) {
                let newAppointment = new Appointment(this.type, this.date, this.time, this.comment);
                console.log(newAppointment);

                //If a user is logged in
                if (getCurrentUser()) {
                    let user = getCurrentUser();
                    user.appointmentIds.push(newAppointment.id);
                    appointments.push(newAppointment);
                    updateAppointmentsData();
                    router.push('/brukerside')
                    
                } else {
                    localStorage.setItem("holdingAppointment", JSON.stringify(newAppointment));
                    router.push('/login');
                }
            } else {
                alert("Et påkrevd felt er ikke fyllt inn!")
            }
        }
    }
});