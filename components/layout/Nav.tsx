'use client'
interface IProps {

}
import { Navbar, NavbarBrand } from "@nextui-org/react";

const Nav = ({ }: IProps) => {
    return <>
        <Navbar isBordered>
            <NavbarBrand>
                <p className="font-bold">ROUTE TASK</p>
            </NavbarBrand>
        </Navbar>
    </>;
};

export default Nav;