import React from 'react'
import {Form,InputGroup,Button,FormControl} from 'react-bootstrap'
import { FaKey,FaEnvelope, FaUser, FaMobile } from 'react-icons/fa'
import './SignIn.css'
import SignIn from './SignIn'
import NavBar from './NavBar'

export default class SignUp extends React.Component {

    constructor() {
        super();
        this.state = {
            email : "",
            password : "",
            firstName : "",
            mobile : "",
            IS_LOGIN_SUCCESS : false,
            JWT : "",
            FIRST_NAME : "",
            IS_SIGN_IN : false
        }
    }

    changeCredentialValues = (event) => {
        let target = event.target;

        if(target.name === "firstName"){
            this.setState({
                firstName : target.value
            })
        }
        else if(target.name === "mobile"){
            this.setState({
                mobile : target.value
            })
        }
        else if(target.name === "email") {
            this.setState({
                email : target.value
            })
        }
        else if(target.name === "password"){
            this.setState({
                password : target.value
            })
        }
    }

    verifyCredentials = (event) => {


            event.preventDefault();
    
            let url = 'https://meeting-hall-booking-system.herokuapp.com/signUp'
    
            fetch(url,{
                "method" : "post",
                "headers" :{
                    'Content-Type': 'application/json'
                },
                "body" : JSON.stringify({
                    "email" : this.state.email,
                    "firstName" : this.state.firstName,
                    "password" : this.state.password,
                    "mobile" : this.state.mobile
                })
            })
    
            .then((response)=>response.json())
    
            .then((data)=>{
                alert(data.message);
                console.log(data);
                if(data.status === 'success') {
                    this.setState({
                        IS_LOGIN_SUCCESS : true,
                        JWT : data.token,
                        FIRST_NAME : this.state.firstName,
                        IS_SIGN_IN : undefined
                    })
                }
            })
    
            .then(()=>{
                window.localStorage.setItem('authorizationToken',this.state.JWT)
                this.setState({
                    firstName : "",
                    mobile :"",
                    email : "",
                    password : ""
                })
            })
    
            .catch((err)=>console.log(err))
    }

    displaySignInComponent = () => {

        this.setState({
            IS_SIGN_IN : !this.state.IS_SIGN_IN
        })
    }

    displaySignUpComponent = () => {

        return (
            <div className="form-css">
                <h4 className="mt-4">Sign Up</h4>
                <Form>
                <InputGroup className="mt-4 mr-sm-2">
                    <InputGroup.Prepend>
                    <InputGroup.Text> <FaUser /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        name ="firstName"
                        placeholder="Enter Name"
                        value = {this.state.firstName}
                        onChange={this.changeCredentialValues}
                    />
                </InputGroup>
                <InputGroup className="mt-4 mr-sm-2">
                    <InputGroup.Prepend>
                    <InputGroup.Text> <FaMobile /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        name ="mobile"
                        placeholder="Enter Mobile Number"
                        value = {this.state.mobile}
                        onChange={this.changeCredentialValues}
                    />
                </InputGroup>
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
                    (this.state.email !== "" && this.state.password !== "" && this.state.firstName !== "" && this.state.mobile !== "")?
                    <Button type="submit" className="mt-4" variant="outline-success" onClick={this.verifyCredentials}>
                    Submit
                    </Button>
                    :
                    <Button type="submit" className="mt-4" variant="outline-success" onClick={this.verifyCredentials} disabled>
                    Submit
                    </Button>
                }

                <Button variant="link" onClick={this.displaySignInComponent} style={{marginTop : "20px"}}>SignIn?</Button>
                </Form>
            </div>
        )
    }

    render() {
        
        if(this.state.IS_SIGN_IN === true)
            return <SignIn />
        
        else if(this.state.IS_SIGN_IN === false)
            return this.displaySignUpComponent()
        
        else if(this.state.IS_LOGIN_SUCCESS === true)
            return <NavBar name = {this.state.FIRST_NAME}/>
    }
}