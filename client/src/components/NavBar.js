import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";
import {observer} from "mobx-react";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history=useHistory()

    const logOut=()=>{
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
         <Container>
        <Navbar bg="primary" variant="dark">
            <NavLink style={{color: 'white'}} to="/">Home</NavLink>
            {user.isAuth ?
                <Nav className="ml-auto" style={{color: "white"}}>
                    <Button
                        variant={"outline-light"}
                        onClick={()=>history.push("/user")}
                    >
                         Профиль
                    </Button>
                    <Button
                        variant={"outline-light"}
                        onClick={()=>logOut()}
                        className="ml-2"
                    >
                        Выйти
                    </Button>
                </Nav>
                :
                <Nav className="ml-auto" style={{color: 'white'}}>
                    <Button variant={"outline-light"} onClick={()=>history.push("/login")}>Авторизация</Button>
                </Nav>
            }
        </Navbar>
         </Container>
    );
})
;

export default NavBar;