import React from "react";

const loadingImgStyle = {
  maxWidth: 500, maxHeight: 500, display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '50%'
}
export default function LoadingGif() {

  return (
    <div>
      <img className={loadingImgStyle} src={process.env.PUBLIC_URL + '/images/loading.gif'} alt="loading" />
    </div>
  )
}