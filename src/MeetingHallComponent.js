import React from 'react';
import './MeetingHallComponent.css'
import { Container,Card,Button,Modal,Form,InputGroup,FormControl } from 'react-bootstrap';

export default class MeetingHallComponent extends React.Component {
    
    constructor() {
        super();
        this.state = {
                show : false,
                show1 : false,
                Agenda : "",
                AttendeesCount : "",
                addedInformation : "",
                meetingRoomInfo : [
                    {"Time" : "12 AM - 1 AM","IS_AVAILABLE" :  "AVAILABLE"},{"Time" : "1 AM - 2 AM","IS_AVAILABLE" : "AVAILABLE"},{"Time" : "2 AM - 3 AM","IS_AVAILABLE" : "AVAILABLE"},{"Time" : "3 AM - 4 AM","IS_AVAILABLE" : "AVAILABLE"},{"Time" : "4 AM - 5 AM","IS_AVAILABLE" : "AVAILABLE"},
                    {"Time" : "5 AM - 6 AM","IS_AVAILABLE" : "AVAILABLE"},{"Time" : "6 AM - 7 AM","IS_AVAILABLE" : "AVAILABLE"},{"Time" : "7 AM - 8 AM","IS_AVAILABLE" : "AVAILABLE"},{"Time" : "8 AM - 9 AM","IS_AVAILABLE" : "AVAILABLE"},{"Time" : "9 AM - 10 AM","IS_AVAILABLE" : "AVAILABLE"},{"Time" : "10 AM - 11 AM","IS_AVAILABLE" : "AVAILABLE"},
                    {"Time" : "11 AM - 12 AM","IS_AVAILABLE" : "AVAILABLE"},{"Time" : "12 PM - 1 PM","IS_AVAILABLE" : "AVAILABLE"},{"Time" : "1 PM - 2 PM","IS_AVAILABLE" : "AVAILABLE"},{"Time" : "2 PM - 3 PM","IS_AVAILABLE" : "AVAILABLE"},{"Time" : "3 PM - 4 PM","IS_AVAILABLE" : "AVAILABLE"},{"Time" : "4 PM - 5 PM","IS_AVAILABLE" : "AVAILABLE"},
                    {"Time" : "5 PM - 6 PM","IS_AVAILABLE" : "AVAILABLE"},{"Time" : "6 PM - 7 PM","IS_AVAILABLE" : "AVAILABLE"},{"Time" : "7 PM - 8 PM","IS_AVAILABLE" : "AVAILABLE"},{"Time" : "8 PM - 9 PM","IS_AVAILABLE" : "AVAILABLE"},{"Time" : "9 PM - 10 PM","IS_AVAILABLE" : "AVAILABLE"},{"Time" : "10 PM - 11 PM","IS_AVAILABLE" : "AVAILABLE"},
                    {"Time" : "11 PM - 12PM","IS_AVAILABLE" : "AVAILABLE"}
                ],
                confirmedMeetings : [],
                id : 0
        }
    }

    handleShow = (object_id) => {
        
        this.setState({
            show : true,
            id : object_id
        })
    }

    handleShow1 = (object_id) => {
        
        this.setState({
            show1 : true
        })
    }

    handleClose = () => {

        this.setState({
            show : false,
            show1 : false,
            Agenda : "",
            AttendeesCount : "",
            addedInformation : ""
        })
    }

    changeValues = (event) => {
        let target = event.target;

        if(target.name === "Agenda"){
            this.setState({
                Agenda : target.value
            })
        }
        else if(target.name === "AttendeesCount"){
            this.setState({
                AttendeesCount : target.value
            })
        }
        else if(target.name === "addedInformation") {
            this.setState({
                addedInformation : target.value
            })
        }
    }

    confirmMeeting = () => {

        let meetingDetails = {
            id : this.state.id,
            Agenda : this.state.Agenda,
            AttendeesCount : this.state.AttendeesCount,
            addedInformation : this.state.addedInformation
        }

        this.setState({
            confirmedMeetings : [...this.state.confirmedMeetings , meetingDetails]
        })

        this.setState({
            Agenda : "",
            AttendeesCount : "",
            addedInformation : ""
        })

        alert("Meeting Confirmed!!!")
        this.handleClose();

        let temp = this.state.meetingRoomInfo;

        let selectedMeetingObject  = this.state.meetingRoomInfo[this.state.id];
        selectedMeetingObject.IS_AVAILABLE = "Not Available";

        temp.splice(this.state.id,1,selectedMeetingObject);
    }

    displayMeetingHall = () => {

        return(

            <Container>
                <div className='flex-css'>
                {
                this.state.meetingRoomInfo.map((val,id) =>
                
                    <Card
                    bg={(val.IS_AVAILABLE === 'AVAILABLE')?"success":"danger"}
                    text= 'black'
                    style={{ width: '18rem' }}
                    className="mt-2 ml-5 mb-5"
                    key={id}
                    >
                        <Card.Header><b>Meeting Room</b></Card.Header>
                        <Card.Body>
                        <Card.Title>{val.IS_AVAILABLE}</Card.Title>
                        <Card.Text>
                            <b>Time:{val.Time}</b>
                        </Card.Text>
                        {
                            (val.IS_AVAILABLE === 'AVAILABLE')?
                            <Button variant="warning" onClick={()=>this.handleShow(id)}><b>Add Details && Confirm</b></Button>
                            :<Button variant="warning" onClick={this.handleShow1}><b>View Meeting Details</b></Button>
                        }
                        </Card.Body>
                    </Card>
                )
                }
                </div>
                <>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title><b>Meeting Details</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <InputGroup className="mt-4 mr-sm-2">
                                <InputGroup.Prepend>
                                {/* <InputGroup.Text> <FaUser /></InputGroup.Text> */}
                                </InputGroup.Prepend>
                                <FormControl
                                    name ="Agenda"
                                    placeholder="Meeting Agenda"
                                    value = {this.state.Agenda}
                                    onChange={this.changeValues}
                                    type="text"
                                />
                            </InputGroup>
                            <InputGroup className="mt-4 mr-sm-2">
                                <InputGroup.Prepend>
                                {/* <InputGroup.Text> <FaUser /></InputGroup.Text> */}
                                </InputGroup.Prepend>
                                <FormControl
                                    name ="AttendeesCount"
                                    placeholder="Number of Attendees"
                                    value = {this.state.AttendeesCount}
                                    onChange={this.changeValues}
                                    type="number"
                                />
                            </InputGroup>
                            <InputGroup className="mt-4 mr-sm-2">
                                <InputGroup.Prepend>
                                {/* <InputGroup.Text> <FaUser /></InputGroup.Text> */}
                                </InputGroup.Prepend>
                                <FormControl
                                    name ="addedInformation"
                                    placeholder="Any Information to Attendees?"
                                    value = {this.state.addedInformation}
                                    onChange={this.changeValues}
                                    type="text"
                                />
                            </InputGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    {
                        (this.state.Agenda !== "" && this.state.AttendeesCount !== "" && this.state.addedInformation !== "")?
                            <Button variant="warning" onClick={this.confirmMeeting}>Confirm</Button>
                            :<Button variant="warning" onClick={this.confirmMeeting} disabled>Confirm</Button>
                    }
                    </Modal.Footer>
                </Modal>
                </>
                <>
                    <Modal show={this.state.show1} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title><b>Meeting Details</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                        {
                            this.state.confirmedMeetings.filter((obj,id)=>obj.id===this.state.id).map((obj)=>
                                <>
                                <Card.Text>
                                    Meeting Agenda
                                </Card.Text>
                                <Card.Text>
                                    {obj.Agenda}
                                </Card.Text>
                                <Card.Text>
                                    Attendees Count
                                </Card.Text>
                                <Card.Text>
                                    {obj.AttendeesCount}
                                </Card.Text>
                                <Card.Text>
                                    Information
                                </Card.Text>
                                <Card.Text>
                                    {obj.addedInformation}
                                </Card.Text>
                                </>
                            )
                        }
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                </>
            </Container>
        )
    }

    render() {
        return this.displayMeetingHall()
    }
}