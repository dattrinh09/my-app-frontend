import styled from "styled-components";

export const Container = styled.div`
    width: 1200px;
    margin: 0 auto;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`

export const Control = styled.div`
    text-align: center;
    margin-bottom: 20px;
`

export const Section = styled.div`
    display: flex;
    width: 100%;
    padding: 20px;
`

export const PhotoContainer = styled.div`
    flex: 1;
    text-align: center;
`
export const Photo = styled.img`
    width: 120px;
`

export const Info = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 20px;
`
export const Title = styled.div`
    font-size: 18px;
    font-weight: 600;
`

export const Price = styled.div`
    flex: 1;
    color: red;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
`

export const Status = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`

export const StatusTag = styled.div`
    text-align: center;
    color: ${props => props.color};
    font-weight: 500;
    border: 1px solid ${props => props.color};
    width: 128px;
    padding: 5px;
    border-radius: 5px;
`