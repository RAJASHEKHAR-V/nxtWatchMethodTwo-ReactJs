import React from 'react'

const MainContext = React.createContext({
  isDarkTheme: false,
  changeTheme: () => {},
  activeMenu: 'INITIAL',
  changeActiveMenu: () => {},
  save: false,
  savedVideosList: [],
  addVideosToSavedVideos: () => {},
  deleteVideosFromSavedVideos: () => {},
  updateSave: () => {},
})

export default MainContext
