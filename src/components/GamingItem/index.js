import {Link} from 'react-router-dom'

import MainContext from '../../context/contex'

import {
  VideoCardContainer,
  Thumbnail,
  ThumbnailText,
  VideoTitle,
  VideoTextContainer,
  VideoDetailsContainer,
  VideoDetailsText,
} from './componentStyle'

const GamingItem = props => {
  const {videoDetails} = props
  const {thumbnailUrl, viewCount, title, id} = videoDetails

  const card = value => {
    const {isDarkTheme} = value
    const theme = isDarkTheme ? 'dark' : 'light'
    return (
      <MainContext.Consumer>
        {val => {
          const {changeActiveMenu} = val

          return (
            <VideoCardContainer>
              <Link
                to={`/videos/${id}`}
                className="link"
                onClick={() => changeActiveMenu('INITIAL')}
              >
                <Thumbnail src={thumbnailUrl} alt="video thumbnail" />
                <ThumbnailText>
                  <VideoTextContainer>
                    <VideoTitle theme={theme}>{title}</VideoTitle>
                    <VideoDetailsContainer>
                      <VideoDetailsText>
                        {viewCount} Watching Worldwide
                      </VideoDetailsText>
                    </VideoDetailsContainer>
                  </VideoTextContainer>
                </ThumbnailText>
              </Link>
            </VideoCardContainer>
          )
        }}
      </MainContext.Consumer>
    )
  }

  return <MainContext.Consumer>{value => card(value)}</MainContext.Consumer>
}

export default GamingItem
