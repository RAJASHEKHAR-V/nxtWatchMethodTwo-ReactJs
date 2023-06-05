import {RiMenuAddLine} from 'react-icons/ri'

import Header from '../Header'
import SideBar from '../SideBar'

import {
  MainBody,
  SidebarContainer,
  SavedVideosMainContainer,
  SavedVideosContainer,
  SavedMenuContainer,
  IconContainer,
  MenuHeading,
  VideosList,
  NoVideosContainer,
  NoVideosImg,
  FailureText,
} from './componentStyle'

import TrendingCard from '../TrendingCard'
import MainContext from '../../context/contex'

const SavedVideosCart = () => {
  const savedList = themeValue => {
    const {isDarkTheme} = themeValue

    const theme = isDarkTheme ? 'dark' : 'light'

    return (
      <MainContext.Consumer>
        {value => {
          const {savedVideosList} = value
          if (savedVideosList.length === 0) {
            return (
              <NoVideosContainer>
                <NoVideosImg
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png "
                  alt="no saved videos"
                />

                <FailureText theme={theme} as="h1">
                  No saved videos found
                </FailureText>
                <FailureText theme={theme} as="p">
                  You can save your videos while watching them
                </FailureText>
              </NoVideosContainer>
            )
          }
          return (
            <VideosList>
              {savedVideosList.map(each => (
                <TrendingCard key={each.id} videoDetails={each} />
              ))}
            </VideosList>
          )
        }}
      </MainContext.Consumer>
    )
  }

  return (
    <MainContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        const theme = isDarkTheme ? 'dark' : 'light'
        return (
          <SavedVideosMainContainer data-testid="savedVideos" theme={theme}>
            <Header />
            <MainBody>
              <SidebarContainer>
                <SideBar />
              </SidebarContainer>
              <SavedVideosContainer>
                <SavedMenuContainer theme={theme}>
                  <IconContainer theme={theme}>
                    <RiMenuAddLine size={40} color="#ff0b37" />
                  </IconContainer>
                  <MenuHeading theme={theme}>Saved Videos</MenuHeading>
                </SavedMenuContainer>
                {savedList(value)}
              </SavedVideosContainer>
            </MainBody>
          </SavedVideosMainContainer>
        )
      }}
    </MainContext.Consumer>
  )
}

export default SavedVideosCart
