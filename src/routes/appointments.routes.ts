import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appoinment';

const appointmentsRouter = Router();



const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppintmentInSameDate = appointments.find(appointment =>
        isEqual(parsedDate, appointment.date),
    );

    if (findAppintmentInSameDate) {
        return response.status(400).json({ message: 'This appointment is already booked' });
    }

    const appointment = new Appointment(provider, parsedDate);

    appointments.push(appointment);

    return response.json(appointment);

});

export default appointmentsRouter;