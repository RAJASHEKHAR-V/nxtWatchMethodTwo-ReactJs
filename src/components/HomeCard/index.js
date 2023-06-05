import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

import MainContext from '../../context/contex'

import {
  VideoCardContainer,
  Thumbnail,
  ChannelLogo,
  ThumbnailText,
  VideoTitle,
  VideoTextContainer,
  VideoDetailsContainer,
  VideoDetailsContainer2,
  VideoDetailsText,
} from './componentStyle'

import './index.css'

const HomeCard = props => {
  const {videoDetails} = props
  const {
    thumbnailUrl,
    channel,
    viewCount,
    title,
    id,
    publishedAt,
  } = videoDetails

  let postedAt = formatDistanceToNow(new Date(publishedAt))
  const postedAtList = postedAt.split(' ')

  if (postedAtList.length === 3) {
    postedAtList.shift()
    postedAt = postedAtList.join(' ')
  }

  const {name, profileImageUrl} = channel

  const card = value => {
    const {isDarkTheme} = value
    const theme = isDarkTheme ? 'dark' : 'light'

    return (
      <MainContext.Consumer>
        {val => {
          const {changeActiveMenu} = val
          return (
            <VideoCardContainer as="li">
              <Link
                to={`/videos/${id}`}
                className="link"
                onClick={() => changeActiveMenu('INITIAL')}
              >
                <Thumbnail src={thumbnailUrl} alt="video thumbnail" />
                <ThumbnailText>
                  <div>
                    <ChannelLogo src={profileImageUrl} alt="channel logo" />
                  </div>
                  <VideoTextContainer>
                    <VideoTitle theme={theme}>{title}</VideoTitle>
                    <VideoDetailsContainer>
                      <VideoDetailsText>{name}</VideoDetailsText>
                      <VideoDetailsContainer2>
                        <VideoDetailsText>{viewCount} views</VideoDetailsText>
                        <VideoDetailsText>{postedAt} ago</VideoDetailsText>
                      </VideoDetailsContainer2>
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

export default HomeCard
