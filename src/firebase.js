

  import   firebase from  'firebase';
  const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyCbHPmUxk9aVsHPOMSyqw6t0ICgz0E-6S8",
    authDomain: "instagram-clone-react-cdde8.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-cdde8.firebaseio.com",
    projectId: "instagram-clone-react-cdde8",
    storageBucket: "instagram-clone-react-cdde8.appspot.com",
    messagingSenderId: "832160555924",
    appId: "1:832160555924:web:364175e03cb615cb696581",
    measurementId: "G-4R5V85QV5F"
  });

const db=firebaseApp.firestore();
const auth=firebase.auth();
const storage=firebase.storage();

  export{db,auth,storage};

     