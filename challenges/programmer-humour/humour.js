// initial setup
function setup() {
  const targetLink = `https://xkcd.now.sh/?comic=latest`;
  getLatestHumour(targetLink);
}

window.onload = setup;

const getLatestHumour = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      createContent(data);
    })
    .catch(() => {
      createContent("error");
    });
};

const createContent = (data) => {
  const content = document.getElementById("content");
  if (data === "error") {
    const h2 = document.createElement("h2");
    h2.textContent = "Sorry, cannot load data. Please try refreshing the page";
    content.appendChild(h2);
  } else {
    const img = document.createElement("img");
    img.src = data.img;
    img.alt = data.alt;
    content.appendChild(img);
  }
};
