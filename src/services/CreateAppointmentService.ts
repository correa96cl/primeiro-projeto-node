import { startOfHour } from 'date-fns';
import Appointment from '../models/Appoinment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import appointmentsRepository from '../repositories/AppointmentsRepository';

interface Request{
    date: Date;
    provider: string;
}


class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository){
        this.appointmentsRepository = appointmentsRepository;

    }

    public execute({date, provider}: Request): Appointment {
        const appointmentDate = startOfHour(date);


        const findAppintmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

        if (findAppintmentInSameDate) {
            throw Error('This appointment is already booked');
        }


        const appointment = this.appointmentsRepository.create({ provider, date: appointmentDate });

        return appointment;

    };

    

}



export default CreateAppointmentService;