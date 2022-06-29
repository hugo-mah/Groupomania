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
    @media(max-width: 768px){
        font-size: 18px;
    }
`

const Formulaire = styled.form`
    display: flex;
    width: 40%;
    flex-direction: column; 
    margin: auto;
    margin-top: 20px;
    @media(max-width: 1024px){
        width: 80%;
    }
    @media(max-width: 768px){
        margin-top: 0px;
        width: 90%;
    }
`

const StyledLabel = styled.label`
    font-size: 20px;
    margin: 10px;
    color: ${colors.primary};
    @media(max-width: 768px){
        font-size: 18px;
    }
`

const StyledText = styled.input`
    width: 100%;
    height: 30px;
    font-size: 18px;
    margin: 10px;
    border: 2px solid ${colors.tertiary};
    border-radius: 20px;
    @media(max-width: 768px){
        width: auto;
    }
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
    @media(max-width: 768px){
        font-size: 16px;
        width: 40%;
    }
`


function Connexion() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const navigate = useNavigate();
    let str = window.location.href;
    let url = new URL(str);
    let hasAccount = undefined;
    if(url.pathname === '/login'){
        hasAccount = true
    }
    else{
        hasAccount = false
    }

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

    function SignupClick(e) {
        if(email.match(/^[a-zA-Z\0-9\é\ê\è\-]+[@]+[a-zA-Z\0-9\é\ê\è\-]+[.]+[a-zA-Z]+$/)){
            e.preventDefault();
            fetch("http://localhost:3001/signup", {
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
                        return res.status;
                    }
                })
                .then(function(res){
                    if(res === 400){
                        alert('Utilisateur existant');
                    }
                    else{
                        localStorage.setItem('userId', res.userId);
                        localStorage.setItem('token', res.token);
                        navigate('/dashboard');
                    }
                })
                .catch(function(err){
                    // afficher une erreur dans la console 
                    console.log(err)
            })
        }
        else{
            e.preventDefault();
            alert('Rentrez une adresse mail valide')
        }
    }

    return(
        <main>
            {
                hasAccount === true
                ?<div>
                    <Title>Veuillez vous identifier</Title>
                    <Formulaire method='post'>
                        <StyledLabel for='mail'>E-mail</StyledLabel>
                        <StyledText type='text' id='mail' name='mail' value={email} required onChange={(e) => setEmail(e.target.value)}></StyledText>
                        <StyledLabel for='password'>Mot de passe</StyledLabel>
                        <StyledText type='password' id='password' name='password' value={password} required onChange={(e) => setPassword(e.target.value)}></StyledText>
                        <StyledButton type='submit' value='Connexion' onClick={ConnexionClick}></StyledButton>
                    </Formulaire>
                </div>
                :<div>
                    <Title>Veuillez vous inscrire</Title>
                    <Formulaire method='post'>
                        <StyledLabel for='mail'>E-mail</StyledLabel>
                        <StyledText type='text' className='mail' name='mail' required onChange={(e) => setEmail(e.target.value)}></StyledText>
                        <StyledLabel for='password'>Mot de passe</StyledLabel>
                        <StyledText type='password' name='password' required onChange={(e) => setPassword(e.target.value)}></StyledText>
                        <StyledButton type='submit' value='Connexion' onClick={SignupClick}></StyledButton>
                    </Formulaire>
                </div>
            }
        </main>
    )
}

export default Connexion