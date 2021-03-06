let contacts = [];
var errorTimeoutInstance;

function deleteContact(id){

    //delete from local storage
    getcontactsArrayFromLocalStorage();
    var contactIndex = contacts.findIndex((contact) => contact.id == id);
    contacts.splice(contactIndex , 1);
    saveContactToLocalStorage();

    //delete from list in home
    $("#" + id).remove();

}

function deleteContactHandler(){

    var currentContactIDViewedInProfile = localStorage.getItem("currentContactIDViewedInProfile");
    deleteContact(currentContactIDViewedInProfile);
    $.mobile.changePage("#home", {transition: "flip"});

}

function viewContactOnProfilePage(contactID) {

    localStorage.setItem("currentContactIDViewedInProfile" , contactID);
    var profileContact = getContactByID(contactID);
    if (contact != false) {

        profileImageURL = profileContact.gender == "Male" ? "styles/icons/male.png" : "styles/icons/female.svg";

        $("#profilePhone").html(profileContact.phone);
        $("#profileName").html(profileContact.name);
        $("#profileName2").html(profileContact.name);
        $("#profileCallLink").attr("href", "tel:" + profileContact.phone);
        $("#profileEmail").html(profileContact.email);
        $("#profileImage").attr("src", profileImageURL);

    }

}

function getContactByID(contactID) {
    getcontactsArrayFromLocalStorage();
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].id == contactID) {
            return contacts[i];
        }
    }
    return false;
}

function refresh() {
    getcontactsArrayFromLocalStorage();
    drawContactsList();
}

function getcontactsArrayFromLocalStorage() {
    var arrayOfContacts = localStorage.getItem("contacts");
    if (arrayOfContacts != null) {
        contacts = JSON.parse(arrayOfContacts);
    } else {
        contacts = [];
    }
}

///getting contacts from local storage to be displayed
function drawContactsList() {
    contacts.forEach(contact => addContactToList(contact));
}

///adding new object to the contact list
function addContactToList(contact) {
    ///// (1)get parent node
    var newRow = createContactListItem(contact);
    ///// (2)appending node to the parent
    $("#contactsList").append(newRow);
}


////creating node html
function createContactListItem(contact) {
    //most parent element in a list row
    var motherListItem = $("<li  id=" + contact.id + "  class='ui-li-has-alt ui-li-has-thumb ui-first-child'></li>");
    // <a> tag that represents the name and contains the image
    profileImageURL = contact.gender == "Male" ? "styles/icons/male.png" : "styles/icons/female.svg";
    var imageLink = $("<a data-transition='flip' onclick='viewContactOnProfilePage(" + contact.id + ")' class='ui-btn' href='#profile'> <img src=" + profileImageURL + " /> " + contact.name + " </a>");
    //the button on the right
    var button = $("<a href='tel:" + contact.phone + "' data-role='button' data-icon='phone' " +
        "class='ui-btn ui-btn-icon-notext ui-icon-phone' title=''></a>");
    motherListItem.append(imageLink);
    motherListItem.append(button);
    return motherListItem;
}


function clearAddContactPage() {

    var name = $("#name").val("");
    var phone = $("#phone").val("");
    var email = $("#email").val("");
    $("#invalidErrorMessage").html("");

}


// getting data from the form
function createContact() {

    if (isDataInputValid()) {

        var id = getAutoGenratedId();
        var name = $("#name").val();
        var phone = $("#phone").val();
        var email = $("#email").val();
        var gender = $("#flip").val();
        var newContact = new contact(id, name, phone, email, gender);

        contacts.push(newContact);
        addContactToList(newContact);
        saveContactToLocalStorage();
        $.mobile.changePage("#home", {transition: "flip"});
        clearAddContactPage();

    }
}

function addContactCancelButtonHandler() {

    $.mobile.changePage("#home", {transition: "flip"});
    clearAddContactPage();

}

function isDataInputValid() {

    var isValid = true;

    if (!(/^[a-zA-Z ]{2,30}$/.test($("#name").val().trim()))) {

        isValid = false;
        printErrorMessage("Sorry but the user name is not valid");

    }

    if (isValid && !(/^(01){1}\d{9}$/.test($("#phone").val().trim()))) {

        isValid = false;
        printErrorMessage("Invalid phone");

    }

    if (isValid && isPhoneDuplicate($("#phone").val().trim())) {

        isValid = false;
        printErrorMessage("Phone number already registered");

    }

    if (isValid && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($("#email").val().trim()))) {

        isValid = false;
        printErrorMessage("Invalid email address");

    }

    return isValid;
}

function isPhoneDuplicate(phone) {

    getcontactsArrayFromLocalStorage();

    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].phone == phone) {
            return true;
        }
    }
    return false;
}

function printErrorMessage(message) {

    clearTimeout(errorTimeoutInstance);
    $("#invalidErrorMessage").html(message);
    $("#invalidErrorMessage").fadeIn("slow")
    errorTimeoutInstance = setTimeout(function () {

        $("#invalidErrorMessage").fadeOut("slow");

    }, 10_000);

}

////save object to local storage
function saveContactToLocalStorage() {
    const myJson = JSON.stringify(contacts);
    window.localStorage.setItem("contacts", myJson);
}

////constructor function
function contact(id, name, phone, email, gender) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.gender = gender;
}

/// function to generate  ids
function getAutoGenratedId() {

    var maxID = 0;
    getcontactsArrayFromLocalStorage();
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].id > maxID) {
            maxID = contacts[i].id;
        }
    }
    return ++maxID;

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

////function to refresh the list in first page
function onload() {

    viewContactOnProfilePage(localStorage.getItem("currentContactIDViewedInProfile"));
    refresh();

}