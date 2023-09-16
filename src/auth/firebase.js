// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC-QEERI4J13NqG8OXN7tY_1OE-ecwdx-Y",
    authDomain: "petecode-e9110.firebaseapp.com",
    projectId: "petecode-e9110",
    storageBucket: "petecode-e9110.appspot.com",
    messagingSenderId: "205737284080",
    appId: "1:205737284080:web:86865db3bdb5cd2c940d35",
    measurementId: "G-VDCGTK8H39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
    if (email.slice(email.length - 10) == "purdue.edu") {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        }
        catch (err) {
            console.error(err);
            alert(err.message);
        }
    }
    else {
        alert("use @purdue.edu email")
    }
};
const registerWithEmailAndPassword = async (name, email, password) => {
    if (email.slice(email.length - 10) == "purdue.edu") {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name,
                authProvider: "local",
                email,
            });
        }
        catch (err) {
            console.error(err);
            alert(err.message);
        }
    }
    else {
        alert("use @purdue.edu email")
    }
};
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    }
    catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};