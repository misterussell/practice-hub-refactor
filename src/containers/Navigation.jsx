import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';

import Routes from '../Routes';

import Store from '../Store';

const Navigation = props => (
  <div className="app-container">
    <Navbar fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Practice Hub</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <LinkContainer to="/gameOfLife">
            <NavItem eventKey={1}>
              Game Of Life
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/CSVtoJSON">
            <NavItem eventKey={2}>
              CSV/JSON Converter
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/reportBuilder">
            <NavItem eventKey={3}>
              CSV Report Builder
            </NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Routes />
  </div>
);

export default Navigation;
