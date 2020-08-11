import React from 'react'
import {Form,InputGroup,Button,FormControl} from 'react-bootstrap'
import { FaKey,FaEnvelope } from 'react-icons/fa'
import './SignIn.css'
import SignUp from './SignUp';
import NavBar from './NavBar'

export default class SignIn extends React.Component {

    constructor() {
        super();
        this.state = {
            email : "",
            password : "",
            IS_LOGIN_SUCCESS : false,
            JWT : "",
            FIRST_NAME : "",
            IS_SIGN_UP : false
        }
    }

    changeCredentialValues = (event) => {
        let target = event.target;

        if(target.name === "email") {
            this.setState({
                email : target.value
            })
        } else {
            this.setState({
                password : target.value
            })
        }
    }

    verifyCredentials = (event) => {

        event.preventDefault();
    
            let url = 'https://meeting-hall-booking-system.herokuapp.com/signIn'
    
            fetch(url,{
                "method" : "post",
                "headers" :{
                    'Content-Type': 'application/json'
                },
                "body" : JSON.stringify({
                    "email" : this.state.email,
                    "password" : this.state.password
                })
            })
    
            .then((response)=>response.json())
    
            .then((data)=>{
                alert(data.message);
                if(data.status === 'Successful') {
                    this.setState({
                        IS_LOGIN_SUCCESS : true,
                        JWT : data.token,
                        FIRST_NAME : this.state.firstName,
                        IS_SIGN_UP : undefined
                    })
                }
            })
    
            .then(()=>{
                window.localStorage.setItem('authorizationToken',this.state.JWT)
                this.setState({
                    email : "",
                    password : ""
                })
            })
    
            .catch((err)=>console.log(err))
        
    }

    displaySignUpComponent = () => {

        this.setState({
            IS_SIGN_UP : !this.state.IS_SIGN_UP
        })
    }

    displaySignInComponent = () => {

        return(
            <div className="form-css">
                <h4 className="mt-4">Sign In</h4>
                <Form inline>
                <InputGroup className="mt-4 mr-sm-2">
                    <InputGroup.Prepend>
                    <InputGroup.Text> <FaEnvelope /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        name ="email"
                        placeholder="Email"
                        value = {this.state.email}
                        onChange={this.changeCredentialValues}
                    />
                </InputGroup>
                <InputGroup className="mt-4 mr-sm-2">
                    <InputGroup.Prepend>
                    <InputGroup.Text> <FaKey /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl 
                        name ="password"  
                        type="password"  
                        placeholder="Password" 
                        value={this.state.password}
                        onChange={this.changeCredentialValues}
                    />
                </InputGroup>
                {
                    (this.state.email !== "" && this.state.password !== "")?
                    <Button type="submit" className="mt-4" variant="outline-success" onClick={this.verifyCredentials}>
                    Submit
                    </Button>
                    :
                    <Button type="submit" className="mt-4" variant="outline-success" onClick={this.verifyCredentials} disabled>
                    Submit
                    </Button>
                }

                <Button variant="link" onClick={this.displaySignUpComponent} style={{marginTop : "20px"}}>SignUp?</Button>
                
                </Form>
            </div>
        )
    }

    render() {

        if(this.state.IS_SIGN_UP === true)
            return <SignUp />
        
        else if(this.state.IS_SIGN_UP === false)
            return this.displaySignInComponent()
        
        else if(this.state.IS_LOGIN_SUCCESS === true)
            return <NavBar name = {this.state.FIRST_NAME}/>
    }
}
