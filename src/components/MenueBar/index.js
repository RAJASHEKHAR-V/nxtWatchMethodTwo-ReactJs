import {Link} from 'react-router-dom'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {IoLogoGameControllerB} from 'react-icons/io'
import {RiMenuAddLine} from 'react-icons/ri'

import MainContext from '../../context/contex'

import {MenuList, MenuLink, MenuHeading} from './componentStyle'

const activeMenuConstants = {
  initial: 'INITIAL',
  home: 'HOME',
  trending: 'TRENDING',
  gaming: 'GAMING',
  savedVideos: 'SAVED_VIDEOS',
}

const MenueBar = () => {
  const menuList = value => {
    const {isDarkTheme} = value
    const theme = isDarkTheme ? 'dark' : 'light'

    return (
      <MainContext.Consumer>
        {activeMenuValue => {
          const {activeMenu, changeActiveMenu} = activeMenuValue

          const iconColor = isDarkTheme ? '#424242' : '#7e858e'
          const iconActive = '#ff0b37'

          return (
            <MenuList>
              <Link to="/" className="link">
                <MenuLink
                  theme={theme}
                  isActive={activeMenu === activeMenuConstants.home}
                  onClick={() => changeActiveMenu(activeMenuConstants.home)}
                  key="HOME"
                >
                  <AiFillHome
                    size={25}
                    color={
                      activeMenu === activeMenuConstants.home
                        ? iconActive
                        : iconColor
                    }
                  />

                  <MenuHeading theme={theme}>Home</MenuHeading>
                </MenuLink>
              </Link>
              <Link to="/trending" className="link">
                <MenuLink
                  theme={theme}
                  isActive={activeMenu === activeMenuConstants.trending}
                  onClick={() => changeActiveMenu(activeMenuConstants.trending)}
                  key="TRENDING"
                >
                  <AiFillFire
                    size={25}
                    color={
                      activeMenu === activeMenuConstants.trending
                        ? iconActive
                        : iconColor
                    }
                  />

                  <MenuHeading theme={theme}>Trending</MenuHeading>
                </MenuLink>
              </Link>
              <Link to="/gaming" className="link">
                <MenuLink
                  theme={theme}
                  isActive={activeMenu === activeMenuConstants.gaming}
                  onClick={() => changeActiveMenu(activeMenuConstants.gaming)}
                  key="GAMING"
                >
                  <IoLogoGameControllerB
                    size={25}
                    color={
                      activeMenu === activeMenuConstants.gaming
                        ? iconActive
                        : iconColor
                    }
                  />

                  <MenuHeading theme={theme}>Gaming</MenuHeading>
                </MenuLink>
              </Link>

              <Link to="/saved-videos" className="link">
                <MenuLink
                  theme={theme}
                  isActive={activeMenu === activeMenuConstants.savedVideos}
                  onClick={() =>
                    changeActiveMenu(activeMenuConstants.savedVideos)
                  }
                  key="SAVED_VIDEOS"
                >
                  <RiMenuAddLine
                    size={25}
                    color={
                      activeMenu === activeMenuConstants.savedVideos
                        ? iconActive
                        : iconColor
                    }
                  />

                  <MenuHeading theme={theme}>Saved videos</MenuHeading>
                </MenuLink>
              </Link>
            </MenuList>
          )
        }}
      </MainContext.Consumer>
    )
  }

  return <MainContext.Consumer>{value => menuList(value)}</MainContext.Consumer>
}

export default MenueBar
