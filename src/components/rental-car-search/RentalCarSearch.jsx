import {DatePickerComponent} from "../date-time-pickers/DatePickerComponent";
import {TimePickerComponent} from "../date-time-pickers/TimePickerComponent";
import './rent-car.scss';
import {useEffect} from "react";
import {useNavigate} from "react-router";
import moment from "moment";
import {useContext} from "react";
import {EndDateContext, StartDateContext} from "../../utils/contexts/DateContext";

export function RentalCarSearch({isVisible}) {
    const now = new Date();
    const {startDate, setStartDate} = useContext(StartDateContext);
    const {endDate, setEndDate} = useContext(EndDateContext);
    const minStartDate = new Date(now.getTime() + 86400000);
    const minEndDate = new Date(minStartDate.getTime() + 90000000);
    const navigate = useNavigate();


    useEffect(()=>{
        if(moment(endDate).diff(startDate,'days')<1){
            setEndDate(new Date(startDate.getTime() + 90000000));
        }
    },[startDate])
    useEffect(()=>{
        if(moment(endDate).diff(startDate,'days')<1){
            setStartDate(new Date(endDate.getTime() - 90000000));
        }
    },[endDate])

    const onButtonClick = () => {
        navigate('/browse');
        if(isVisible){
            isVisible(false);
        }
    }

    return (
        <div className="search-form">
            <div className="my-1">
                <h6 className="text-light text-left">Start Date:</h6>
                <DatePickerComponent minDate={minStartDate} date={startDate} setDate={setStartDate}></DatePickerComponent>
            </div>
            <div className="my-1">
                <h6 className="text-light text-left">Start Time:</h6>
                <TimePickerComponent time={startDate} setTime={setStartDate}></TimePickerComponent>
            </div>
            <div className="my-1">
                <h6 className="text-light text-left">End Date:</h6>
                <DatePickerComponent minDate={minEndDate} date={endDate}  setDate={setEndDate}></DatePickerComponent>
            </div>
            <div className="my-1">
                <h6 className="text-light text-left">End Time:</h6>
                <TimePickerComponent time={endDate} setTime={setEndDate}></TimePickerComponent>
            </div>
            <button className="search-button align-self-end border-0 rounded m-2 text-center" onClick={onButtonClick}> Search </button>
        </div>
    );
}
