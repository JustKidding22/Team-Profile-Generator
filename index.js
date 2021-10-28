const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "dist");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const questions = [
  {
    type: "input",
    name: "name",
    message: "Please Enter the Team Member's Name: ",
  },

  {
    type: "input",
    name: "id",
    message: "Please Enter the Team Member's ID: ",
  },
  {
    type: "input",
    name: "email",
    message: "Please Enter the Team Member's Email: ",
  },
  {
    type: "list",
    name: "role",
    message: "Please Select the Team Member's Role: ",
    choices: ["Manager", "Engineer", "Intern"],
  },
];

const team = [];
const generateTeam = () => {
  inquirer
    .prompt(questions)
    .then((answer) => {
      inquirer
        .prompt([
          {
            when: () => answer.role === "Manager",
            type: "input",
            message: "Please Enter their Office Number: ",
            name: "officeNumber",
          },
          {
            when: () => answer.role === "Engineer",

            type: "input",
            message: "Please Enter their Github Username: ",
            name: "github",
          },

          {
            when: () => answer.role === "Intern",

            type: "input",
            message: "Please Enter their School Name: ",
            name: "school",
          },

          {
            type: "confirm",
            message: "Want to Add Another Team Member?",
            name: "addMember",
          },
        ])

        .then((answer2) => {
          if (answer.role === "Manager") {
            const manager = new Manager(answer.name, answer.id, answer.email, answer2.officeNumber);
            team.push(manager);
          }

          if (answer.role === "Engineer") {
            const engineer = new Engineer(answer.name, answer.id, answer.email, answer2.github);
            team.push(engineer);
          }

          if (answer.role === "Intern") {
            const intern = new Intern(answer.name, answer.id, answer.email, answer2.school);
            team.push(intern);
          }
          if (answer2.addMember) {
            generateTeam();
          } else {
            team.forEach((team) => {
              console.log(team);
            });
            fs.writeFile(outputPath, render(team), (err) => {
              if (err) {
                throw err;
              }
              console.log("The team has been created successfully!");
            });
          }
        });
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
};

generateTeam();
