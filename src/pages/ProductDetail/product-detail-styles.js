import styled from "styled-components"

export const Container = styled.div`
    width: 1200px;
    margin: 0 auto;
`
export const Content = styled.div`
    padding: 50px 0;
    display: flex;
    flex-direction: column;
    gap: 50px;
`
export const Section = styled.div`
    display: flex;
`

export const PhotoContainer = styled.div`
    flex: 1;
    height: 340px;
    border: 5px solid #00a6ff;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const Photo = styled.img`
    height: 300px;
`

export const Info = styled.div`
    flex: 1;
    padding-left: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
export const Heading = styled.h2`
    padding: 0;
    margin: 0;
`
export const SubHeading = styled.span`
    font-size: 20px;
    font-weight: 600;
`
export const Brand = styled.span`
    font-size: 20px;
    font-weight: 600;
    padding: 5px 0;
    background-color: blue;
    text-align: center;
    width: 120px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
`

export const Price = styled.span`
    font-size: 30px;
    font-weight: 600;
    color: red;
`

export const BuyButton = styled.button`
    border-radius: 5px;
    border: none;
    background-color: red;
    padding: 10px 0;
    cursor: pointer;
`

export const ButtonContent = styled.p`
    padding: 0;
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #fff;
`
export const SubContent = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: #fff;
`

export const SubSection = styled.div`
    display: flex;
    flex-direction: column;
    background: #eee;
    border-radius: 10px;
    padding: 20px;
    gap: 20px;
`
export const Heading1 = styled.h2`
    padding: 0;
    margin: 0;
`
export const Com = styled.div`
    padding: 30px 30px 0 30px;
`

export const Price1 = styled.span`
    text-align: center;
    color: #fff;
    font-weight: 600;
    padding: 4px 0;
    background-color: red;
    border-radius: 5px;
`

export const Pagin = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px;
`