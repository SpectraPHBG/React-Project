import {Card} from "react-bootstrap";

export function AdminVehicleCard({vehicle}){

    return(
        <div>
            <Card>
                <Card.Img variant="top" src={vehicle.photoLink} />
                <Card.Body>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}
