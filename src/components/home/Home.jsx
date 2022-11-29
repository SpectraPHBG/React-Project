import {RentalCarSearch} from "../rental-car-search/RentalCarSearch";
import {useContext, useEffect} from "react";
import {EndDateContext, StartDateContext} from "../../utils/contexts/DateContext";
import {
    MDBAccordion, MDBAccordionItem,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBRow, MDBTypography
} from "mdb-react-ui-kit";

export function Home(){
    const now = new Date();
    const {startDate, setStartDate} = useContext(StartDateContext);
    const {endDate, setEndDate} = useContext(EndDateContext);


    useEffect(()=>{
        setStartDate(new Date(now.getTime() + 86400000));
        setEndDate(new Date(now.getTime() + 176400000));
    },[])
    return(
        <div className="home">
            <div className="top-greeter">
                <div className="py-5">
                    <div className="py-5">
                        <h1 className="text-light mb-5 font-weight-bold">Rent a Car Now! Easy! Cheap!</h1>
                        <RentalCarSearch></RentalCarSearch>
                    </div>
                </div>
            </div>
            {/*Just Filler for Main page*/}
            <div className="container w-100 my-4">
                <div className="row">
                    <h3>Our available car brands!</h3>
                </div>
                <div className="row my-4 w-50 mx-auto">
                    <div className="col-6 col-md-4 col-lg-2">
                        <img src="/car-logos/bmw-logo-vector-01.png"
                             width="70px"
                             height="70px"
                             alt="Logo not found"/>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <img src="/car-logos/volkswagen-auto-vector-logo.png"
                             width="70px"
                             height="70px"
                             alt="Logo not found"/>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <img src="/car-logos/citroen-logo.png"
                             width="70px"
                             height="70px"
                             alt="Logo not found"/>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <img src="/car-logos/audi-logo-vector-download.jpg"
                             width="70px"
                             height="70px"
                             alt="Logo not found"/>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <img src="/car-logos/mitsubishi-logo-vector.jpg"
                             width="70px"
                             height="70px"
                             alt="Logo not found"/>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <img src="/car-logos/mercedes-benz--auto--vector-logo.png"
                             width="70px"
                             height="70px"
                             alt="Logo not found"/>
                    </div>
                </div>
                <div className="row my-5 justify-content-center">
                    <MDBCard className='my-2 col-10 col-md-7 col-lg-4 mx-2' style={{maxWidth: '645px'}}>
                        <MDBRow className='g-0'>
                            <MDBCol md='4'>
                                <MDBCardImage className='mt-2' src='/clean.png' alt='...' fluid />
                            </MDBCol>
                            <MDBCol md='8' className="my-auto">
                                <MDBCardBody>
                                    <h6>Clean cars. Flexible bookings. Socially distant rental counters.</h6>
                                    <MDBCardText>
                                        <small>We’re working with our partners to keep you safe and in the driving seat.</small>
                                    </MDBCardText>

                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                    <MDBCard className='my-2 col-10 col-md-7 col-lg-4 mx-2' style={{maxWidth: '645px'}}>
                        <MDBRow className='g-0'>
                            <MDBCol md='4'>
                                <MDBCardImage className='mt-2' src='/deals.png' alt='...' fluid />
                            </MDBCol>
                            <MDBCol md='8' className="my-auto">
                                <MDBCardBody>
                                    <h6>Price Match Guarantee</h6>
                                    <MDBCardText>
                                        <small>Found the same deal for less? We’ll match the price.</small>
                                    </MDBCardText>

                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </div>
                <div className="row justify-content-center">
                    <MDBContainer className="my-3 col-md-7" style={{maxWidth: '1000px'}}>
                        <MDBTypography
                            tag="h3"
                            className="text-center mb-4 pb-2 text-primary fw-bold"
                        >
                            FAQ
                        </MDBTypography>
                        <MDBAccordion alwaysOpen>
                            <MDBAccordionItem className='text-start' collapseId={1} headerTitle="What do I need to hire a car?">
                                <p>To book your car, all you need is a credit or debit card. When you pick the car up, you'll need:</p>
                                <ul>
                                    <li>Your voucher / eVoucher, to show that you've paid for the car.</li>
                                    <li>The main driver's credit / debit card, with enough available funds for the car's deposit.</li>
                                    <li>Each driver's full, valid driving licence, which they've held for at least 12 months (often 24).</li>
                                    <li>Your passport and any other ID the car hire company needs to see.</li>
                                </ul>
                            </MDBAccordionItem>
                            <MDBAccordionItem className='text-start' collapseId={2} headerTitle="How old do I have to be to rent a car?">
                                For most car hire companies, the age requirement is between 21 and 70 years old. If you're under 25 or over 70,
                                you might have to pay an additional fee.
                            </MDBAccordionItem>
                            <MDBAccordionItem className='text-start' collapseId={3} headerTitle="Can I book a hire car for someone else?">
                                Yes, as long as they meet these requirements. Just fill in their details while you're making the reservation.
                            </MDBAccordionItem>
                            <MDBAccordionItem className='text-start' collapseId={4} headerTitle="How do I find the cheapest car hire deal?">
                                We work with most of the major international car hire brands (and lots of smaller local companies)
                                to bring you a good choice of cars at the very best prices. To compare prices and find your ideal car at an unbeatable price,
                                just use our search form.
                            </MDBAccordionItem>
                            <MDBAccordionItem className='text-start' collapseId={5} headerTitle="What should I look for when I'm choosing a car?">
                                <ul>
                                    <li>Space: You'll enjoy your rental far more if you choose a car with plenty of room for your passengers and luggage.</li>
                                    <li>Fuel policy: Not planning on driving much? A Like for like fuel policy can save you a lot of money.</li>
                                    <li>Location: You can't beat an 'on-airport' pick-up for convenience, but an 'off-airport' pick-up with a shuttle bus can be much cheaper.</li>
                                </ul>
                            </MDBAccordionItem>
                            <MDBAccordionItem className='text-start' collapseId={6} headerTitle="Do I get any discounts?">
                                <p>You can get a discount depending on how many cars you've rented and for how long:</p>
                                <ul>
                                    <li>You get a 5% discount for renting a vehicle for more than 3 days.</li>
                                    <li>You get a 7% discount for renting a vehicle for more than 5 days.</li>
                                    <li>You get a 10% discount for renting a vehicle for more than 10 days.</li>
                                    <li>You get a 15% discount and become a VIP customer if you've rented a vehicle for more than 3 times
                                    in the last 60 days.</li>
                                </ul>
                            </MDBAccordionItem>
                        </MDBAccordion>
                    </MDBContainer>
                </div>
            </div>
        </div>
    );
}
