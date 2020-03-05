let contacts = [];
let idCounter = 0;


function refresh() {
    getcontactsArrayFromLocalStorage();
    drawContactsList();
}

function getcontactsArrayFromLocalStorage() {
    contacts = JSON.parse(localStorage.getItem("contacts"));
}

function drawContactsList() {
    contacts.forEach(contact => addContactToList(contact));
}

function addContactToList(contact) {
    /////(1)get parent node
    createContactListItem(contact);
    ////(3)appanding node to the parent
}


////creating node html
function createContactListItem(contact) {

}

function createContact() {
    con = new contact();
    contacts.push(con);
    addContactToList(con);
    saveContactToLocalStorage();
}

function saveContactToLocalStorage() {
    const myJson = JSON.stringify(contacts);
    window.localStorage.setItem("contacts", myJson);
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
    var isPhone = /^(01){1}\d{9}$/;
    return isPhone.test(phone);

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

