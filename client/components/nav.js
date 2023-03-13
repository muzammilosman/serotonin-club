import React from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
import Link from "next/link"

const NavApp = ({ categories }) => {
  return (
    <Navbar className="dotted-y-borders" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="text-decoration-none">
            {categories.map((category) => {
              return (
                <Link
                  href={`/category/${category.attributes.slug}`}
                  key={category.id}
                >
                  <a className="nav-link" key={categories.id}>
                    {category.attributes.name}
                  </a>
                </Link>
              )
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavApp
