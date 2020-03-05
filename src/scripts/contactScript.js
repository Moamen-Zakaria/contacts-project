let contacts = [];
let idCounter = 0;


function createContact() {


}


function contact(id, name, phone, email, gender) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.gender = gender;
}

function getAutoGenratedId() {
    idCounter++;
    return idCounter;
}

function phoneValidation(phone) {


}

function nameValidation(name) {
    var hasnum = /\d/;
    fName = name.trim();
    if (fName.length > 0) {
        if (!hasnum.test(fName) && !hasnum.test(lName)) {
            return true;
        }
    }
    return false;
}

function emailValidation(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

