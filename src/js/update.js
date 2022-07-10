import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  listAll
} from "firebase/storage";
import { ref as dataRef, get, update } from "firebase/database";
import { db, storage } from "./libs/firebase/firebaseConfig";

const display = document.querySelector(".display img");
const imageInput = document.querySelector("#shoeImage");
const titleInput = document.querySelector("#title");
const typeInput = document.querySelector("#type");
const priceInput = document.querySelector("#price");
const numberOfColoursInput = document.querySelector("#colour-count");
const statusInput = document.getElementById("just-in");
const key = sessionStorage.getItem("key");

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

imageInput.addEventListener("change", onImageSelected);
document.forms["shoesForm"].addEventListener("submit", onUpdateShoe);
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
  const numberOfColours = parseInt(numberOfColoursInput.value);
  const price = parseInt(priceInput.value);
  let status = "";

  if (statusInput.checked) status = statusInput.value;

  if (!title || !type || !numberOfColours || !price) {
    if (!title) {
      errorContainer.textContent = "Title is required";
      errorContainer.classList.remove("d-none");
      titleInput.addEventListener("keydown", onKeydown);
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

  const obj = {
    title,
    type,
    numberOfColours,
    price,
  };

  const asArray = Object.entries(obj);

  //only accept values that are not null to update
  const filteredArr = asArray.filter((val) => val[1] != "");

  //converts back to object
  const convertedObj = Object.fromEntries(filteredArr);

  //adding status to the object
  convertedObj.status = status;

  // convertedObj.status = status;

  const shoeRef = dataRef(db, `products/${key}`);

  // if it has file to update
  if (file != null) {
    const storageReference = await storageRef(storage, "images/products/");

    const storageHasImageAlready = await listAll(storageReference)
      .then((res) => {
        res.items.forEach((itemRef) => {
          if (file.name === itemRef.name) {
            alert(
              "File with the same name already exists in the storage. Please change the file name."
            );
            return;
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(storageHasImageAlready);

    if (storageHasImageAlready) {
      console.log("has returned");
      return;
    }

    // if it doesn't exist
    // uploading file to the storage bucket
    const uploadResult = await uploadBytes(storageReference, file);
    // url to the image stored in storage bucket
    const urlPath = await getDownloadURL(storageReference);
    // path on the storage bucket to the image
    const storagePath = uploadResult.metadata.fullPath;

    update(shoeRef, {
      ...convertedObj,
      image: urlPath,
      storagePath,
    });
  }

  //if it doesnt have file to update
  else {
    update(shoeRef, {
      ...convertedObj,
    });
  }

  alert("Update success.");
  window.location.href = "https://firebase-crud-youngjaelee.netlify.app";
}

async function pageInit() {
  if (key == null) return;

  const shoeRef = dataRef(db, `products/${key}`);
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
