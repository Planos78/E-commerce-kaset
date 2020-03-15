import React, { Component } from "react";
import { connect } from "react-redux";
import { deliveryExpress } from "../../store/actions/deliveryActions";
import { Redirect } from "react-router-dom";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import {
  Container,
  Col,
  Row,
  Toast,
  ToastBody,
  ToastHeader,
  CustomInput
} from "reactstrap";
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardColumns,
  CardSubtitle,
  CardBody
} from "reactstrap";
import { Media } from "reactstrap";
import { useState } from "react";
import { Button, Fade } from "reactstrap";
import { summarizers } from "istanbul-lib-report";
import UploadFile from "./FileUpload";

class UploadProduct extends Component {
  state = {
    title: "",
    description: "",
    price: "",
    chooseCategory: "",
    pic:''
  };

  handleChange3 = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

    console.dir(this.state);
  };

  handleChange2 = e => {
    this.setState({
      [e.target.name]: e.target.id
    });

    console.dir(this.state);
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });

    console.dir(this.state);
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.deliveryExpress(this.state);
    this.props.history.push("/history");

    console.dir(this.state);
  };

  render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <div className="col-12">
          <Card>
            <CardBody>
              <FormGroup row>
                <Col sm={12}>
                  <form className="white" onSubmit={this.handleSubmit}>
                    {/* SOURCE */}
                    <h2>
                      <dt>Upload your Product</dt>
                    </h2>
                    <FormGroup>
                      <Label for="exampleCustomFileBrowser">File Browser</Label>
                      <CustomInput
                        type="file"
                        id="pic"
                        name="customFile"
                        onChange={this.handleChange}
                        required
                      />
                    </FormGroup>
                    {/* <UploadFile /> */}
                    {/* <UploadFile /> */}
                    <div className="input-field">
                      <input
                        type="text"
                        id="title"
                        onChange={this.handleChange}
                        required
                      />
                      <label htmlFor="name">Title</label>
                    </div>

                    <div className="input-field">
                      <input
                        type="text"
                        id="description"
                        onChange={this.handleChange}
                        required
                      />
                      <label htmlFor="PhoneNumber">Description</label>
                    </div>

                    <div className="input-field">
                      <input
                        type="number"
                        id="price"
                        pattern="[0-9]{20}"
                        onChange={this.handleChange}
                      />
                      <label htmlFor="other">Price(฿)</label>
                    </div>
                    <h2>
                      <dt>Choose your Product Type</dt>
                    </h2>
                    <select
                      class="browser-default"
                      id="chooseCategory"
                      required
                      onChange={this.handleChange}
                    >
                      <option value="" disabled selected>
                        Choose your Product Type
                      </option>
                      <option value="CPU">CPU</option>
                      <option value="Memory">Memory</option>
                    </select>
                    <button
                      className="btn  btn-md btn-block grey darken-2"
                      // onClick={this.TOTAL(this.state.routePickup, this.state.routeDropoff, this.state.Service,
                      //     this.state.ServicePurchase, this.state.ServiceRoundTrip, this.state.ServiceFoodDelivery)}
                    >
                      <dt>Submit</dt>
                    </button>
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
                  <p>
                    Originally known as EasyVan, KMITL-Delivery was launched to
                    satisfy a specific logistical need - van hiring
                    KMITL-Delivery unceasingly matches 150 registered customers
                    with a pool of 20 drivers of Motorcycle, walks.
                  </p>
                </div>
                <div class="card-action white-text">
                  <h3 class="card-title">Facebook</h3>
                  <a href="https://web.facebook.com/plan.osiri">Plan Osiri</a>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deliveryExpress: deliveryProject =>
      dispatch(deliveryExpress(deliveryProject))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadProduct);
