
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDWZaiNyrSpIziiwx9s4Tooy5BOxKxNiDc",
    authDomain: "crwn-db-e713f.firebaseapp.com",
    databaseURL: "https://crwn-db-e713f.firebaseio.com",
    projectId: "crwn-db-e713f",
    storageBucket: "crwn-db-e713f.appspot.com",
    messagingSenderId: "417137040506",
    appId: "1:417137040506:web:5ff30fb347b540884befc3",
    measurementId: "G-4P051T26TX"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
        
    }

    return userRef;
}



firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;