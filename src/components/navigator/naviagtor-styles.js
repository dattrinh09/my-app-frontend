import styled from "styled-components"

export const NavContainer = styled.div`
    background-color: #00a6ff;
    position: sticky;
    top: -1px;
    z-index: 100;
    opacity: 0.7;
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
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
`

export const BrandMenu = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 300px;
    text-align: center;
`

export const PriceMenu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`