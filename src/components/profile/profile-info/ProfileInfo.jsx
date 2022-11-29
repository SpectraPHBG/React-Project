import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCol,
    MDBRow,
    MDBTypography
} from "mdb-react-ui-kit";
import "./profile-info.scss";
import {removeUser} from "../../../utils/services/user-http-utils";
import {useNavigate} from "react-router";
import {logout} from "../../../utils/services/auth-http-utils";
import {useState} from "react";
import {ErrorModal} from "../../modals/error-modal/ErrorModal";

export function ProfileInfo({user}){
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const onEditProfileClick = ()=>{
        navigate(`/edit/profile/${user.id}`);
    };

    const onEditPasswordClick = ()=>{
        navigate(`/edit/password/${user.id}`);
    };

    const onDeleteClick = ()=>{
        logout().then(()=>{
            removeUser(user.id).then(()=>{
                navigate('/');
            }).catch((response) => {
                setError(response.message);
            });
        });
    };
    const renderRank = () => {
        if(user.isAdmin === true){
            return <MDBCardText>Admin</MDBCardText>;
        }
        else if(user.isVIP === true){
            return <MDBCardText>VIP User</MDBCardText>;
        }
        else{
            return <MDBCardText>Standard User</MDBCardText>;
        }
    };

    return (
        <>
            <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol lg="6" className="mb-4 mb-lg-0">
                    <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                        <MDBRow className="g-0">
                            <MDBCol md="4" className="gradient-custom text-center text-white py-5"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                <MDBTypography tag="h5">{user.name}</MDBTypography>
                                {renderRank()}
                                <MDBBtn onClick={onEditProfileClick} className="mb-2" outline color="light" style={{width: '125px',height: '36px', overflow: 'visible'}}>
                                    Edit profile
                                </MDBBtn>
                                <MDBBtn onClick={onEditPasswordClick} className="mb-2 mx-2" outline color="light" style={{width: '125px',height: '36px', overflow: 'visible'}}>
                                    Edit password
                                </MDBBtn>
                                <MDBBtn onClick={onDeleteClick} outline className="mb-2" color="light" style={{width: '125px',height: '36px', overflow: 'visible'}}>
                                    Delete profile
                                </MDBBtn>
                            </MDBCol>
                            <MDBCol md="8" className="my-auto">
                                <MDBCardBody className="p-4">
                                    <MDBTypography tag="h6">Information</MDBTypography>
                                    <hr className="mt-0 mb-4" />
                                    <MDBRow className="pt-1">
                                        <MDBCol className="col-12 mb-3">
                                            <MDBTypography tag="h6">Email</MDBTypography>
                                            <MDBCardText className="text-muted">{user.email}</MDBCardText>
                                        </MDBCol>
                                        <MDBCol className="col-12 mb-3">
                                            <MDBTypography tag="h6">Phone</MDBTypography>
                                            <MDBCardText className="text-muted">{user.phone}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <ErrorModal error={error}/>
        </>
    );
}
