import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './picker-style.scss';

export function DatePickerComponent({minDate,date, setDate}){
    const maxDate=new Date().setFullYear(minDate.getFullYear()+1);

    return(
            <DatePicker
                className="picker border-0 rounded m-1 text-center"
                selected={date}
                onChange={date => setDate(date)}
                popperPlacement="bottom" //places the calendar under the input, sometimes it displays off if this is not used
                dateFormat="dd/MM/yyyy"
                minDate={minDate}
                maxDate={maxDate}
                closeOnScroll={true}
                onKeyDown={(e) => {
                    e.preventDefault();
                }}//prevents manual date input
            />
    );
}

