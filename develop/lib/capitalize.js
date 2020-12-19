const { builtinModules } = require("module");

//convert input of upper or lower case to be First Letter Capitalized

const capitalize = (name) => {
  return name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);
};

module.export = capitalize;
