const popouts = (state = [], action) => {
  switch (action.type) {
    case 'ADD_POPOUT':
      return [
        ...state,
        {
          id: action.id,
          top: action.top,
          left: action.left,
          height: action.height,
          width: action.width,
          isVisible: false,
        }
      ]
    case 'REMOVE_POPOUT':
      return state.filter(popout => {
        popout.id !== action.id
      })
    case 'TOGGLE_POPOUT':
      return state.map(popout => {
        if(popout.id === action.id) {
          return {
            ...popout, 
            isVisible: !popout.isVisible
          }
        } else {
          return popout
        }
      })
    case 'MOVE_POPOUT':
      return state.map(popout => {
        if(popout.id === action.id) {
          return {
            ...popout,
            top: action.top,
            left: action.left,
          }
        }
      })
    default:
      return state
  }
}

export default popouts;