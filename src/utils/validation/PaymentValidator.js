export function validateCardHolderName(name){
    const regex = /^[a-zA-Z ]+$/;
    if(!regex.test(name) || name === "" || name.split(" ").length !== 2){
        return false;
    }

    return true;
}
export function validateCardNumber(cardNumber){
    const regex = /^[\d ]+$/;

    if(!regex.test(cardNumber) || cardNumber === "" || cardNumber.split(" ").length !== 4 || cardNumber.length !== 19){
        return false;
    }

    return true;
}
export function validateCardExpirationDate(cardExpirationDate){
    const regex = /^[\d\/]+$/;

    if(!regex.test(cardExpirationDate) || cardExpirationDate === "" || cardExpirationDate.length !== 7){
        return false;
    }
    const now = new Date();
    const dateComponents = cardExpirationDate.split("/");
    const expirationDate = new Date(dateComponents[1],dateComponents[0]);
    if(parseInt(dateComponents[0])>12 || expirationDate < now){
        return false;
    }
    return true;
}
export function validateCardCvv(cvv){
    const regex = /^[\d\/]+$/;
    if(!regex.test(cvv) || cvv === "" || cvv.length !== 3){
        return false;
    }

    return true;
}
