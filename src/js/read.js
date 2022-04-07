import { ref as dataRef, get, set, update } from "firebase/database";
import { db } from "./libs/firebase/firebaseConfig";
import { shoesCard } from "./templates/shoesCard";

const cardContainer = document.querySelector("#shoe-cards");

async function pageInit() {
  const shoeRef = await dataRef(db, "assignment1/");
  const shoeSnapShot = await get(shoeRef);
  const data = shoeSnapShot.val();

  const shoesCards = Object.values(data).map((shoe) => {
    const card = shoesCard(shoe);
    // layout thrashing
    cardContainer.append(card);
    return card;
  });
}

pageInit();
