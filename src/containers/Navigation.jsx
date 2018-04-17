import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';

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
          <LinkContainer to="/fooBar">
            <NavItem eventKey={2}>
              Foo Bar
            </NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    {
      props.children
    }
  </div>
);

Navigation.propTypes = {
  children: PropTypes.shape({}).isRequired
};

export default Navigation;
