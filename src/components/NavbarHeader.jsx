import { Container, Navbar, Nav, Form, Button } from "react-bootstrap";
import React from "react";
import { TbEdit, TbHome, TbInfoSquare } from "react-icons/tb";

class NavbarHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        return (
            <>
                <Navbar bg="dark" variant="dark" className="position-sticky top-0 start-0 end-0" style={{zIndex: 99}}>
                    <Container>
                        <Navbar.Brand href="/" className="d-flex align-item-center gap-2">
                            <h3 className="mb-0">
                                🧁
                            </h3>
                            <b>
                                TOKOKU
                            </b>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll" className="d-flex justify-content-end">
                            <Nav className="gap-2" >
                                <Nav.Link href="/"><TbHome className="me-2" /><span className="d-none d-md-inline-block">Home</span></Nav.Link>
                                <Nav.Link href="/create"><TbEdit className="me-2" /><span className="d-none d-md-inline-block">Create</span></Nav.Link>
                                <Nav.Link href="https://www.sabila.studio" target="_blank"><TbInfoSquare className="me-2" /><span className="d-none d-md-inline-block">About</span></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    }
}

export default NavbarHeader;