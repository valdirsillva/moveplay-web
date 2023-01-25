import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

export function Navigator() {
    return (
        <Fragment>
            {/* <nav>
                <ul>
                    <li>
                        <Link to="/">Login</Link>
                    </li>
                    <li>
                        <Link to="/home">home</Link>
                    </li>
                </ul>
            </nav> */}

            <Outlet />
        </Fragment>
    )
}