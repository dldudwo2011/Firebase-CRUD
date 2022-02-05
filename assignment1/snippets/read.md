# Importing Data
 

 ### Import Statements
 ```javascript

    import {ref as dataRef, get, set, update} from 'firebase/database';
    import {db} from './libs/firebase/firebaseConfig';

 ```



### Page Init Function
 ```javascript

    async function pageInit(){
        const rentalRef = dataRef(db, 'rentals/');
        const rentalSnapShot = await get(rentalRef)
        const data = rentalSnapShot.val();
        // ES Modules For The Render Function
    }
    
    pageInit()

 ```


# Vacation Rental Basic Markup
 ```html
    <aside>

        <figure>
        <img src="static/images//jimbits-vacations-19.jpg" width="160" alt="rental property">
            <figcaption> <h2>City</h2></figcaption>
        </figure>

        <footer>
            <button>edit</button>
            <button>delete</button>
        </footer>

    </aside>
 ```

 # CSS For Template
 ```css
 
           .vacation-rental{
               margin: 2rem auto;
               max-width: 289px;  
           }
           .vacation-rental img{
             box-shadow: 0 0 2px 0 grey;
             border:5px solid rgb(237, 237, 237);
             width:100%;
           }
           .vacation-rental h2{
             padding: 0.25rem 0;
             font-size:1.125rem;
           }
           .vacation-rental footer{
             display:flex;
             justify-content: center;
             gap:1rem;;
           }
           .vacation-rental button{
             width:100%;
           }
      
 ```

# Using A Table
```html
  <table width="800">
       <thead>
        <tr>
          <th></th>
          <th> sku</th>
          <th> CITY </th>
          <th> price</th>
          <th> <button>edit</button></th>
          <th> <button>delete</button></th>
          </tr>
       </thead>
     <tbody>
        <tr>
        <td>  <img src="static/images/jimbits-vacations-36.jpg" width="72" alt="vaca rental"></td>
        <td> JSV-FGDF8346GF4DS</td>
        <td> the city of your choosing</td>
        <td> $125.36</td>
        <td> <button>edit</button></td>
        <td> <button>delete</button></td>
        </tr>
     </tbody>
     <tfoot>
       
     </tfoot>
   </table> 
```

 

 
 
