import { Spin } from 'antd'
import React from 'react'
import styled from 'styled-components'

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 100px;
`

const Loader = () => {
  return (
    <LoaderContainer>
        <Spin size="large" />
    </LoaderContainer>
  )
}

export default Loader