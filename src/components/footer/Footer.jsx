import './footer.scss';
import {MDBCol, MDBContainer, MDBFooter, MDBIcon, MDBRow} from "mdb-react-ui-kit";

export function Footer() {
    return(
        <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted'>
            <section className='d-flex justify-content-center justify-content-lg-between'>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon icon="gem" className="me-3" />
                                RentACar
                            </h6>
                            <p>
                                Totally a real website where you can rent the car of your dreams.
                                It is not just a project for a university from someone with no ReactJS experience.
                            </p>
                        </MDBCol>

                        <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                <MDBIcon icon="home" className="me-2" />
                                New York, NY 10012, US
                            </p>
                            <p>
                                <MDBIcon icon="envelope" className="me-3" />
                                support@rent-a-car.com
                            </p>
                            <p>
                                <MDBIcon icon="phone" className="me-3" /> + 53 364 458 73
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2020 Copyright:
                <a className='text-white ms-1' href='https://mdbootstrap.com/'>
                    RentACar Inc.
                </a>
            </div>
        </MDBFooter>
    );
}
