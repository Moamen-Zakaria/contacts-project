let contacts = [];
let idCounter = 0;

let currentContactIDViewedInProfile;

function viewContactOnProfilePage(contactID){

    var profileContact = getContactByID(contactID);
    if(contact != false){

        profileImageURL = profileContact.gender == "male" ? "styles/icons/male.png" : "styles/icons/female.svg";


        $("#profileName").html(profileContact.name);
        $("#profileCallLink").attr("href","tel:"+profileContact.phone);
        $("#profileEmail").html(profileContact.email);
        $("#profileImage").attr("src" , profileImageURL);

    }

}

function getContactByID(contactID){

    getcontactsArrayFromLocalStorage();

    for(var i = 0 ; i < contacts.length ; i++){

        if(contacts[i].id == contactID){

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
    var arrayOfContacts  = localStorage.getItem("contacts");
    if(arrayOfContacts != null){

        contacts = JSON.parse(arrayOfContacts);

    }else{

        contacts = [];
    }
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
    profileImageURL = contact.gender == "Male" ? "styles/icons/male.png" : "styles/icons/female.svg";
    var imageLink = $("<a id=" + contact.id + " data-transition='flip' onclick='viewContactOnProfilePage("+contact.id+")' class='ui-btn' href='#profile'> <img src=" + profileImageURL + " /> " + contact.name + " </a>");

    //the button on the right
    var button = $("<a href='tel:" + contact.phone + "' data-role='button' data-icon='phone' " +
        "class='ui-btn ui-btn-icon-notext ui-icon-phone' title=''></a>");

    motherListItem.append(imageLink);
    motherListItem.append(button);

    return motherListItem;

}

$("#saveBtn").bind("click", function (envent) {
    createContact();
});

function createContact() {
    var id = getAutoGenratedId();
    var name = $("#name").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var gender = $("#flip").val()
    console.log("name");
    ////using var caused not a constructor error
    contact = new contact(id, name, phone, email, gender);
    contacts.push(contact);
    addContactToList(contact);
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

function onload(){

    refresh();git
    // $("#saveBtn").bind( "click" , function () {
    //     alert("ddd");
    //     createContact();
    // });

}