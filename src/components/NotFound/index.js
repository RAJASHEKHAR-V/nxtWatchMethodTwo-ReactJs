import Header from '../Header'
import SideBar from '../SideBar'
import MainContext from '../../context/contex'

import {
  MainBody,
  SidebarContainer,
  NotFoundImage,
  NotFoundContainer,
  NotFoundText,
} from './componentStyle'

const NotFound = () => (
  <MainContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const theme = isDarkTheme ? 'dark' : 'light'

      const imgUrl = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <div>
          <Header />
          <MainBody>
            <SidebarContainer>
              <SideBar />
            </SidebarContainer>
            <NotFoundContainer theme={theme}>
              <NotFoundImage src={imgUrl} alt="not found" />
              <NotFoundText theme={theme}>Page Not Found</NotFoundText>
              <NotFoundText as="p" theme={theme}>
                we are sorry, the page you requested could not be found.
              </NotFoundText>
            </NotFoundContainer>
          </MainBody>
        </div>
      )
    }}
  </MainContext.Consumer>
)

export default NotFound
