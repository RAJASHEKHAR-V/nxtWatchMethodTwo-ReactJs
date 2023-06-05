import {Component} from 'react'
import {AiFillFire} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SideBar from '../SideBar'
import TrendingCard from '../TrendingCard'
import MainContext from '../../context/contex'
import {
  MainBody,
  SidebarContainer,
  TrendingContainer,
  TrendingMenuContainer,
  IconContainer,
  MenHeading,
  LoaderContainer,
  FailureContainer,
  FailureImg,
  FailureText,
  RetryButton,
  VideosList,
  TrendingMainContainer,
} from './componentStyle'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.videos.map(eachItem => ({
        id: eachItem.id,
        channel: {
          name: eachItem.channel.name,
          profileImageUrl: eachItem.channel.profile_image_url,
        },
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))
      this.setState({
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  successView = () => {
    const {videosList} = this.state

    return (
      <VideosList>
        {videosList.map(each => (
          <TrendingCard videoDetails={each} key={each.id} />
        ))}
      </VideosList>
    )
  }

  failureView = () => (
    <MainContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const theme = isDarkTheme ? 'dark' : 'light'
        const imgUrl = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <FailureContainer>
            <FailureImg src={imgUrl} alt="failure view" />

            <FailureText theme={theme}>Oops! Something Went Wrong</FailureText>
            <FailureText theme={theme} as="p">
              We are having some trouble to complete your request. Please try
              again
            </FailureText>
            <RetryButton type="button" onClick={this.getVideos}>
              Retry
            </RetryButton>
          </FailureContainer>
        )
      }}
    </MainContext.Consumer>
  )

  loader = () => (
    <MainContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <LoaderContainer className="loader-container" data-testid="loader">
            <Loader
              type="ThreeDots"
              color={isDarkTheme ? '#ffffff' : '#000000'}
              height="50"
              width="50"
            />
          </LoaderContainer>
        )
      }}
    </MainContext.Consumer>
  )

  checkApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.loader()
      default:
        return null
    }
  }

  render() {
    return (
      <MainContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const theme = isDarkTheme ? 'dark' : 'light'

          return (
            <TrendingMainContainer data-testid="trending" theme={theme}>
              <Header />
              <MainBody>
                <SidebarContainer>
                  <SideBar />
                </SidebarContainer>
                <TrendingContainer>
                  <TrendingMenuContainer theme={theme}>
                    <IconContainer theme={theme}>
                      <AiFillFire size={40} color="#ff0b37" />
                    </IconContainer>
                    <MenHeading theme={theme}>Trending</MenHeading>
                  </TrendingMenuContainer>
                  {this.checkApiStatus()}
                </TrendingContainer>
              </MainBody>
            </TrendingMainContainer>
          )
        }}
      </MainContext.Consumer>
    )
  }
}
export default Trending
