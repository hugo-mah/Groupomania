import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../utils/styles/colors";
import { useState } from "react";

const Card = styled.div `
    display: flex;
    flex-direction: row; 
    margin: 30px auto;
    padding: 20px;
    border-radius: 30px;
    width: 900px;
    box-shadow: 0px 5px 30px 0px ${colors.tertiary};
    background-color: ${colors.secondary};
    justify-content: space-between;
    align-items: center;
    position: relative;
    min-height: 250px;
    @media(max-width: 1024px){
        width: 80%;
    }
    @media(max-width : 768px){
        flex-direction: column;
        width: 80%;
        padding: 15px;
    }
`
const ZoneImage = styled.div`
    display: flex;
    width: 50%;
    overflow: hidden;
    border-radius: 15px 0px 0px 15px;
    margin-right: 10px;
    @media(max-width : 768px){
        width: 100%;
        border-radius: 15px 15px 0px 0px;
        margin-right: 0px;
    }
`

const Image = styled.img`
    width: 100%;
    height: 100%;
`

const Description = styled.p`
    background-color: ${colors.tertiary};
    color: white;
    padding: 15px;
    border-radius: 15px;
    text-align: center;
    font-size: 18px;
    width: 50%;
    @media(max-width: 1024px){
        font-size: 16px;
        padding: 10px;
    }
    @media(max-width : 768px){
        width: 100%;
        border-radius: 0px 0px 15px 15px;
        padding: 10px 0px;
        margin-top: 8px;
        margin-bottom: 0px;
    }
`

const Like = styled.div`
    position: absolute;
    right: 30px;
    bottom: 10px;
    display: flex;
    align-items: center;
    @media(max-width : 768px){
        position: initial;
    }
`

const LikeButton = styled.button`
    background-color: ${colors.secondary};
    border: 0px solid white;
    font-size: 30px;
    color: ${colors.tertiary};
    &:hover{
        cursor: pointer;
    }
    @media(max-width: 1024px){
        font-size: 26px;
    }
`

const NumberLike = styled.p`
    color: ${colors.tertiary};
    font-size: 20px;
    margin-left: 10px;
    margin-top: 25px;
    @media(max-width: 1024px){
        font-size: 16px;
    }
`

const Delete = styled.button`
    display: flex;
    align-items: center;
    position: absolute;
    right: 360px;
    bottom: 28px;
    background-color: ${colors.tertiary};
    color: ${colors.primary};
    border: 0px solid white;
    border-radius: 20px;
    height: 35px;
    font-size: 14px;
    padding: 0px 10px 0px 10px;
    &:hover{
        cursor: pointer;
        color: ${colors.secondary};
    }
    @media(max-width: 1024px){
        font-size: 12px;
        height: 30px;
        right: 250px;
    }
    @media(max-width : 768px){
        bottom: 20px;
        left: 15px;
    }
`

const Modify = styled(Link)`
    display: flex;
    align-items: center;
    position: absolute;
    right: 270px;
    bottom: 28px;
    background-color: ${colors.tertiary};
    color: ${colors.primary};
    border: 0px solid white;
    border-radius: 20px;
    font-size: 14px;
    max-height: 35px;
    padding: 12px 10px 8px 10px;
    text-decoration: none;
    &:hover{
        cursor: pointer;
        color: ${colors.secondary};
    }
    @media(max-width: 1024px){
        font-size: 12px;
        right: 170px;
        height: 30px;
        padding: 0px 10px;
    }
    @media(max-width : 768px){
        bottom: 20px;
        right: 15px;
    }
`



function Post({data}) {
    let [likes , setLikes] = useState(data.likes)
    const navigate = useNavigate();
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');
    let usersLiked = data.usersLiked;
    const presentLike = (element) => element === userId;
    let findLike = usersLiked.some(presentLike);
    let [isLiked, setIsLiked] = useState(findLike)
    let like = undefined
    let [description, setDescription] = useState(data.description)


    function CancelLike(){
        like = 0
        fetch("http://localhost:3001/like", {
            method: "POST",
              headers: { 
              'Accept': 'application/json', 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({like, data, userId}),
            })
            .then(function(res){
                if(res.ok){
                    return res.json();
                }
            })
            .then(function(res){
                setLikes(likes -= 1)
                setIsLiked(false)
            })
            .catch(function(err){
                console.log(err)
        })
    }

    function AddLike(){
        like = 1
        fetch("http://localhost:3001/like", {
            method: "POST",
              headers: { 
              'Accept': 'application/json', 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({like, userId, data}),
            })
            .then(function(res){
                if(res.ok){
                    return res.json();
                }
            })
            .then(function(res){
                setLikes(likes += 1)
                setIsLiked(true)
            })
            .catch(function(err){
                console.log(err)
        })
    }

    function DeletePost(){
        fetch("http://localhost:3001/delete", {
            method: "POST",
              headers: { 
              'Accept': 'application/json', 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({userId, data}),
            })
            .then(function(res){
                if(res.ok){
                    console.log("Ok");
                    return res.json();
                }
            })
            .then(function(res){
                navigate('/');
            })
            .catch(function(err){
                console.log(err)
        })
    }


    return(
        <Card>
            {
                (data.imageUrl != null) &&
                <ZoneImage>
                    <Image src={data.imageUrl} alt='' />
                </ZoneImage>
            }
            {
                (description !== "") &&
                <Description>{description}</Description>
            }
            <Like>
                {
                    isLiked === false
                    ? <LikeButton onClick={AddLike}><i class="fa-regular fa-thumbs-up"></i></LikeButton>
                    : <LikeButton onClick={CancelLike}><i class="fa-solid fa-thumbs-up"></i></LikeButton>
                }
                <NumberLike>{likes}</NumberLike>
            </Like>
            {
                (data.userId === userId || userId === process.env.REACT_APP_ADMIN_USERID) &&
                <div>
                    <Delete onClick={DeletePost}>Supprimer</Delete>
                    <Modify to={(`/modify?id=${data._id}`)}>Modifier</Modify>
                </div>
            }
        </Card>
    )
}

export default Post