const prompt = require('prompt-sync')();
class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        this.validateName(firstName);
        this.validateName(lastName);
        this.validateAddress(address);
        this.validateAddress(city);
        this.validateAddress(state);
        this.validateZip(zip);
        this.validatePhoneNumber(phoneNumber);
        this.validateEmail(email);

        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    validateName(name) {
        const nameRegex = /^[A-Z][a-zA-Z]{2,}$/;
        if (!nameRegex.test(name)) {
            throw new Error(`Invalid name: ${name}`);
        }
    }

    validateAddress(address) {
        if (address.length < 4) {
            throw new Error(`Invalid address: ${address}`);
        }
    }

    validateZip(zip) {
        const zipRegex = /^\d{6}$/;
        if (!zipRegex.test(zip)) {
            throw new Error(`Invalid zip code: ${zip}`);
        }
    }

    validatePhoneNumber(phoneNumber) {
        const phoneRegex = /^[+]\d{1,3} \d{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            throw new Error(`Invalid phone number: ${phoneNumber}`);
        }
    }

    validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9]+[.]{0,1}[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]{0,1}[a-zA-Z]{2,4}[.]{0,1}[a-zA-Z]{0,2}$/;
        if (!emailRegex.test(email)) {
            throw new Error(`Invalid email: ${email}`);
        }
    }
}

const addressBook = [];

function addContact() {
    const firstName = prompt("Enter First Name:");
    const lastName = prompt("Enter Last Name:");

    const existingContactIndex = findContactIndexByName(firstName, lastName);
    if (existingContactIndex !== -1) {
        console.log("Contact already exists in the address book.");
        return;
    }
}

function findContactByName(firstName, lastName) {
    for (let i = 0; i < addressBook.length; i++) {
        const contact = addressBook[i];
        if (contact.firstName === firstName && contact.lastName === lastName) {
            return i;
        }
    }
    return -1;
}

const address = prompt("Enter Address:");
const city = prompt("Enter City:");
const state = prompt("Enter State:");
const zip = prompt("Enter Zip:");
const phoneNumber = prompt("Enter Phone Number:");
const email = prompt("Enter Email:");

try {
    const contact = new Contact(
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
        phoneNumber,
        email
    );
    addressBook.push(contact);
    console.log("Contact added successfully.");
} catch (error) {
    console.error("Error creating contact:", error.message);
}

function editContact() {
    const firstName = prompt("Enter First Name of the contact to edit:");
    const lastName = prompt("Enter Last Name of the contact to edit:");

    const contactIndex = findContactByName(firstName, lastName);
    if (contactIndex !== -1) {
        const contact = addressBook[contactIndex];
        console.log("Existing Contact:");
        console.log("First Name:", contact.firstName);
        console.log("Last Name:", contact.lastName);
        console.log("Address:", contact.address);
        console.log("City:", contact.city);
        console.log("State:", contact.state);
        console.log("Zip:", contact.zip);
        console.log("Phone Number:", contact.phoneNumber);
        console.log("Email:", contact.email);

        const newAddress = prompt("Enter new Address:");
        const newCity = prompt("Enter new City:");
        const newState = prompt("Enter new State:");
        const newZip = prompt("Enter new Zip:");
        const newPhoneNumber = prompt("Enter new Phone Number:");
        const newEmail = prompt("Enter new Email:");

        try {
            contact.address = newAddress;
            contact.city = newCity;
            contact.state = newState;
            contact.zip = newZip;
            contact.phoneNumber = newPhoneNumber;
            contact.email = newEmail;

            console.log("Contact updated successfully!");
        } catch (error) {
            console.error("Error updating contact:", error.message);
        }
    } else {
        console.log("Contact not found.");
    }
}


try {
    const contact = new Contact(
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
        phoneNumber,
        email
    );

    const existingContactIndex = findContactIndexByName(firstName, lastName);
    if (existingContactIndex !== -1) {
        throw new Error("Contact already exists in the address book.");
    }
    addressBook[contactIndex] = contact;
    console.log("Contact updated successfully!");
} catch (error) {
    console.error("Error updating contact:", error.message);
}

function deleteContact() {
    const firstName = prompt("Enter First Name of the contact to delete:");
    const lastName = prompt("Enter Last Name of the contact to delete:");

    const contactIndex = findContactByName(firstName, lastName);
    if (contactIndex !== -1) {
        const deletedContact = addressBook.splice(contactIndex, 1);
        console.log("Contact deleted successfully!");
        console.log("Deleted Contact:", deletedContact[0]);
    } else {
        console.log("Contact not found.");
    }
}

function countContacts() {
    const totalCount = addressBook.reduce((count) => count + 1, 0);
    console.log("Total number of contacts:", totalCount);
}

function searchByCityOrState() {
    const searchOption = prompt(
      "Enter 1 to search by City, 2 to search by State: "
    );
  
    let searchKey, searchValue;
    if (searchOption === "1") {
      searchKey = "city";
      searchValue = prompt("Enter the City name: ");
    } else if (searchOption === "2") {
      searchKey = "state";
      searchValue = prompt("Enter the State name: ");
    } else {
      console.log("Invalid search option.");
      return;
    }
  
    const filteredContacts = addressBook.filter(
      (contact) => contact[searchKey] === searchValue
    );
  
    console.log("Search Results:");
    if (filteredContacts.length === 0) {
      console.log("No contacts found.");
    } else {
      filteredContacts.forEach((contact) => {
        console.log(contact);
      });
    }
  }

  function countContactsByCity() {
    const countByCity = addressBook.reduce((countMap, contact) => {
      const { city } = contact;
      if (countMap.hasOwnProperty(city)) {
        countMap[city] += 1;
      } else {
        countMap[city] = 1;
      }
      return countMap;
    }, {});
  
    console.log("Count by City:");
    for (const city in countByCity) {
      console.log(`${city}: ${countByCity[city]}`);
    }
  }
  
  function countContactsByState() {
    const countByState = addressBook.reduce((countMap, contact) => {
      const { state } = contact;
      if (countMap.hasOwnProperty(state)) {
        countMap[state] += 1;
      } else {
        countMap[state] = 1;
      }
      return countMap;
    }, {});
  
    console.log("Count by State:");
    for (const state in countByState) {
      console.log(`${state}: ${countByState[state]}`);
    }
  }


  function sortAddressBookBy(field) {
    let sortedAddressBook = [];
  
    switch (field) {
      case "name":
        sortedAddressBook = addressBook.sort((a, b) => {
          const nameA = `${a.firstName} ${a.lastName}`.toUpperCase();
          const nameB = `${b.firstName} ${b.lastName}`.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        break;
  
      case "city":
        sortedAddressBook = addressBook.sort((a, b) => {
          const cityA = a.city.toUpperCase();
          const cityB = b.city.toUpperCase();
          if (cityA < cityB) {
            return -1;
          }
          if (cityA > cityB) {
            return 1;
          }
          return 0;
        });
        break;
  
      case "state":
        sortedAddressBook = addressBook.sort((a, b) => {
          const stateA = a.state.toUpperCase();
          const stateB = b.state.toUpperCase();
          if (stateA < stateB) {
            return -1;
          }
          if (stateA > stateB) {
            return 1;
          }
          return 0;
        });
        break;
  
      case "zip":
        sortedAddressBook = addressBook.sort((a, b) => a.zip - b.zip);
        break;
  
      default:
        console.log("Invalid field for sorting.");
        return;
    }
  
    console.log(`Address Book Sorted by ${field.charAt(0).toUpperCase() + field.slice(1)}:`);
    sortedAddressBook.forEach((contact) => {
      console.log(
        `${contact.firstName} ${contact.lastName}, ${contact.address}, ${contact.city}, ${contact.state}, ${contact.zip}, ${contact.phoneNumber}, ${contact.email}`
      );
    });
  }

let choice;

do {
    console.log("Welcome to AddressBookManager Menu");
    console.log("Press 1 to Add Contact");
    console.log("Press 2 to Edit Contact");
    console.log("Press 3 for FInd By Name");
    console.log("Press 4 to Delete COntact");
    console.log("Press 5 to Get Count Of Contact");
    console.log("press 6 to Search Contact by City or State");
    console.log("press 7 to Get Count By City");
    console.log("press 8 to Get Count By State");
    console.log("Press 9 to Sort Contact By Name");
    console.log("Press 10 to Sort Contact by City");
    console.log("press 11 to Sort Contact by State");
    console.log("press 12 to Sort Contact by ZipCode");
    console.log("Press 0 to Exit");

    choice = Number(prompt("Enter your choice: "));

    switch (choice) {
        case 1:
            addContact();
            break;
        case 2:
            editContact();
            break;
        case 3:
            findContactByName();
            break;
        case 4:
            deleteContact();
            break;
        case 5:
            countContacts();
            break;
        case 6:
            searchByCityOrState();
            break;
        case 7:
            countContactsByCity();
            break;
        case 8:
            countContactsByState();
            break;
        case 9:
            sortAddressBookBy("name");
            break;
        case 0:
            console.log("Exiting the program...");
            break;
        default:
            console.log("Invalid Input!!");
            break;
    }
} while (choice !== 0);