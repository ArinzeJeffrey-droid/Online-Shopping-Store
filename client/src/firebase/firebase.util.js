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
export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey)
    console.log(collectionRef);
    const batch = firestore.batch()
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc()
        batch.set(newDocRef, obj)
    })
    return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data()

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator
    }, {})
}


export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe()
            resolve(userAuth)
        }, reject)
    })
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase