import { createContext , useContext, useEffect, useState} from "react";
import { initializeApp } from "firebase/app"
import { getAuth, 
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword,
         GoogleAuthProvider,
         signInWithPopup,
         onAuthStateChanged,
         signOut
} from "firebase/auth";
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
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();


export const FirebaseProvider = (props) =>{
    const [user, setUser] = useState(null);

    // To check if user is already loggedIN or not

    useEffect(()=>{
        onAuthStateChanged(firebaseAuth, (user)=>{
           if(user) {
            setUser(user)
           }
           else{
            setUser(null);
           }
        });
    },[]);
    
    const signupUserWithEmailAndPassword = (email, password) => 
        createUserWithEmailAndPassword(firebaseAuth,email,password);

    const signInWithEmailAndPass = (email, password)=> signInWithEmailAndPassword(firebaseAuth ,email, password); 

    const signInWithGoogle = ()=> signInWithPopup(firebaseAuth, googleProvider)
    
    const isLoggedIn = user ? true : false;

    const logOutUser = () => signOut(firebaseAuth);

    return <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, signInWithEmailAndPass, signInWithGoogle, isLoggedIn, logOutUser }}>
        { props.children }
    </FirebaseContext.Provider>
}