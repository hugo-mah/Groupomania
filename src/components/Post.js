import styled from "styled-components";
import colors from "../utils/styles/colors";

const Card = styled.div `
    display: flex;
    flex-direction: column;
    margin: 30px auto;
    padding: 30px;
    border-radius: 30px;
    width: 40%;
    height: auto;
    box-shadow: 0px 5px 30px 0px ${colors.tertiary};
    background-color: ${colors.secondary};
    align-items: center;
`

const Image = styled.img`
    background-color: white;
    width: 90%;
`

const Description = styled.p`
    background-color: ${colors.tertiary};
    width: 90%;
    margin-top: 20px;
    font-size: 18px;
`

function Post({post}) {
    console.log(post)
    return(
        <Card>
            <Image id="image" src="#" />
            <Description></Description>
        </Card>
    )
}

export default Post