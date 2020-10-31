import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  console.log('render Header');
  return (
    <Navbar bg="light">
      <Navbar.Brand href="/">Navbar with text</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <Link to="/login">To login</Link>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default React.memo(Header);