import React from 'react';

import "./sign-in.styles.scss"
import FormInput from '../form-input/form-input.component';


class SignIn extends React.Component{

    constructor(){
        super()
        this.state = {
            email: "",
            password: ""
        }
    }
    handleSubmit = e => {
        e.preventDefault()
        this.setState({email: "", password: ""})
    }
    handleChange = e => {
        const {value, name} = e.target
        this.setState({[name]: value})
    }
    render (){
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form action="" onSubmit={this.handleSubmit}>
                    <FormInput 
                        type="email" 
                        value={this.state.email} 
                        handleChange={this.handleChange} 
                        required 
                        name="email" 
                        label="email"
                    />
                    <FormInput 
                        type="password" 
                        value={this.state.password} 
                        handleChange={this.handleChange}  
                        required 
                        name="password" 
                        label="password"
                    />
                    <input type="submit" value="Submit Form"/>
                </form>
            </div>
        )
    }
}

export default SignIn