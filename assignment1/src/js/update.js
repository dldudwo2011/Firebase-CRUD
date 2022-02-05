import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref as dataRef, push, set, get, update } from "firebase/database";
import { db, storage } from "./libs/firebase/firebaseConfig";

const display = document.querySelector(".display img");
const imageInput = document.querySelector("#shoeImage");
const titleInput = document.querySelector("#title");
const typeInput = document.querySelector("#type");
const priceInput = document.querySelector("#price");
const numberOfColoursInput = document.querySelector("#colour-count");
const statusInput = document.getElementById("just-in");
const key = sessionStorage.getItem("key");

imageInput.addEventListener("change", onImageSelected);
document.forms["shoesForm"].addEventListener("submit", onUpdateShoe);
document.querySelector("#cancel").addEventListener("click", onCancel);

function onCancel(e) {
  e.preventDefault();
  const userResponse = confirm(
    "You will be directed to the main page without saving. Continue?"
  );
  if (userResponse) window.location.assign("index.html");
}

function onUpdateShoe(e) {
  e.preventDefault();
  updateNewShoe();
}

function onImageSelected(e) {
  //selected file
  // file objets   [fileObj, fileObj, fileObj]
  let file = e.target.files[0];
  // update the display with the requested image
  document.querySelector(".display img").src = URL.createObjectURL(file);
}

async function updateNewShoe() {
  // form data
  const title = titleInput.value.trim();
  const file = imageInput.files[0];
  const type = typeInput.value.trim();
  const numberOfColours = numberOfColoursInput.value;
  const price = priceInput.value;
  let status = "";

  if (statusInput.checked) status = statusInput.value;

  const shoeRef = dataRef(db, `assignment1/${key}`);
  // paths to the data to write
  if (file != null) {
    const imageRef = await storageRef(storage, `images/${file.name}`);
    // uploading file to the storage bucket
    const uploadResult = await uploadBytes(imageRef, file);
    // url to the image stored in storage bucket
    const urlPath = await getDownloadURL(imageRef);
    // path on the storage bucket to the image
    const storagePath = uploadResult.metadata.fullPath;

    update(shoeRef, {
      // urlPath,
      image: urlPath,
      title,
      storagePath,
      type,
      price,
      numberOfColours,
      status,
    });
  } else {
    update(shoeRef, {
      // urlPath,
      title,
      type,
      price,
      numberOfColours,
      status,
    });
  }

  alert("Update success.");
}

async function pageInit() {
  if (key == null) return;

  const shoeRef = dataRef(db, `assignment1/${key}`);
  const shoeSnapShot = await get(shoeRef);
  const data = shoeSnapShot.val();

  display.src = data.image;
  titleInput.value = data.title;
  typeInput.value = data.type;
  priceInput.value = data.price;
  numberOfColoursInput.value = data.numberOfColours;
  if (data.status === "Just In") statusInput.click();
}

pageInit();
