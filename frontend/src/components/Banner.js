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
    heigth: 100px;
`
const Logo = styled.img`
    height: 200px;
    padding-left: 30px;
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
`

const Menu = styled.nav`
    margin-right: 30px;
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