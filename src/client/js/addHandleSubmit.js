const geonamesURL = "http://api.geonames.org/searchJSON?q=";
const userName = "&username=liminjun88";

const apiURL = "http://localhost:8081";

function getList() {
  getTravelList(apiURL + "/list").then((allData) => {
    if (allData.length < 1) {
      Client.showNotification("No new trips found. Try to add new one");
    }
    generateContent(allData);
  });
}

function addHandleSubmit(event) {
  event.preventDefault();
  let city = document.getElementById("city").value;
  let goDate = document.getElementById("date").value;

  if (city == "" || goDate == "") {
    Client.showNotification("Enter a valid location and date");
    return;
  }

  let timesDiff = Math.abs(new Date(goDate).getTime() - new Date().getTime);
  let diffDays = Math.ceil(timesDiff / (1000 * 60 * 60 * 24));

  getData(geonamesURL, city, userName).then((data) => {
    postData(apiURL + "/add", {
      location: data.geonames[0].name,
      latitude: data.geonames[0].lat,
      longitude: data.geonames[0].lng,
      countryName: data.geonames[0].countryName,
      goDate: goDate,
      duration: diffDays,
    }).then((response) => {
      Client.showNotification(response.messsage, "success");

      getTravelList(apiURL + "/list").then((allData) => {
        generateContent(allData);
      });
    });
  });
}

function generateContent(allData) {
  const resultContainer = document.getElementById("result-container");
  resultContainer.innerHTML = "";
  let resultTemplate = "";
  for (let i = 0; i < allData.length; i++) {
    let template = `
    <div class="post-feed">
            <article class="post-card post tag-updates">
              <div class="post-card-image-link">
                <div
                  class="post-card-image"
                  style="background-image: url(${
                    allData[i].imageUrl == ""
                      ? Client.previewImage
                      : allData[i].imageUrl
                  });"
                ></div>
              </div>
              <div class="post-card-content">
                <div class="post-card-content-link">
                  <header class="post-card-header">
                    <span class="post-card-tags">Departing: ${
                      allData[i].goDate
                    }</span>
                    <h2 class="post-card-title">
                    Trip to: ${allData[i].location}, ${allData[i].countryName}
                    </h2>
                  </header>
                  <section class="post-card-excerpt">
                    <strong>Typical weather temperature:</strong>
                    <p>
                    High: <span>${allData[i].temperatureMax}</span>
                    <br>
                    Low: <span>${allData[i].temperatureMin}</span>
                    </p>
                    <strong>Weather forecast:</strong>
                    <p>${allData[i].dailySummary}</p>
                  </section>
                </div>
                <footer class="post-card-meta">
                <button onclick="return Client.deleteHandleSubmit(event);"
                data-index=${i}>
                Remove trip
                </button>
                </footer>
              </div>
            </article>
          </div>`;

    resultTemplate += template;
  }
  resultContainer.innerHTML = resultTemplate;
}

const getTravelList = async (requestUrl) => {
  const response = await fetch(requestUrl);
  try {
    const result = await response.json();
    return result;
  } catch (error) {}
};

const getData = async (url, city, userName) => {
  const response = await fetch(url + city + userName + "&maxRows=1");
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

module.exports = {
  addHandleSubmit,
  getList,
};
