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

    ///// (1)get parent node
    var newRow = createContactListItem(contact);

    ///// (2)appending node to the parent
    $("#contactsList").append(newRow);

}


////creating node html
function createContactListItem(contact) {

    //most parent element in a list row
    var motherListItem = $("<li class='ui-li-has-alt ui-li-has-thumb ui-first-child'></li>");

    // <a> tag that represents the name and contains the image
    profileImageURL = contact.gender == "male" ? "styles/icons/male.png" : "styles/icons/female.svg";
    var imageLink = $("<a id=" + contact.id + " class='ui-btn' href='#'> <img src=" + profileImageURL + " /> " + contact.name + " </a>");

    //the button on the right
    var button = $("<a href='tel:" + contact.phone + "' data-role='button' data-icon='phone' " +
        "class='ui-btn ui-btn-icon-notext ui-icon-phone' title=''></a>");

    motherListItem.append(imageLink);
    motherListItem.append(button);

    return motherListItem;

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
    this.phone = phone;
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

