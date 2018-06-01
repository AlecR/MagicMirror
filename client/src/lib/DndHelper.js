import shallowEqual from 'shallow-equal/objects'

export function shouldPureComponentUpdate(nextProps, nextState) {
  return(
    !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
  )
}