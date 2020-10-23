import { takeLatest, put, all, call } from "redux-saga/effects"
import { UserActionTypes } from "./user.types"
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from "../../firebase/firebase.util"
import { signInFailure, signInSuccess } from "./user.actions"


export function* getSnapShotFromUserAuth(userAuth) {
    try {
        const useref = yield call(createUserProfileDocument, userAuth)
        const userSnapShot = yield useref.get()
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data }))
    } catch (error) {
        yield put(signInFailure(error))
    }
}


export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider)
        yield getSnapShotFromUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapShotFromUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser()
        if (!userAuth) return
        yield(getSnapShotFromUserAuth(userAuth))
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}


export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}


export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(isUserAuthenticated)
    ])
}