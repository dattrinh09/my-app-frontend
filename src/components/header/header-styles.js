import { Toolbar } from "@mui/material"
import styled from "styled-components"

export const HeaderLayout = styled.div`
    // background-color: #00a6ff;
`

export const Container = styled.div`
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items:  center;
    height: 54px;
`

export const Item = styled.div`
    &:nth-child(2) {
        width: 60%;
    }
`
export const Menu = styled.div`
    display: flex;
    gap: 30px;
`

export const UserMenu = styled.div`
    font-size: 20px;
    color: #333;
    font-weight: 700;
    cursor: pointer; 
`