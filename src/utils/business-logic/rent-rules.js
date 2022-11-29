export function getDiscount(rentDays, rentals){
    const minDate = new Date();
    let discount = 0;
    minDate.setMonth(minDate.getMonth()-2);

    const filteredResponse = rentals.filter(r => new Date(r.createdAt) >= minDate);
    if(filteredResponse.length>3){
        discount = 15;
    }
    else if (rentDays > 10) {
        discount = 10;
    } else if (rentDays > 5) {
        discount = 7;
    } else if (rentDays > 3) {
        discount = 5;
    }

    return discount;
}
