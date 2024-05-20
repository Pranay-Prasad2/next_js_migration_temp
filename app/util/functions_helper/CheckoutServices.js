
import { GET_TIMESLOTS } from "@/app/API/API_Constets";

// Dates function

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const DAYS_OF_WEEK = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export const generateDates = (numberOfDates = 7) => {
    let dates = [];
    for (let i = 0; i < numberOfDates; i++) {
        let date = new Date();
        date.setDate(date.getDate() + i);
        dates.push(date);
    }
    return dates;
};

export const isTomorrow = (date = new Date(), isTomorrowCheck = true) => {
    const tomorrow = new Date();
    if (isTomorrowCheck) tomorrow.setDate(tomorrow.getDate() + 1);
    if (tomorrow.toDateString() === date.toDateString()) {
        return true;
    }
    return false;
};

export const getMonth = (date = null) => {
    date = date || new Date();
    return MONTHS[date.getMonth()];
};

export const getDay = (date = null) => {
    try {
        date = date instanceof Date ? date : new Date();
        return DAYS_OF_WEEK[date.getDay()];
    } catch (error) {
        console.error("An error occurred while getting the day:", error);
        return null; // Handle the error gracefully or return an appropriate value.
    }
    // date = date || new Date();
    // return DAYS_OF_WEEK[date.getDay()];
};

export const nthDay = (value) => {
    let day = value.getDate();
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
};

const getFilteredTimeIntervals = (intervals) => {
    return filterIntervals(intervals);
};

const filterIntervals = (intervals) => {
    let currentHour = parseInt(getCurrentTime() + 2);

    const filteredIntervals = intervals.filter((timeslot) => {
        let interval = timeslot.title;
        let startInterval = convertTo24Hour(interval.split("-")[0].trim());
        let endInterval = convertTo24Hour(interval.split("-")[1].trim());
        let startHour = parseInt(startInterval);
        let endHour = parseInt(endInterval);
        if (currentHour < startHour) {
            return true;
        } else if (currentHour >= startHour && currentHour < endHour) {
            return true;
        } else {
            return false;
        }
    });
    // console.log("Intervals",intervals);
    return filteredIntervals;
};

const getCurrentTime = () => {
    return new Date().getHours();
};
const convertTo24Hour = (time) => {
    let [hours, ampm] = time.split(/([APM]+)/);
    hours = (ampm === "PM" && hours !== "12" ? +hours + 12 : +hours) % 24;
    return ("0" + hours).slice(-2);
};

export const getOrderDate = (today = new Date()) => {
    const dateValue =
        today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
    const monthValue =
        today.getMonth() + 1 < 10
            ? "0" + (today.getMonth() + 1)
            : today.getMonth() + 1;
    return `${today.getFullYear()}-${monthValue}-${dateValue}`;
};


export const fetchTimeSlots = async () => {
    let newDate = new Date();
    let selected_date = new Date((typeof(window) !== 'undefined')?localStorage.getItem("selecteddate"):null);
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let date_sel = selected_date.getDate();
    let month_sel = selected_date.getMonth() + 1;
    let year_sel = selected_date.getFullYear();
    let new_today = date + '/' + month + '/' + year;
    let sel_date = date_sel + '/' + month_sel + '/' + year_sel;
    try {
        //   const { data } = await getrequest(GET_TIMESLOTS);
        const response = await fetch(GET_TIMESLOTS);
        if (!response.ok) {
            throw new Error("Unable to fetch time slots");
        }
        const data = await response.json();
        if (data.success === false) {
            console.log("time fetch response error");
            return;
        }
        const timeslots = data.data;
        if (!timeslots) return [];
        if (new_today == sel_date) {
            const filteredIntervals = getFilteredTimeIntervals(timeslots);
            return filteredIntervals;
        } else {

            const filteredIntervals = timeslots;
            return filteredIntervals;
        }
    } catch (e) { console.log("Fetch error timeslots") }
};

