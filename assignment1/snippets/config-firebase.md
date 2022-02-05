# Seting Up A Firebase Project For The Web

## Step 1: Initialize Project Root Folder Using NPM
Open the VSCode terminal and on the command line run the following command.
```npm
   npm init
```
To quickly create the package.json file run the command.
```npm
   npm init y
```
 
## 2. Installing Project Dependancies
- to installing firebase SDK run the command ``` npm install firebase ```
- to install parcel bundler run the command ``` npm install parcel ```

<br> 

### Node_Modules Directory Best Practices
- add the node_modules directory to your.gitignore file.
- never upload your node_modules directory to git.
- when sharing a project remove the node_modules directory first.
- to rebuild your node_modules directory from the package.json file run the command ``` npm install ```.


<br> 

## 3. Run Your Project Using Parcel
You must use the parcel bundler to view your project. The browser will not understand come of the code your using. In order to for browser to run your code and the code your using from the node modules directory you need a budler tool like Parcel.  
Parcel will bundle your node_modules code and the src code into JavaScript files to code the browser understands.
- Start the module bundler Parcel run the command.
```bash
    npx parcel src/index.html
```

### Stop The Parcel Dev Server
- when ever you want to stop the server open the VSCode terminal.
- Use the quick key combination ```CTRL+C```
- This command can be used anytime a process is runing and you want to escape back to the terminal prompt.
 
 <br> 



## 4. Using Firebase In A Web Project
- Create a firebaseConfig.js in ```js/libs/firebase/firebaseConfig.js ```. 
- Copy the Firebase configuration from the project settings located in the firebase console.
- Make sure to copy the npm configuration
- Add the ```getDatabase``` method from ```firebase/database``` package.
- Initialize the real time database RTD service.
- export the database connection from the firebaseConfig.js file
 
 

```javascript

// file: src/js/libs/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-AUTH-DOMAIN",
  databaseURL: "YOUR-DATABASE-URL",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-STORAGE-BUCKET",
  messagingSenderId: "YOUR-MESSAGING-SENDER-ID",
  appId: "YOUR-APP-ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initialize the reat time database
const db = getDatabase(app)
// export the db connection.
export {db}

```
<br> 

## 5. Adding firebaseConfig.js to your .gitignore
- Do not upload the firebase config file.
- The config file is only for development. You will handle the deployment differently.
- File path is: ```js/libs/firebase/firebaseConfig.js ```. 
- Open your .gitignore file and add
```.gitignore
    # firebase config file
    /src/js/libs/firebase/firebaseConfig.js
```

## 6. Commit Your Project To GitHub