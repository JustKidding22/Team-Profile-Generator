const path = require("path");
const fs = require("fs");

const srcDir = path.resolve(__dirname, "../src");

const render = (employees) => {
  const html = [];

  html.push(
    ...employees
    .filter((employee) =>employee.getRole() === "Manager")
     .map((manager) => renderManager(manager))
  );
  html.push(
    ...employees
    .filter((employee) => employee.getRole() === "Engineer")
    .map((engineer) => renderEngineer(engineer))
  );
  html.push(...employees
    .filter((employee) => employee.getRole() === "Intern")
    .map((intern) => renderIntern(intern)));

  return renderMain(html.join(""));
};

const renderManager = (manager) => {
  let dataIntoHTML = fs.readFileSync(path.resolve(srcDir, "manager.html"), "utf8");
  dataIntoHTML = replacePlaceholders(dataIntoHTML, "name", manager.getName());
  dataIntoHTML = replacePlaceholders(dataIntoHTML, "role", manager.getRole());
  dataIntoHTML = replacePlaceholders(dataIntoHTML, "email", manager.getEmail());
  dataIntoHTML = replacePlaceholders(dataIntoHTML, "id", manager.getId());
  dataIntoHTML = replacePlaceholders(dataIntoHTML, "officeNumber", manager.getOfficeNumber());
  return dataIntoHTML;
};

const renderEngineer = (engineer) => {
  let dataIntoHTML = fs.readFileSync(path.resolve(srcDir, "engineer.html"), "utf8");
  dataIntoHTML = replacePlaceholders(dataIntoHTML, "name", engineer.getName());
  dataIntoHTML = replacePlaceholders(dataIntoHTML, "role", engineer.getRole());
  dataIntoHTML = replacePlaceholders(dataIntoHTML, "email", engineer.getEmail());
  dataIntoHTML = replacePlaceholders(dataIntoHTML, "id", engineer.getId());
  dataIntoHTML = replacePlaceholders(dataIntoHTML, "github", engineer.getGithub());
  return dataIntoHTML;
};

const renderIntern = (intern) => {
  let dataIntoHTML = fs.readFileSync(path.resolve(srcDir, "intern.html"), "utf8");
  dataIntoHTML = replacePlaceholders(dataIntoHTML, "name", intern.getName());
  dataIntoHTML = replacePlaceholders(dataIntoHTML, "role", intern.getRole());
  dataIntoHTML = replacePlaceholders(dataIntoHTML, "email", intern.getEmail());
  dataIntoHTML = replacePlaceholders(dataIntoHTML, "id", intern.getId());
  dataIntoHTML = replacePlaceholders(dataIntoHTML, "school", intern.getSchool());
  return dataIntoHTML;
};

const renderMain = (html) => {
  const template = fs.readFileSync(path.resolve(srcDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
