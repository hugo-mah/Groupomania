import styled from 'styled-components'
import colors from '../utils/styles/colors'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Title = styled.h2`
    color: ${colors.tertiary};
    margin: 0px;
    padding: 30px;
    font-size: 27px;
    text-align: center;
`

const Formulaire = styled.form`
    display: flex;
    width: 40%;
    flex-direction: column; 
    margin: auto;
    margin-top: 20px;
`

const StyledLabel = styled.label`
    font-size: 20px;
    margin: 10px;
    color: ${colors.primary};
`

const StyledText = styled.input`
    width: 100%;
    height: 30px;
    font-size: 18px;
    margin: 10px;
    border: 2px solid ${colors.tertiary};
    border-radius: 20px
`

const StyledButton = styled.input`
    width: 200px;
    height: 40px;
    font-size: 20px;
    margin-top: 20px;
    margin: 20px auto;
    color: ${colors.primary};
    background-color: ${colors.tertiary};
    border-radius: 30px;
    border: 0px solid white;
    box-shadow: 2px 5px 14px -3px ${colors.tertiary};
    transition: 300ms;
    &:hover{
        cursor: pointer;
        box-shadow: 2px 5px 14px 0px ${colors.tertiary};
        color: ${colors.secondary};
    }
`


function Connexion() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const navigate = useNavigate();

    function ConnexionClick(e) {
        e.preventDefault();
        fetch("http://localhost:3001/login", {
            method: "POST",
              headers: { 
              'Accept': 'application/json', 
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify({email, password}),
            })
            .then(function(res){
                if(res.ok){
                console.log("Ok");
                return res.json();
                }
                else{
                    alert('E-mail ou mot de passe invalide');
                }
            })
            .then(function(reponse){
                localStorage.setItem('token', reponse.token);
                localStorage.setItem('userId', reponse.userId);
                navigate('/dashboard');
            })
            .catch(function(err){
                // afficher une erreur dans la console 
                console.log(err)
        })
    }

    return(
        <main>
            <Title>Veuillez vous identifier</Title>
            <Formulaire method='post'>
                <StyledLabel for='mail'>E-mail</StyledLabel>
                <StyledText type='text' id='mail' name='mail' value={email} required onChange={(e) => setEmail(e.target.value)}></StyledText>
                <StyledLabel for='password'>Mot de passe</StyledLabel>
                <StyledText type='password' id='password' name='password' value={password} required onChange={(e) => setPassword(e.target.value)}></StyledText>
                <StyledButton type='submit' value='Connexion' onClick={ConnexionClick}></StyledButton>
            </Formulaire>
        </main>
    )
}

export default Connexion