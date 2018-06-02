const activePopout = (state = null, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_POPOUT':
      return action.id
    case 'RESET_ACTIVE_POPOUT':
      return null
    default:
      return state
  }
}

export default activePopout;