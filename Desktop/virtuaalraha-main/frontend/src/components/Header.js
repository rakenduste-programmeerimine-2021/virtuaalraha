import React from 'react';
import {Link} from 'react-router-dom';

function Header(){

    <div className="Navbar">

        <div className="ToTrending">
        <Link to="./Trending"></Link>
        </div>

        <div className="ToNew">
        <Link to="./New"></Link>
        </div>

        <div className="User">
        <Link to="./User"></Link>
        </div>

        <div className="Log out">
        <Link to="./Logout"></Link>
        </div>

    </div>
    }

export default Header