import React,{useState,useEffect } from 'react';

import './App.css';
import Post from './Posts/Posts';
import {db } from  './firebase';
import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import { auth } from './firebase';
import  ImageUpload from './imageUpload';
import InstagramEmbed from "react-instagram-embed"


function getModalStyle() {
  const top = 50 ; 
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
  

function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [open,setOpen]=useState(false);
  const [modalStyle]=useState(getModalStyle);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [username,setUsername]=useState('');
  const [user,setUser]=useState(null);
  const[openSign,setOpenSignin]=useState(false);

  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((authUser)=>{
      if(authUser)
      {
       //uset has logged in.
       console.log(user)
       setUser(authUser) 
      
     }
      else
      {
        //user has logged out
        setUser(null);

      }
       
    })
 
    return () =>{
      //perform some clean up  
      unsubscribe();
    }
  },[user,username])

//useEffect >-runs based on spec ific code
useEffect (()=>{
 db.collection('posts').onSnapshot(snapshot =>{
   //every time new post is added this code will fires
   setPosts(snapshot.docs.map(doc =>({
     id:doc.id,
    post:doc.data()})));

 })  
},[]) 

const signUp=(event)=>{
  event.preventDefault();
  auth
  .createUserWithEmailAndPassword(email,password)
  .then((authUser)=>{
   return authUser.user.updateProfile({
     displayName:username
    })
  })
  .catch((error) => alert(error.message));

}
const signIn=(event)=>{
  event.preventDefault();
  auth
  .signInWithEmailAndPassword(email,password)
  .catch((error)=>alert(error.message))
  setOpenSignin(false);

}






  return (
    <div className="App">

      
      

     

 <Modal
  open={open}
  onClose={()=>setOpen(false)}
>
<div style={modalStyle} className={classes.paper}>
      <form className="App__signup">
      <center>
       <img className="app_headerImage" 
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""
        /> 
        </center>
        <Input
        placeholder="username"
        type="text"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        
        />
        <Input
        placeholder="email"
        type="text"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        
        /> 
        <Input
         placeholder="password"
         type="password"
         value={password}
         onChange={(e)=>setPassword(e.target.value)}

        />
        <Button onClick={signUp}>Sign Up</Button>
          
       
      </form>
       
    </div> 
</Modal>
      {/*for sign */}
      <Modal
  open={openSign}
  onClose={()=>setOpenSignin(false)}
>
<div style={modalStyle} className={classes.paper}>
      <form className="App__signup">
      <center>
       <img className="app_headerImage" 
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""
        /> 
        </center>
        
        <Input
        placeholder="email"
        type="text"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        
        /> 
        <Input
         placeholder="password"
         type="password"
         value={password}
         onChange={(e)=>setPassword(e.target.value)}

        />
        <Button onClick={signIn}>Sign In</Button>
          
       
      </form>
       
    </div> 
</Modal>

   

      
      {/*header*/}   
      <div className="app_header">
        <img className="app_headerImage" 
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""
        /> 
        { user ? 
        (<Button onClick={() =>auth.signOut()}>Logout </Button>):
        <div className="app__logincontainer">
        <Button onClick={() =>(setOpenSignin(true))}>Sign In</Button>
        <Button onClick={() =>(setOpen(true))}>Sign Up</Button>
        </div>
        
      }
       
  
      </div>
      <div className="App__posts">

        <div className="App__postleft">
        {
        posts.map(({id,post}) => {
       return   <Post key={id}  user={user}  postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            
        })
      }
    

        </div>

        <div className="App__postright">

        <InstagramEmbed
    url='https://www.instagram.com/p/CFgvBv9ADm_/'
    maxWidth={320}
    hideCaption={false}
    containerTagName='div'
    protocol=''
    injectScript
    onLoading={() => {}}
    onSuccess={() => {}} 
    onAfterRender={() => {}}
    onFailure={() => {}}
/>




        </div>
      
     
      </div>
      
    
    
      {
        user?.displayName ? (
          <ImageUpload  username={user.displayName}/>

        ):
        <h3>sorry you need to login</h3>
      }  
         
      {/* <Post username="Ganesh "  caption="wow its 3rd session" imageUrl="https://cdn-media-1.freecodecamp.org/images/1*y6C4nSvy2Woe0m7bWEn4BA.png"  />
      <Post username="chaitu "  caption="felling awsome" imageUrl="https://www.thesprucepets.com/thmb/kV_cfc9P4QWe-klxZ8y--awxvY4=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/adorable-white-pomeranian-puppy-spitz-921029690-5c8be25d46e0fb000172effe.jpg"/>
      <Post username="Preetam "  caption="having fun with girl friend"/>
      */} 
      {/*post*/}
      {/*post*/}
      
    </div>
  );
}

export default App;
