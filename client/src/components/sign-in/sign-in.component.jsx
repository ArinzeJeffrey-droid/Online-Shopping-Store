import React, { useState } from 'react';
import { connect } from "react-redux"
import "./sign-in.styles.scss"
import FormInput from '../form-input/form-input.component';
import CustomButton from "../button/custom-button.component"
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';


const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [userCredentials, setCredentials ] = useState({ email: '', password: ''})
    const { email, password} = userCredentials
    const handleSubmit = async e => {
        e.preventDefault()
        emailSignInStart(email, password)
    }
    const handleChange = e => {
        const {value, name} = e.target
        setCredentials({...userCredentials, [name]: value })
    }
    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form action="" onSubmit={handleSubmit}>
                <FormInput 
                    type="email" 
                    value={email} 
                    handleChange={handleChange}  
                    name="email" 
                    label="email"
                />
                <FormInput 
                    type="password" 
                    value={password} 
                    handleChange={handleChange}    
                    name="password" 
                    label="password"
                />
                <div className="buttons">
                    <CustomButton type="submit">Sign in</CustomButton>
                    <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Sign in with Google</CustomButton>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null,mapDispatchToProps)(SignIn)