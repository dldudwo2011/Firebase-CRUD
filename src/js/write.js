import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref as databaseRef, push, set, get, remove } from "firebase/database";
import { db, storage } from "./libs/firebase/firebaseConfig";

const titleInput = document.querySelector("#title");
const fileInput = document.querySelector("#shoeImage");
const typeInput = document.querySelector("#type");
const numberOfColoursInput = document.querySelector("#colour-count");
const priceInput = document.querySelector("#price");
const statusInput = document.querySelector("#just-in");

const errorContainer = document.querySelector(".error-title");
const errorContainer2 = document.querySelector(".error-image");
const errorContainer3 = document.querySelector(".error-type");
const errorContainer4 = document.querySelector(".error-colour");
const errorContainer5 = document.querySelector(".error-price");

errorContainer.classList.add("d-none");
errorContainer2.classList.add("d-none");
errorContainer3.classList.add("d-none");
errorContainer4.classList.add("d-none");
errorContainer5.classList.add("d-none");

document
  .querySelector("#shoeImage")
  .addEventListener("change", onImageSelected);
document.forms["shoesForm"].addEventListener("submit", onAddShoe);
document.querySelector("#cancel").addEventListener("click", onCancel);

function onKeydown(e) {
  const errorContainer = e.currentTarget.parentNode.firstElementChild;
  if (!errorContainer.classList.contains("d-none")) {
    errorContainer.classList.add("d-none");
  }
  e.currentTarget.removeEventListener("keydown", onKeydown);
}

function onChange(e) {
  const errorContainer = e.currentTarget.parentNode.firstElementChild;
  if (!errorContainer.classList.contains("d-none")) {
    errorContainer.classList.add("d-none");
  }
  e.currentTarget.removeEventListener("change", onChange);
}

function onCancel(e) {
  e.preventDefault();
  const userResponse = confirm(
    "You will be directed to the main page without saving. Continue?"
  );
  if (userResponse) window.location.assign("index.html");
}

function onAddShoe(e) {
  e.preventDefault();
  uploadNewShoe();
}

function onImageSelected(e) {
  //selected file
  // file objets   [fileObj, fileObj, fileObj]
  let file = e.target.files[0];
  // update the display with the requested image
  document.querySelector(".display img").src = URL.createObjectURL(file);
}

async function uploadNewShoe() {
  // form data

  const title = titleInput.value.trim();
  const file = fileInput.files[0];
  const type = typeInput.value.trim();
  const numberOfColours = parseInt(numberOfColoursInput.value);
  const price = parseInt(priceInput.value);

  let status = "";

  if (statusInput.checked) status = statusInput.value;

  if (!title || !file || !type || !numberOfColours || !price) {
    if (!title) {
      errorContainer.textContent = "Title is required";
      errorContainer.classList.remove("d-none");
      titleInput.addEventListener("keydown", onKeydown);
    }
    if (!file) {
      errorContainer2.textContent = "Image is required";
      errorContainer2.classList.remove("d-none");
      fileInput.addEventListener("change", onChange);
    }

    if (!type) {
      errorContainer3.textContent = "Type is required";
      errorContainer3.classList.remove("d-none");
      typeInput.addEventListener("keydown", onKeydown);
    }

    if (!numberOfColours) {
      errorContainer4.textContent = "Number of colours is required";
      errorContainer4.classList.remove("d-none");
      numberOfColoursInput.addEventListener("keydown", onKeydown);
    }

    if (!price) {
      errorContainer5.textContent = "Price is required";
      errorContainer5.classList.remove("d-none");
      priceInput.addEventListener("keydown", onKeydown);
    }

    alert("You must fill in every text fields!");

    return;
  }

  if (title && file && type && numberOfColours && price) {
    // paths to the data to write
    const imageRef = await storageRef(storage, `images/products/${file.name}`);
    const dataRef = await databaseRef(db, "products");

    // uploading file to the storage bucket
    const uploadResult = await uploadBytes(imageRef, file);
    // url to the image stored in storage bucket
    const urlPath = await getDownloadURL(imageRef);
    // path on the storage bucket to the image
    const storagePath = uploadResult.metadata.fullPath;

    // firebase unique key
    const itemRef = await push(dataRef);

    set(itemRef, {
      key: itemRef.key,
      sku: `soccer-${itemRef.key}`,
      urlPath,
      storagePath,
      title,
      image: urlPath,
      type,
      price,
      numberOfColours,
      status,
    });

    alert("Successfully added.");
  }
}
