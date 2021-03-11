import React, { useContext, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import {AuthContext} from '../context/auth'

function MenuBar() {
    const {user, logout} = useContext(AuthContext);
    const [activeItem, setActiveItem] = useState('');

    const handleItemClick = (e, { name }) => setActiveItem(name);

    const menuBar = user ? (
        <div className="menu-bar">
      <Menu pointing secondary compact color={'red'}>
          <Menu.Item
              name={user.username}
              active
              as={Link}
              to="/"
              color={'red'}
          />
      <Menu.Menu position='right'>
          <Menu.Item
              name='logout'
              onClick={logout}
          />
      </Menu.Menu>
      </Menu>            
    </div>


    ) : (
        <div className="menu-bar">
      <Menu pointing secondary compact>
          <Menu.Item
              name='home'
              active={activeItem === 'home'}
              onClick={handleItemClick}
              as={Link}
              to="/"
              color={"red"}
          />


      <Menu.Menu position='left'>
          <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
              as={Link}
              to="/login"
              color={"yellow"}
          />
          <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
              to="/register"
              color={"yellow"}
          />
      </Menu.Menu>
      </Menu>            
        </div>

    )
    return menuBar;

}

export default MenuBar;
