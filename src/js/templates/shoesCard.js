import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  ref,
} from "firebase/storage";
import { ref as dataRef, push, set, get, remove } from "firebase/database";
import { db, storage } from "../libs/firebase/firebaseConfig";

const fs = require("fs");

function shoesCard({
  key,
  numberOfColours,
  title,
  price,
  image,
  status,
  type,
}) {
  let template;

  template = `
        <div class="card mx-3 my-3" style="width: 18rem;">
        <img class="card-img-top" src="${image}" alt="foot-ball">
        <div class="card-body top">
            ${status ? `<p class="card-text text-info">${status}<p>` : ""}
            <h5 class="card-title">${title}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${type}</li>
            <li class="list-group-item">${numberOfColours} Colour</li>
            <li class="list-group-item">$${price}</li>
        </ul>
        <div class="card-body d-flex justify-content-evenly buttons">
            <button class="btn btn-primary" id="edit" data-key="${key}" >edit</button>
            <button class="btn btn btn-danger" id="delete" data-key="${key}" >delete</button>
        </div>
        </div>
  `;

  const element = document.createRange().createContextualFragment(template)
    .children[0];
  addCardControls(element);
  return element;
}

function addCardControls(rental) {
  rental.querySelector("#edit").addEventListener("click", onEditShoe);
  rental.querySelector("#delete").addEventListener("click", onRemoveShoe);
}

function onEditShoe(e) {
  const key = e.target.dataset.key;
  sessionStorage.setItem("key", key);
  window.location.assign("update.html");
}

async function onRemoveShoe(e) {
  const key = e.target.dataset.key;

  if (key == null) return;

  const userResponse = confirm(
    "are you sure you want to delete this product? The change will be permanent."
  );

  if (userResponse) {
    const shoeRef = await dataRef(db, `products/${key}`);
    const shoeSnapShot = await get(shoeRef);
    const data = shoeSnapShot.val();

    if (data.storagePath) {
      const imageRef = storageRef(storage, data.storagePath);
      deleteObject(imageRef);
    } else if (shoeRef.image) {
      try {
        fs.unlinkSync(shoeRef.image);
      } catch (e) {
        console.log(e);
        return;
      }
    }

    remove(shoeRef);
    alert("Delete success.");
    window.location.reload();
  }
}
export { shoesCard };
