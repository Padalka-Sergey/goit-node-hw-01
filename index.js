const contacts = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const oneContact = await contacts.getContactById(id);
      console.log(oneContact);
      break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1b[31;43m Unknown action type!\x1b[0m");
  }
};

invokeAction(argv);

// contacts.listContacts().then((data) => console.table(data));
// contacts
//   .getContactById("qdggE76Jtbfd9eWJHrssH")
//     .then((data) => console.log(data));
// contacts
//   .removeContact("qdggE76Jtbfd9eWJHrssH")
//   .then((data) => console.log(data));
// contacts
//   .addContact("serg", "sereg442", "222222")
//   .then((data) => console.log(data));
