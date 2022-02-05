# Add Content To Storage And RTD


### Add Imports

```javascript

    // write.js
    // import your modules
    import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
    import {ref as databaseRef, push, set, get} from 'firebase/database'
    import { db, storage  } from "./libs/firebase/firebaseConfig";
    
```


### Form Event Listener
```javascript
    
    //write.js

    function onAddRental(e) {
    e.preventDefault();
    uploadNewVacactionRenal();
    }
    document.forms["rentalForm"].addEventListener("submit", onAddRental);
    

```

### Input Element Change Event Listener
```javascript
 
     // input change event listener function

    function onImageSelected(e) {
    //selected file
    let file = e.target.files[0];
    // update the display with the requested image
    document.querySelector(".display img").src = URL.createObjectURL(file);

    }

    document.querySelector("#rentalImage").addEventListener("change", onImageSelected);

```




### Upload A New Vacation Rental 
```javascript
async function uploadNewVacactionRenal() {
    const city = document.querySelector('#cityName').value.trim();
    const file = document.querySelector('#rentalImage').files[0]
   
    const imageRef =     storageRef( storage, `images/${file.name}`);
    const dataRef =  databaseRef( db, 'rentals')
    const uploadResult = await uploadBytes(imageRef, file);
    const path =  await getDownloadURL(imageRef) 
    const imagePath = uploadResult.metadata.fullPath;
    const itemRef = push(dataRef)
    
    set(itemRef,{
      key:itemRef.key,
      image:imagePath,
      path,
      city
    })
    
}
```


### Testing Image Upload
```javascript
async function checkImageUpload(file) {
    const imageRef = storageRef(storage, file.name);
    const confirmation = await uploadBytes(imageRef, file);
    console.log(confirmation);
  }
```
