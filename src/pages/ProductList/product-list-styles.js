import styled from "styled-components"

export const Container = styled.div`
    width: 1200px;
    margin: 0 auto;
`
export const Content = styled.div`
    padding: 20px 0;
    display: flex;
`
export const SideBar = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
`
export const SideBarItem = styled.div`
`

export const Section = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 20px;
`
export const Heading = styled.div`
    padding: 0 15px;
    border-radius: 10px;
    background: #eee;
`
export const Sec = styled.div`
    padding-top: 30px;
    border-radius: 10px;
    background: #eee;
`
export const Title = styled.h4`
    text-align: center;
`

export const Price = styled.span`
    text-align: center;
    color: #fff;
    font-weight: 600;
    padding: 4px 0;
    background-color: red;
    border-radius: 5px;
    width: 150px;
    margin: 0 auto;
`

export const Pagin = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px;
`