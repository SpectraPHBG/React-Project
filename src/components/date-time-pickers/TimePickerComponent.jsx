import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useState} from "react";
import './picker-style.scss';

export function TimePickerComponent({time, setTime}){

    return(
            <DatePicker
                className="picker border-0 m-1 rounded text-center"

                selected={time}
                onChange={time => setTime(time)}
                popperPlacement="bottom" //places the calendar under the input, sometimes it displays off if this is not used
                dateFormat="hh:mm a"
                showTimeSelect
                showTimeSelectOnly
                closeOnScroll={true}
                onKeyDown={(e) => {
                    e.preventDefault();
                }}//prevents manual date input
            />
    );
}
