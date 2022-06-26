import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../utils/styles/colors";

const Card = styled.div `
    display: flex;
    flex-direction: row; 
    margin: 30px auto;
    padding: 30px;
    border-radius: 30px;
    width: 900px;
    box-shadow: 0px 5px 30px 0px ${colors.tertiary};
    background-color: ${colors.secondary};
    justify-content: space-between;
    align-items: center;
    position: relative;
`
const ZoneImage = styled.div`
    display: flex;
    width: 50%;
    overflow: hidden;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
`

const Description = styled.p`
    background-color: ${colors.tertiary};
    color: white;
    padding: 15px;
    border-radius: 20px;
    text-align: center;
    font-size: 18px;
    width: 40%;
`

const Like = styled.div`
    position: absolute;
    right: 30px;
    bottom: 10px;
    display: flex;
    align-items: center;
`

const LikeButton = styled.button`
    background-color: ${colors.secondary};
    border: 0px solid white;
    font-size: 30px;
    color: ${colors.tertiary};
    &:hover{
        cursor: pointer;
    }
`

const NumberLike = styled.p`
    color: ${colors.tertiary};
    font-size: 20px;
    margin-left: 10px;
    margin-top: 25px;
`

const Delete = styled.button`
    position: absolute;
    right: 360px;
    bottom: 28px;
    background-color: ${colors.tertiary};
    color: ${colors.primary};
    border: 0px solid white;
    border-radius: 20px;
    padding: 10px;
    font-size: 14px;
    &:hover{
        cursor: pointer;
        color: ${colors.secondary};
    }
`

const Modify = styled(Link)`
    position: absolute;
    right: 270px;
    bottom: 28px;
    background-color: ${colors.tertiary};
    color: ${colors.primary};
    border: 0px solid white;
    border-radius: 20px;
    padding: 10px;
    font-size: 14px;
    text-decoration: none;
    &:hover{
        cursor: pointer;
        color: ${colors.secondary};
    }
`


function Post({data}) {
    const navigate = useNavigate();
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');
    let usersLiked = data.usersLiked;
    const presentLike = (element) => element === userId;
    let findLike = usersLiked.some(presentLike);
    let like = undefined;
    if(findLike === true){
        like = 0;
    }
    else if(findLike === false){
        like = 1;
    }

    function CancelLike(){
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

    function AddLike(){
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
            <ZoneImage>
                <Image src={data.imageUrl} alt='#' />
            </ZoneImage>
            <Description>{data.description}</Description>
            <Like>
                {
                    like === 1
                    ? <LikeButton onClick={AddLike}><i class="fa-regular fa-thumbs-up"></i></LikeButton>
                    : <LikeButton onClick={CancelLike}><i class="fa-solid fa-thumbs-up"></i></LikeButton>
                }
                <NumberLike>{data.likes}</NumberLike>
            </Like>
            {
                (data.userId === userId || userId === "62b82230bb173280c8090464") &&
                <div>
                    <Delete onClick={DeletePost}>Supprimer</Delete>
                    <Modify to={(`/modify?id=${data._id}`)} >Modifier</Modify>
                </div>
            }
        </Card>
    )
}

export default Post