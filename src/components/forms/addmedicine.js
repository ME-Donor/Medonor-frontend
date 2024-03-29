import React, { Component } from 'react';
import {Container, Row, Col,Button} from 'react-bootstrap';
import { Breadcrumb, BreadcrumbItem, Jumbotron } from "reactstrap";
import {Link} from 'react-router-dom'
import './forms.css'
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import {connect} from 'react-redux';
import admed from '../../images/n.jpg';
import {postMedicine} from '../../redux/actions/medicines';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mapStateToProps = (state) => {
    return {
        name:state.user.name,
        address:state.user.address,
        contact: state.user.contact,
        token:state.user.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        postMedicine: (medicine,name,address,contact,token)=>
            dispatch(postMedicine(medicine,name,address,contact,token)),
    }
}
class addMedicine extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            expirydate: '',
            amount: '',
            errors: {
                name: '',
                expirydate: '',
                amount: '',
            },
        };
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: event.target.value
        });
    }
    notifyS = (message) => toast.success(message);
    notifyF = (message) => toast.warning(message );
    handleSubmit = async(event) => {
        event.preventDefault();
        const isValid = this.formValidation();
        console.log(this.state);
        if(isValid){
            const newMedicine = {
                name: this.state.name,
                expirydate:this.state.expirydate,
                amount:this.state.amount,
                author:this.props.name,
                address:this.props.address,
                contact:this.props.contact,
                
            };
            await this.props.postMedicine(newMedicine);
            this.notifyF('Medicine posted successfully 😃!!')
        }
        
    }

    formValidation = () => {
        const{name,expirydate,amount}=this.state;
        let nameError='', 
        expirydateError='',
        amountError='',
        error;
        if(!name.trim()){
            nameError = "Medicine name is required";
            error=true;
        }
        if(!expirydate.trim()){
            expirydateError = "Expiry Date is required";
            error=true;
        }
        if(!amount.trim()){
            amountError = "Amount is required!";
            error=true;
        }
        this.setState((prevState) => ({
            errors:{
                name:nameError,
                expirydate:expirydateError,
                amount:amountError
            },
        }));
        return !error;
    };

    render(){
        return(
            <div
        style={{
          backgroundImage: `url(${admed})`,
          backgroundSize: 'cover',
          padding: '5% 10% 5% 10%',
          marginTop:'-20px',
         
        }}
      >
           <div className='container'>
        <div fluid className="form-heads-med" style={{marginTop:"-40px"}}>
          <Container>
              <h2 style={{fontSize: '5.7rem'}} >ADD MEDICINES </h2> 
              <p><i>Put up the medicines you would like to donate</i></p>
              
          </Container>
        </div>
           
            <div className="forms__section addmed">
                <Container>
                <Col md={12} className="contact__main__content">
                       
                        <div>
                            <Jumbotron className='form-jumbotron'>
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                    <Form.Label><span className="form_icon"></span>Medicine Name</Form.Label>
                                        <input 
                                        name='name' 
                                        className='form-control'
                                        type='text'
                                        value={this.state.name} 
                                        placeholder="Write the Medicine name." 
                                        onChange={this.handleInputChange} />
                                        <div className="invalid_feedback">
                                        {this.state.errors.name}
                                        </div>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                    <Form.Label><span className="expirydate"></span>Expiry-Date</Form.Label>
                                        <input 
                                        name='expirydate'
                                        className='form-control'
                                        type='text'
                                        value={this.state.expirydate} 
                                        placeholder="Mention expiry-date in the format(DD/MM/YYYY)" 
                                        onChange={this.handleInputChange} />
                                        <div className="invalid_feedback">
                                        {this.state.errors.expirydate}
                                        </div>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                    <Form.Label><span className="amount"></span>Amount</Form.Label>
                                        <input 
                                        name="amount" 
                                        className="form-control" 
                                        type="text" 
                                        value={this.state.amount} 
                                        placeholder="Mention Quantity of medicine." 
                                        onChange={this.handleInputChange} />
                                        <div className="invalid_feedback">
                                        {this.state.errors.amount}
                                        </div>
                                    </Form.Group>
                                    <Button 
                                    onClick={this.handleSubmit} 
                                    className='mt-4'  
                                    variant="primary">
                                    <span className='fa fa-plus mr-3' />
                                    Donate Medicine
                                    </Button>
                            </Form>
                          </Jumbotron>
                        </div>
                
                </Col>
                </Container>
                <ToastContainer 
        color="yellow"          
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
           />
          </div>
          </div>
          </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(addMedicine);