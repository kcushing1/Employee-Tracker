//convert input of upper or lower case to be first letter capitalized

const capitalize = (name) => {
  return name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);
};

module.exports = capitalize;
