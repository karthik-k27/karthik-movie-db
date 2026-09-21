import {Link} from 'react-router-dom'

import styled from 'styled-components'

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 20vh;
  background-color: white;
  padding: 10px;
`

export const Title = styled.h1`
  color: black;
  font-size: 40px;
  font-weight: bold;
  font-family: 'Roboto';
  margin-left: 10px;
`

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`

export const SearchBar = styled.input`
  border: 1px solid grey;
  height: 40px;
  width: 200px;
  background-color: transparent;
  color: black;
  font-size: 24px;
  font-family: 'Roboto';
  padding: 8px 16px;
  border-radius: 8px;
  outline: none;
`

export const SearchButton = styled.button`
  border: none;
  padding: 10px 20px;
  background-color: blue;
  color: white;
  font-size: 14px;
  font-family: 'Roboto';
  margin-left: 10px;
`

export const Navigation = styled.div`
  display: flex;
  margin-right: 10px;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 14px;
  font-family: 'Roboto';
`

export const Popular = styled.button`
  border: none;
  padding: 10px 20px;
  background-color: transparent;
  color: green;
  font-size: 18px;
  font-family: 'Roboto';
  margin-left: 10px;
  outline: none;
  cursor: pointer;
`

export const TopRated = styled(Popular)``

export const Upcoming = styled(Popular)``
