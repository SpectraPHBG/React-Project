import {useEffect, useState} from "react";
import {getAllVehicles} from "../../../utils/services/vehicle-http-utils";

export function AdminVehicleList(){
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        getAllVehicles()
            .then((response) => {
                setVehicles(response.data);
            });
    }, []);

    return(
        <div>

        </div>
    );
}
