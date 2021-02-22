// initial setup
function setup() {
  const targetLink = `https://dog.ceo/api/breeds/image/random`;
  getFirstImage(targetLink);
}

window.onload = setup;

// this function attempts to fetch the first image
const getFirstImage = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => createInitialContent(data))
    .catch(() => {
      createInitialContent("error");
    });
};

const createInitialContent = (imageData) => {
  const content = document.getElementById("content");
  content.style.width = "100%";
  if (imageData === "error") {
    const h2 = document.createElement("h2");
    h2.textContent = "Sorry, cannot load data. Please try refreshing the page";
    content.appendChild(h2);
  } else {
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    const button = document.createElement("button");
    const list = document.createElement("ul");
    const item = createImageItem(imageData.message);
    h2.textContent = "Your Dog Image Galery";
    p.textContent = "You have 1 photo so far";
    button.id = "add-image";
    button.textContent = "Add Image";
    button.addEventListener("click", addImage);
    list.appendChild(item);
    content.appendChild(h2);
    content.appendChild(p);
    content.appendChild(button);
    content.appendChild(list);
  }
};

function createImageItem(link) {
  const item = document.createElement("li");
  const img = document.createElement("img");
  img.src = link;
  item.appendChild(img);
  return item;
}

function addImage() {
  const targetLink = `https://dog.ceo/api/breeds/image/random`;
  fetch(targetLink)
    .then((response) => response.json())
    .then((data) => {
      const numPhotos = document.querySelectorAll("img").length + 1;
      document.querySelector("ul").appendChild(createImageItem(data.message));
      document.querySelector(
        "#content p"
      ).textContent = `You have ${numPhotos} photos so far`;
    })
    .catch(() => alert("Sorry, cannot add image. Please try again."));
}
