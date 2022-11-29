import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {RentalCarSearch} from "../../rental-car-search/RentalCarSearch";
import { format } from 'date-fns';
import './vehiclesBrowse.scss';
import {Button} from "react-bootstrap";
import {getAllVehicles,removeVehicle} from "../../../utils/services/vehicle-http-utils";
import {VehicleCard} from "../vehicle-card/VehicleCard";
import moment from "moment";
import {useContext} from "react";
import {EndDateContext, StartDateContext} from "../../../utils/contexts/DateContext";
import {VehicleFilter} from "../vehicle-filter/VehicleFilter";
import ReactPaginate from "react-paginate";
import {ErrorModal} from "../../modals/error-modal/ErrorModal";

export function VehiclesBrowse(){

    const {startDate, setStartDate} = useContext(StartDateContext);
    const {endDate, setEndDate} = useContext(EndDateContext);
    const [displaySearch, setDisplaySearch] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const params = useParams();


    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 7;
    const [paginatedVehicles, setPaginatedVehicles] = useState([]);
    const [pageCount, setPageCount] = useState(1);

    useEffect(() =>{
        getAllVehicles().then((response) => {
            const responseData = response.data;
            setVehicles(responseData.filter(v => v.count>0));
        });
    },[])

    useEffect(() =>{
        setItemOffset(params.page? ((params.page-1) * itemsPerPage) % vehicles.length : 0);
        const endOffset = itemOffset + itemsPerPage;
        setPaginatedVehicles(vehicles.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(vehicles.length / itemsPerPage));
    },[itemOffset, itemsPerPage, vehicles,params.page])

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % vehicles.length;
        setItemOffset(newOffset);
        if(event.selected>0){
            navigate(`/browse/page=${event.selected+1}`);
        }
        else{
            navigate("/browse");
        }
    };

    const onDelete = (vehicle) => {
        removeVehicle(vehicle.id).then(()=> {
            setVehicles(vehicles.filter(v => v.id !== vehicle.id));
        }).catch((response) => {
            setError(response.message);
        });
    }

    const renderSearch = () => {
        const displayStartDate= format(startDate, 'do MMMM yyyy hh:mm a');
        const displayEndDate= format(endDate, 'do MMMM yyyy hh:mm a');
        if(displaySearch){
            return <RentalCarSearch isVisible={setDisplaySearch}/>
        }
        else{
            return <div className="search-wrapper p-2">
                <h6 className="m-0">{displayStartDate}  > {displayEndDate}</h6>
                <Button className="ms-lg-5 edit-button" variant="success" onClick={() =>setDisplaySearch(true)}>Edit</Button>
            </div>
        }
    }

    const renderEmptySearch = () => {
        if(vehicles.length === 0) {
            return <h4>
                No Vehicles Found.
            </h4>
        }
    }

    const getCurrentPage = () => {
        if(params.page && pageCount>=params.page) {
            return params.page-1;
        }
        else {
            return 0;
        }
    }

    return(
        <div className="container-fluid min-vh-100">
            <div className="row my-4">
                {renderSearch()}
            </div>
            <div className="row my-6 mt-5">
                <div className="col-md-5 col-lg-4 me-lg-5">
                    <div>
                        <VehicleFilter setVehicles={setVehicles}/>
                    </div>
                </div>
                <div className="col-md-6 mx-auto">
                    <div className='ms-4 ms-md-3 ms-md-8'>
                        {renderEmptySearch()}
                        {paginatedVehicles.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} onDelete={onDelete} rentDays = {moment(endDate).diff(startDate, 'days')}/>)}
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            previousLabel="< previous"
                            forcePage={getCurrentPage()}
                            renderOnZeroPageCount={null}
                        />
                    </div>
                </div>
            </div>
            <ErrorModal error={error}/>
        </div>
    );
}
