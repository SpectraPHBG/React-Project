export function isRentalLate(rental){
    const returnDate = new Date(rental.rentTo);
    const now = new Date();
    if(rental.status === "Ongoing" && returnDate < now){
        return true;
    }
    else {
        return false;
    }
}
