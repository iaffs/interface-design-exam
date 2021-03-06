import { router } from "../router.js";

export default Vue.component('make-appointment', {
    template: `
        <div id="booking-grid-template" class="content-box">
            <button class="button booking-cancel cancel" @click="cancel"></button>
            <h2 class="booking-header">Bestilling av time</h2>
            <div id="booking-component-container">
                <div class="booking-component" :style='{display: (currentSection == 0 ? "block" : "none")}'>
                    <appointment-form-type @selected="setType"></appointment-form-type>
                </div>
                <div class="booking-component" :style='{display: (currentSection == 1 ? "block" : "none")}'>
                    <appointment-form-datetime @inputDate="setDate" @inputTime="setTime" @enter="enter"></appointment-form-datetime>
                </div>
                <div class="booking-component" :style='{display: (currentSection == 2 ? "block" : "none")}'>
                    <appointment-form-comment @inputComment="setComment" @key="enter" @enter="enter"></appointment-form-comment>
                </div>
                <div class="booking-component" :style='{display: (currentSection == 3 ? "block" : "none")}'>
                    <appointment-form-preview :type="type" :date="date" :time="time" :comment="comment"></appointment-form-preview>
                </div>
            </div>
            <button class="booking-nav-button booking-nav-back" @click="back" :style='{display: (currentSection > 0 ? "inline-block" : "none")}' alt></button>
            <div class="booking-step-indicator">
                <span @click="setSection('0')" :style='{opacity: (currentSection == 0 ? "1" : "0.4"), transform: (currentSection == 0 ? "scale(1)" : "scale(.5)")}'>•</span>
                <span @click="setSection('1')" :style='{opacity: (currentSection == 1 ? "1" : "0.4"), transform: (currentSection == 1 ? "scale(1)" : "scale(.5)")}'>•</span>
                <span @click="setSection('2')" :style='{opacity: (currentSection == 2 ? "1" : "0.4"), transform: (currentSection == 2 ? "scale(1)" : "scale(.5)")}'>•</span>
                <span @click="setSection('3')" :style='{opacity: (currentSection == 3 ? "1" : "0.4"), transform: (currentSection == 3 ? "scale(1)" : "scale(.5)")}'>•</span>
            </div>
            <button class="booking-nav-button booking-nav-forw" @click="forward" :style='{display: (currentSection < 3 ? "inline-block" : "none")}'></button>
        </div>`,
    props: [],
    data() {
        return {
            currentSection: 0,
            type: "",
            date: "",
            time: "",
            comment: "",
        }
    },
    methods: {
        back() {
            if(this.currentSection > 0){
                this.currentSection--;
            }
        },
        forward() {
            if(this.currentSection < 3){
                this.currentSection++;
            }
        },
        setSection(section) {
            this.currentSection = parseInt(section);
        },
        setType(type) {
            switch(type) {
                case 'Ost': this.type = "Osteopati"; break;
                case 'Aku': this.type = "Akupuntur"; break;
                case 'Kos': this.type = "Kostholdsveiledning"; break;
                case 'Fys': this.type = "Fysiolab"; break;
                default: this.type = "Undefined";
            }
            this.forward(); //Move forward on type selection
        },
        setDate(date) {
            this.date = date;
        },
        setTime(time) {
            this.time = time;
            this.forward(); //Move forward on time selection
        },
        setComment(comment) {
            this.comment = comment;
        },
        enter(){
            this.forward();
        },
        cancel(){
            router.push('/');
        }
    }
});