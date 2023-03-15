import { createContext , useContext} from "react";
import { initializeApp } from "firebase/app"

const FirebaseContext = createContext(null);


const firebaseConfig = {
    apiKey: "AIzaSyCy_TarR4NrWyu3nfugkc7GoCj2_DTQOuY",
    authDomain: "bookify-react-91a3c.firebaseapp.com",
    projectId: "bookify-react-91a3c",
    storageBucket: "bookify-react-91a3c.appspot.com",
    messagingSenderId: "775189935245",
    appId: "1:775189935245:web:19234066766569ee735ec4",
    measurementId: "G-YKVFD9N9JP"
  };


export const useFirebase =  () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);

export const FirebaseProvider = (props) =>{
    return <FirebaseContext.Provider>
        { props.children }
    </FirebaseContext.Provider>
}