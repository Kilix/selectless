import React from 'react'

export function renderOrCloneComponent(BaseComponent, props, children) {
  if (React.isValidElement(BaseComponent)) {
    return React.cloneElement(BaseComponent, props, children)
  }
  return React.createElement(BaseComponent, props, children)
}
