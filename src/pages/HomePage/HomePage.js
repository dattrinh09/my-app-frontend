import { Button } from 'antd'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ConstanthPaths } from '../../constanth/constanth.path'

const HomePage = () => {
  const naigate = useNavigate()
  
  const handleSignOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    naigate(ConstanthPaths.HOME_PAGE)
  }
 
  return (
    <div style={{ margin: "50px auto", width: "50%", textAlign: "center" }}>
      {!localStorage.getItem("token") ? (
        <h4><NavLink to={ConstanthPaths.SIGN_IN}>Đăng nhập</NavLink></h4>
      ) : (
        <h4>Chào mừng {localStorage.getItem("userName")}<br />
          <Button
            type='primary'
            style={{ margin: "20px 0" }}
            onClick={handleSignOut}
          >
            Đăng xuất
          </Button>
        </h4>
      )}
    </div>
  )
}

export default HomePage