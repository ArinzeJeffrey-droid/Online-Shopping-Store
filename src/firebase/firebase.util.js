import firebase from "firebase/app"
import "firebase/firebase-firestore"
import "firebase/auth"


const config = {
    apiKey: "AIzaSyAnitT56JGs_r8tKer3jjGx9mAM0HzKa8A",
    authDomain: "clothing-store-d68a1.firebaseapp.com",
    databaseURL: "https://clothing-store-d68a1.firebaseio.com",
    projectId: "clothing-store-d68a1",
    storageBucket: "clothing-store-d68a1.appspot.com",
    messagingSenderId: "1068665602965",
    appId: "1:1068665602965:web:6b3d99cd8a3d93703aec9c",
    measurementId: "G-6TFC4NJ066"
}

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()
    if (!snapShot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()
        try {
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
    return userRef
}
export const addCollectionAndDocuments = (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey)
    console.log(collectionRef);
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase