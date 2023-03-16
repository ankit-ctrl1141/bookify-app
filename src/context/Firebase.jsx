import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app"
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


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


export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const googleProvider = new GoogleAuthProvider();



export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);

    // To check if user is already loggedIN or not

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setUser(user)
            }
            else {
                setUser(null);
            }
        });
    }, []);

    // console.log(user);

    const signupUserWithEmailAndPassword = (email, password) =>
        createUserWithEmailAndPassword(firebaseAuth, email, password);

    const signInWithEmailAndPass = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password);

    const signInWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

    const handleCreateNewListing = async (name, isbn, price, cover) => {
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
        const uploadResult = await uploadBytes(imageRef, cover); // path where image is uploaded
        // image has been uploaded, now to keep this in FireStore.

        return await addDoc(collection(firestore, "books"), {
            // on console.log(user), we can see all these.
            name,
            isbn,
            price,
            imageURL: uploadResult.ref.fullPath,
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        })


    };

    // retriving data

    const listAllBooks = () => {
        return getDocs(collection(firestore, "books"));
    };



    const getBookById = async (id) => {
        const docRef = doc(firestore, "books", id);
        const result = await getDoc(docRef);
        return result;
    }


    // to retrive image

    const getImageURL = (path) => {
        return getDownloadURL(ref(storage, path));
    }

    // placed orders detail in collection
    const placeOrder = async (bookId, qty) =>{
        const collectionRef = collection(firestore, "books", bookId, "orders");
        const result = await addDoc(collectionRef, {
            userID : user.uid,
            userEmail : user.email,
            displayName : user.displayName,
            photoURL : user.photoURL,
            qty : Number(qty)
        });
        return result;
    };

    const isLoggedIn = user ? true : false;

    const logOutUser = () => signOut(firebaseAuth);

    return <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, signInWithEmailAndPass, signInWithGoogle, handleCreateNewListing, isLoggedIn, logOutUser, listAllBooks, getImageURL, getBookById, placeOrder }}>
        {props.children}
    </FirebaseContext.Provider>
}