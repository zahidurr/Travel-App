async function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formURL = document.getElementById("url").value;
  if (Client.checkForURL(formURL)) {
    await fetch("http://localhost:8001/url", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: formURL }),
    })
      .then((res) => res.json())

      //Updating UI with the response
      .then((data) => {
        console.log(data);
        document.getElementById("polarity").innerHTML = data.polarity;
        document.getElementById("subjectivity").innerHTML = data.subjectivity;
        document.getElementById("polarity_confidence").innerHTML =
          data.polarity_confidence;
        document.getElementById("subjectivity_confidence").innerHTML =
          data.subjectivity_confidence;
        document.getElementById("full_text").innerHTML = data.text;
      });
  } else {
    let errors = document.getElementsByClassName("errors")[0];
    document.getElementById("error").innerHTML = "Please enter a valid link";
    errors.style.display = "block";
  }
}

export { handleSubmit };
