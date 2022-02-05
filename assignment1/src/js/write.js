import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref as databaseRef, push, set, get, remove } from "firebase/database";
import { db, storage } from "./libs/firebase/firebaseConfig";

document
  .querySelector("#shoeImage")
  .addEventListener("change", onImageSelected);
document.forms["shoesForm"].addEventListener("submit", onAddShoe);
document.querySelector("#cancel").addEventListener("click", onCancel);

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
  const title = document.querySelector("#title").value.trim();
  const file = document.querySelector("#shoeImage").files[0];
  const type = document.querySelector("#type").value.trim();
  const numberOfColours = document.querySelector("#colour-count").value;
  const price = document.querySelector("#price").value;
  const statusInput = document.querySelector("#just-in");
  let status = "";

  if (statusInput.checked) status = statusInput.value;

  // paths to the data to write
  const imageRef = await storageRef(storage, `images/${file.name}`);
  const dataRef = await databaseRef(db, "assignment1");

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
}
