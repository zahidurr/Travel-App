const apiURL = "http://localhost:8081";

function deleteHandleSubmit(event) {
  const currentIndex = event.target.dataset.index;

  removeTrip(apiURL + "/delete", { currentIndex: currentIndex }).then(
    (response) => {
      if (response.success) {
        Client.showNotification(response.messsage, "success");
        Client.addHandleSubmit.getList();
      }
    }
  );
}
const removeTrip = async (requestUrl = "", data = {}) => {
  const response = await fetch(requestUrl, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    //console.log("error", error);
  }
};

module.exports = deleteHandleSubmit;
