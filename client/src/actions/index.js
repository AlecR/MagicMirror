export const addPopout = (id, height, width) => ({
  type: 'ADD_POPOUT',
  left: window.innerWidth / 2,
  top: window.innerHeight / 2,
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