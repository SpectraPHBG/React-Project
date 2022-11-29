import {ProfileInfo} from "../profile-info/ProfileInfo";
import {ProfileRentals} from "../profile-purchases/ProfileRentals";
import {MDBContainer} from "mdb-react-ui-kit";
import {useState} from "react";
import {getLoggedUser} from "../../../utils/services/user-http-utils";

export function ProfileMain(){
    const user = useState(getLoggedUser());


    return (
        <section style={{ backgroundColor: '#f4f5f7' }}>
            <MDBContainer className="py-5 h-100">
                <ProfileInfo user={user}/>
                <ProfileRentals user={user}/>
            </MDBContainer>
        </section>
    );
}
