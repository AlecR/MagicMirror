export const addPopout = (id, height, width) => ({
  type: 'ADD_POPOUT',
  left: (window.innerWidth / 2) - (width / 2),
  top: (window.innerHeight / 2) - (height / 2),
  id,
  height,
  width,
}) 

export const removePopout = id => ({
  type: 'REMOVE_POPOUT',
  id,
})

export const togglePopout = id => ({
  type: 'TOGGLE_POPOUT',
  id,
})

export const movePopout = (id, top, left) => ({
  type: 'MOVE_POPOUT',
  id,
  top,
  left
})

export const setActivePopout = id => ({
  type: 'SET_ACTIVE_POPOUT',
  id
})

export const resetActivePopout = id => ({
  type: 'RESET_ACTIVE_POPOUT',
  id
})