const showNotification = (msg, type = "") => {
  let errors = document.getElementsByClassName("errors")[0];
  errors.style.display = "none";

  document.getElementById("error").innerHTML = msg;
  errors.style.display = "block";
  type === "success" ? (errors.style.backgroundColor = "green") : "";

  //Hide notification after 4 sec
  setTimeout(function () {
    errors.style.display = "none";
  }, 4000);
};

module.exports = showNotification;
