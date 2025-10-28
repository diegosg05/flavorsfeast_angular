import { Reservation } from "../models";

export const ReservationAdapter = (reserv: Reservation) => {
    const year = new Date().getFullYear();

    return {
        uid: reserv.uid,
        date: `${year}-${reserv.date.substring(3,5)}-${reserv.date.substring(0,2)}`,
        time: `${reserv.time}:00`,
        persons: reserv.persons,
        location: reserv.location,
        state: reserv.state
    }
}