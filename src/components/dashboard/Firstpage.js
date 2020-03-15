import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay, Container, Row, Col } from 'reactstrap';
import {
  CardGroup, CardSubtitle, CardBody, Media, Badge, Breadcrumb, BreadcrumbItem, Toast, ToastBody, ToastHeader, Alert, margin, Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { NavLink, Link } from 'react-router-dom'
import Slide from './Slide';

const add = require('./add.png');
const service = require('./service.png');
const price = require('./price.png');
const Firstpage = (props) => {
  return (

    /*<Jumbotron fluid body inverse style={{ backgroundColor: '#D6EAF8', borderColor: '#D6EAF8' }}>*/
    <div className="container">

      <br />
      <div className="center">
        <p>
          <img class="media-obj" src={add} height="170" width="600" />
          <img class="media-obj" src={service} height="400" width="600" />
        </p>
      </div>
      <div className="center">
        <p>
          <img class="media-obj" src={price} height="300" width="600" />
        </p>
      </div>
      <div className='center'>

        <Button href="/signup" color="info" size="md" block role="button" aria-disabled="true"><dt>Register Now</dt></Button>
      </div>
      <br />
      <div class="row">
        <div class="col s12 m6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <h3 class="card-title">Contract Us</h3>
              <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
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
    /*</Jumbotron>*/


  );
};

export default Firstpage;