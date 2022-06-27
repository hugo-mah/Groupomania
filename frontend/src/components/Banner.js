import styled from 'styled-components';
import colors from '../utils/styles/colors';
import logo from '../assets/logo_blanc.png';
import { Link } from 'react-router-dom';

const Header = styled.header`
    background-color: ${colors.tertiary};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    @media (max-width: 768px){
        flex-direction: column;
        height: 160px;
    }
`

const Logo = styled.img`
    height: 200px;
    padding-left: 30px;
    @media(max-width: 1024px){
        height: 170px;
    }
    @media (max-width: 768px){
        padding-left: 0px;
        position: relative;
        top: -30px;
    }
`

const StyledLink = styled(Link)`
    text-decoration: none;
    padding: 30px;
    font-size: 22px;
    color: ${colors.primary};
    transition: 200ms;
    &:hover{
        cursor: pointer;
        color: ${colors.secondary};
    }
    @media(max-width: 1024px){
        padding: 20px;
        font-size: 20px;
    }
`

const Menu = styled.nav`
    margin-right: 30px;
    @media(max-width : 768px){
        margin-right: 0px;
        position: relative;
        top: -80px;
        display: flex;
        justify-content: space-around;
        width: 100%;
    }
`

function Banner() {
    return(
        <Header>
            <Link to={('/dashboard')}>
                <Logo src={`${logo}`} alt="logo"></Logo>
            </Link> 
            <Menu>
                <StyledLink to='/login'>Se connecter</StyledLink>
                <StyledLink to='/signup'>S'inscrire</StyledLink>
            </Menu>
        </Header>
    )
}

export default Banner