import React from 'react'
import './index.less'
import classnames from 'classnames'

const Loading = ({ isShow }) => {
  return (
    <div className={classnames('loader','fullScreen', {hidden: !isShow})}>
      <div className="wrapper">
        <div className="inner"></div>
        <div className="text">LOADING</div>
      </div>
    </div>
  )
}

export default Loading