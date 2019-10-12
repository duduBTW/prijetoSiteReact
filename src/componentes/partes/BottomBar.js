import React from 'react'
import { NavLink } from 'react-router-dom'

export default function BottomBar() {
    return (
        <div class="navbar hide-on-large-only">
            <ul style={{ display: "flex", justifyContent: "space-around" }} className="itemSideBar">
                <li>
                    <NavLink className="black-text waves-effect waves-circle" to="/inicio/celular">
                        <i className="material-icons">phone_android</i>
                    </NavLink>
                </li>
                <li>
                    <NavLink className="black-text waves-effect waves-circle" to="/inicio/perifericos">
                        <i className="material-icons">mouse</i>
                    </NavLink>
                </li>
                <li>
                    <NavLink className="black-text waves-effect waves-circle" to="/inicio/computadores">
                        <i className="material-icons">computer</i>
                    </NavLink>
                </li>
                <li>
                    <NavLink className="black-text waves-effect waves-circle" to="/inicio/consoles">
                        <i className="material-icons">games</i>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
