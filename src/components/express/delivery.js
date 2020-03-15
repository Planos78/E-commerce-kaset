import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deliveryExpress } from '../../store/actions/deliveryActions'
import { Redirect } from 'react-router-dom'
import { Form, FormGroup, Label, Input, FormText, } from 'reactstrap';
import { Container, Col, Row, Toast, ToastBody, ToastHeader, CustomInput } from 'reactstrap';
import { Card, CardImg, CardTitle, CardText, CardColumns, CardSubtitle, CardBody } from 'reactstrap';
import { Media } from 'reactstrap';
import { useState } from 'react';
import { Button, Fade } from 'reactstrap';
import { summarizers } from 'istanbul-lib-report';



class delivery extends Component {
    state = {
        name: '',
        PhoneNumber: '',
        other: '',
        destinationName: '',
        destinationPhoneNumber: '',
        destinationOther: '',

        routePickup: '',
        routeDropoff: '',
        costService: '',
        Service: '',


        ServicePurchase: '',
        ServiceRoundTrip: '',
        ServiceFoodDelivery: ''
    }

    constructor(props) {
        super(props);
        this.state = {
            is_checked_ServicePurchase: false,
            is_checked_ServiceRoundTrip: false,
            is_checked_ServiceFoodDelivery: false
        };
        this.updateCheckbox1 = this.updateCheckbox_ServicePurchase.bind(this)
        this.updateCheckbox2 = this.updateCheckbox_ServiceRoundTrip.bind(this)
        this.updateCheckbox3 = this.updateCheckbox_ServiceFoodDelivery.bind(this)
    }

    updateCheckbox_ServicePurchase(event) {
        this.setState({ is_checked_ServicePurchase: !this.state.is_checked_ServicePurchase });
        //console.log(this.state.is_checked_ServicePurchase);
    }

    updateCheckbox_ServiceRoundTrip(event) {
        this.setState({ is_checked_ServiceRoundTrip: !this.state.is_checked_ServiceRoundTrip });
        //console.log(this.state.is_checked_ServiceRoundTrip);
    }

    updateCheckbox_ServiceFoodDelivery(event) {
        this.setState({ is_checked_ServiceFoodDelivery: !this.state.is_checked_ServiceFoodDelivery });
        //console.log(this.state.is_checked_ServiceFoodDelivery);
    }

    handleChange3 = e => {
        this.setState({
            [e.target.name]: e.target.value
        })

        console.dir(this.state)
    }


    handleChange2 = e => {
        this.setState({
            [e.target.name]: e.target.id
        })

        console.dir(this.state)
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })


        console.dir(this.state)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.deliveryExpress(this.state);
        this.props.history.push('/history');

        console.dir(this.state)
    }


    /* function */
    TOTAL = (pickup, dropoff, Service, ServicePurchase, ServiceRoundTrip, ServiceFoodDelivery, state) => {
        var distance = [
            [0, 5, 5, 5, 5, 7],
            [5, 0, 6, 5, 7, 7],
            [5, 6, 0, 6, 7, 9],
            [5, 4, 6, 0, 7, 9],
            [5, 7, 7, 7, 0, 5],
            [7, 7, 9, 9, 5, 0]
        ];
        var checkpoint = ['คณะวิศวกรรมศาสตร์', 'คณะสถาปัตยกรรมศาสตร์', 'คณะวิทยาศาสตร์',
            'สำนักงานหอสมุดกลาง', 'หอพักนักศึกษาสถาบัน', 'ศูนย์กีฬาพระจอมเกล้า']

        var s = checkpoint[0];
        var d = checkpoint[0];
        var P2P = 0;
        var AdditionalServices = 0;
        /*serching source & destination*/
        for (let i = 0; i < checkpoint.length; i++) {
            if (pickup == s) {
                for (let j = 0; j < checkpoint.length; j++) {
                    if (dropoff == d) {
                        console.log("P2P[" + i + "][" + j + "][" + s + "][" + d + "] = " + distance[i][j]);
                        var P2P = distance[i][j];
                        break;
                    }
                    else {
                        d = checkpoint[j + 1];
                    }
                }
                break;
            }
            else {
                s = checkpoint[i + 1];
            }
        }
        /*Service types*/
        if (Service == 'walkService') {
            Service = 30;
        }
        else if (Service == 'motorcycleService') {
            Service = 50;
        }
        else {
            Service = 0;
        }

        /*Additional Services*/
        if (ServicePurchase == 'true') {
            if (ServicePurchase == 'true' && ServiceRoundTrip == 'true') {
                AdditionalServices = 50;
            } else {
                AdditionalServices = 20;
            }
        }
        else if (ServiceRoundTrip == 'true') {
            AdditionalServices = 30;
        }
        else {
            AdditionalServices = 0
        }

        /*result*/
        var result = 0;
        result = Service + AdditionalServices + P2P
        /* Test */

        /*check state */
        console.log('Point to Point = ' + P2P + ' bath.');
        console.log('Service = ' + Service + ' bath.');
        console.log('AdditionalServices = ' + AdditionalServices + ' bath.');
        console.log('Total = ' + result + ' bath.')

        return result;
    }





    render() {
        const { auth } = this.props;

        const sum = this.TOTAL(this.state.routePickup, this.state.routeDropoff, this.state.Service,
            this.state.ServicePurchase, this.state.ServiceRoundTrip, this.state.ServiceFoodDelivery);





        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                <div className="col-12">
                    <Card >

                        <CardBody >
                            <FormGroup row>
                                <Col sm={12}>
                                    <form className="white" onSubmit={this.handleSubmit}>

                                        <div class="jumbotron">
                                            <h1><dt>Welcome to KMITL Delivery Service</dt></h1>
                                            <h6>บริการ KMITL Delivery เป็นบริการรับ-ส่งของระหว่างจุดบริการสองจุด ภายในสถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
                                                ซึ่งผู้รับกับผู้ส่งจะต้องอยู่ในจุดบริการนั้นๆ  ตามข้อมูลที่ได้ให้ไว้ โดยรูปแบบการให้บริการจะแบ่งเป็น 2 ประเภท
                                                คือ บริการด้วยการเดินกับการบริการด้วยรถจักรยานยนต์
                                                และมีบริการเสริม 3 รูปแบบ  เพื่อความหลากหลายในการให้บริการ
                                                ภายในสถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง </h6>
                                        </div>

                                        <div class="alert alert-success" >
                                            กรุณาเลือกช่องทางการส่งสินค้า พร้อมระบุบริการเสริมที่ต้องการให้ครบ
                                        </div>

                                        {/* <input type="checkbox" onChange={this.updateCheckbox} checked={this.state.is_checked} ></input>
                                            <button onClick={this.pressButton}>change checkbox state using button</button> */}

                                        {/* TOGGLE TEST 
                                                <label>
                                                    <input type="checkbox" name="ServicePurchase" id="additionalServicePurchase"
                                                    onChange={this.updateCheckbox} checked={this.state.is_checked} />  
                                                    <span >Select Purchase Service</span>
                                                </label>
                                             */}



                                        {/* Services */}
                                        <div class="row center" required>
                                            <div class="col-sm-6">
                                                <h5 class="card-title"><dt>WALK</dt></h5>
                                                <p class="card-text">ค่าบริการเริ่มต้น 30 บาท</p>
                                                <i class="large material-icons">directions_walk</i>
                                                <br />
                                                <p>
                                                    <label>
                                                        <input class="with-gap" type="radio" name='Service'
                                                            onClick={this.handleChange2} id="walkService" required />
                                                        <span>Select Walk</span>
                                                    </label>
                                                </p>
                                                {/* <CustomInput type="switch" name='Service' onClick={this.handleChange2} id="walkService" label="Select Walk" /> */}
                                            </div>
                                            <div class="col-sm-6">
                                                <h5 class="card-title"><dt>MOTORCYCLE</dt></h5>
                                                <p class="text">ค่าบริการเริ่มต้น 50 บาท</p>
                                                <i class="large material-icons">directions_bike</i>
                                                <br />
                                                <p>
                                                    <label>
                                                        <input class="with-gap" type="radio" name='Service'
                                                            onClick={this.handleChange2} id="motorcycleService" required />
                                                        <span>Select Motorcycle</span>
                                                    </label>
                                                </p>

                                            </div>
                                        </div>
                                        <hr className="my-2" /> <br />



                                        {/* AdditionalServices */}
                                        <div class="row center">
                                            <div class="col-sm-4">
                                                <h6 class="card-title"><dt>Purchase Service</dt></h6>
                                                <p class="text">ค่าบริการเริ่มต้น 25 บาท</p>
                                                <i class="large material-icons">add_shopping_cart</i>
                                                <br />
                                                <label>
                                                    <input type="checkbox" onClick={this.handleChange3} value={!this.state.is_checked_ServicePurchase}
                                                        onChange={this.updateCheckbox1} checked={this.state.is_checked_ServicePurchase}
                                                        name="ServicePurchase" id="additionalServicePurchase" />

                                                    <span>Select Purchase Service</span>
                                                </label>
                                            </div>


                                            <div class="col-sm-4" >
                                                <h6 class="card-title"><dt>Round Trip</dt></h6>
                                                <p class="text">ค่าบริการเริ่มต้น 30 บาท</p>
                                                <i class="large material-icons">loop</i>
                                                <br />
                                                <label>
                                                    <input type="checkbox" onClick={this.handleChange3} value={!this.state.is_checked_ServiceRoundTrip}
                                                        onChange={this.updateCheckbox2} checked={this.state.is_checked_ServiceRoundTrip}
                                                        name="ServiceRoundTrip" id="additionalServiceRoundTrip" />
                                                    {/* value={this.state.isChecked} onChange={this.handleChange}  */}
                                                    <span>Select Round Trip</span>
                                                </label>
                                            </div>


                                            <div class="col-sm-4" >
                                                <h6 class="card-title"><dt>Food Delivery</dt></h6>
                                                <p class="text">ค่าบริการเริ่มต้น 0 บาท</p>
                                                <i class="large material-icons">local_dining</i>
                                                <br />
                                                <label>
                                                    <input type="checkbox" onClick={this.handleChange3} value={!this.state.is_checked_ServiceFoodDelivery}
                                                        onChange={this.updateCheckbox3} checked={this.state.is_checked_ServiceFoodDelivery}
                                                        name="ServiceFoodDelivery" id="additionalServiceFoodDelivery" />

                                                    <span>Select Food Delivery</span>
                                                </label>
                                            </div>

                                        </div>
                                        <hr className="my-2" /> <br />


                                        {/* SOURCE */}
                                        <h2><dt>Pick up Location</dt></h2>
                                        <select class="browser-default" id="routePickup" required
                                            onChange={this.handleChange} >
                                            <option value="" disabled selected>Choose your location</option>
                                            <option value="คณะวิศวกรรมศาสตร์">คณะวิศวกรรมศาสตร์</option>
                                            <option value="คณะสถาปัตยกรรมศาสตร์">คณะสถาปัตยกรรมศาสตร์</option>
                                            <option value="คณะวิทยาศาสตร์">คณะวิทยาศาสตร์</option>
                                            <option value="สำนักงานหอสมุดกลาง">สำนักงานหอสมุดกลาง</option>
                                            <option value="หอพักนักศึกษาสถาบันฯ">หอพักนักศึกษาสถาบันฯ</option>
                                            <option value="ศูนย์กีฬาพระจอมเกล้า">ศูนย์กีฬาพระจอมเกล้า</option>
                                        </select>
                                        <div className="input-field">
                                            <input
                                                type="text"
                                                id='name'
                                                pattern="[A-Za-zก-ฮ]{1,}"
                                                title="ระบุชื่อ ในช่วง ก-ฮ , A-Z , a-z"
                                                onChange={this.handleChange} required
                                            />
                                            <label htmlFor="name">Name</label>
                                        </div>

                                        <div className="input-field">
                                            <input
                                                type="tel"
                                                id='PhoneNumber'
                                                pattern = "[0-9]{10}"
                                                title="ระบุหมายเลขโทรศัพท์ 10 หลัก"
                                                onChange={this.handleChange} required />
                                            <label htmlFor="PhoneNumber">Phone Number</label>
                                        </div>

                                        <div className="input-field">
                                            <input
                                                type="text"
                                                id='other'

                                                onChange={this.handleChange} />
                                            <label htmlFor="other">Other</label>
                                        </div>

                                        <br />
                                        <br />




                                        {/* DESTINATION */}
                                        <h2><dt>Drop off Location</dt></h2>
                                        <select class="browser-default" id="routeDropoff" required onChange={this.handleChange}>
                                            <option value="" disabled selected>Choose your location</option>
                                            <option value="คณะวิศวกรรมศาสตร์">คณะวิศวกรรมศาสตร์</option>
                                            <option value="คณะสถาปัตยกรรมศาสตร์">คณะสถาปัตยกรรมศาสตร์</option>
                                            <option value="คณะวิทยาศาสตร์">คณะวิทยาศาสตร์</option>
                                            <option value="สำนักงานหอสมุดกลาง">สำนักงานหอสมุดกลาง</option>
                                            <option value="หอพักนักศึกษาสถาบันฯ">หอพักนักศึกษาสถาบันฯ</option>
                                            <option value="ศูนย์กีฬาพระจอมเกล้า">ศูนย์กีฬาพระจอมเกล้า</option>
                                        </select>
                                        {/* <Label for="rout">Delivery Info</Label> */}
                                        <div className="input-field">
                                            <input
                                                type="text"
                                                pattern="[A-Za-zก-ฮ]{1,}"
                                                id='destinationName'
                                                title="ระบุชื่อ ในช่วง ก-ฮ , A-Z , a-z"
                                                onChange={this.handleChange} required />
                                            <label htmlFor="destinationName">Name</label>
                                        </div>

                                        <div className="input-field">
                                            <input
                                                type="tel"
                                                pattern="[0-9]{10}"
                                                id='destinationPhoneNumber'
                                                title="ระบุหมายเลขโทรศัพท์ 10 หลัก"
                                                onChange={this.handleChange} required />
                                            <label htmlFor="destiantionPhoneNumber">Phone Number</label>
                                        </div>

                                        <div className="input-field">
                                            <input
                                                type="text"
                                                id='destinationOther'

                                                onChange={this.handleChange} />
                                            <label htmlFor="destinationOther">Other</label>
                                        </div >
                                        <br />



                                        <div class="alert alert-danger ">
                                            <strong>Warning!</strong> โปรดตรวจสอบความถูกต้องของรายละเอียดต่างๆ และค่าบริการทั้งหมด ก่อนทำการยืนยัน
                                        </div>

                                        <div class="row center" required>
                                            <div class="col-sm-6">
                                                <h5 class="card-title"><dt>Cash on Delivery</dt></h5>
                                                <i class="large material-icons">attach_money</i>
                                                <br />
                                                <p>
                                                    <label>
                                                        <input class="with-gap" type="radio" name='ServicePaymant'
                                                            onClick={this.handleChange2} id="Cash_on_Delivery" required />
                                                        <span>Select Cash on Delivery</span>
                                                    </label>
                                                </p>
                                            </div>
                                            <div class="col-sm-6">
                                                <h5 class="card-title"><dt>K-Wallet</dt></h5>
                                                <i class="large material-icons">credit_card</i>
                                                <br />
                                                <p>
                                                    <label>
                                                        <input class="with-gap" type="radio" name='ServicePaymant'
                                                            onClick={this.handleChange2} id="K_Wallet" required />
                                                        <span>Select K-Wallet</span>
                                                    </label>
                                                </p>
                                            </div>
                                        </div>

                                        <hr className="my-2" /> <br />
                                        <h2><dt><p class='right' id='costService' onChange={this.handleChange}
                                            value={this.TOTAL(this.state.routePickup, this.state.routeDropoff, this.state.Service,
                                                this.state.ServicePurchase, this.state.ServiceRoundTrip, this.state.ServiceFoodDelivery)}>
                                            ค่าบริการรวมทั้งหมด {sum} บาท</p></dt></h2>
                                        <br />
                                        <br />
                                        <button className="btn  btn-md btn-block grey darken-2"
                                        // onClick={this.TOTAL(this.state.routePickup, this.state.routeDropoff, this.state.Service,
                                        //     this.state.ServicePurchase, this.state.ServiceRoundTrip, this.state.ServiceFoodDelivery)}
                                        ><dt>Submit</dt></button>

                                    </form>
                                </Col>
                            </FormGroup>
                        </CardBody>
                    </Card>
                    <div class="row">
                        <div class="col s12 m6">
                            <div class="card blue-grey darken-1">
                                <div class="card-content white-text">
                                    <h3 class="card-title">Contract Us</h3>
                                    <p>Originally known as EasyVan, KMITL-Delivery was launched to satisfy a specific logistical need - van hiring KMITL-Delivery unceasingly matches 150 registered customers with a pool of 20 drivers of Motorcycle, walks.</p>
                                </div>
                                <div class="card-action white-text">
                                    <h3 class="card-title">Facebook</h3>
                                    <a href="https://web.facebook.com/plan.osiri">Plan Osiri</a><br />
                                    <a href="https://web.facebook.com/oenggii">Siriwan Phatsangwan</a><br />
                                    <a href="https://web.facebook.com/piyapat.ruekkarun">Piyapat Ruekkaran</a><br />
                                    <a href="https://www.facebook.com/profile.php?id=100001513440413">Thanchanok Tri-apibanwongsa</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        )
    }
}



const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deliveryExpress: (deliveryProject) => dispatch(deliveryExpress(deliveryProject))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(delivery)