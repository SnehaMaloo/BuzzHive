import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import Comment from './models/Comment.js';
import VotingRoutes from './VotingRoutes.js'
import CommunityRoutes from './CommunityRoutes.js'
import Community from './models/Community.js';

await mongoose.connect('mongodb://localhost:27017/buzzhive', {useNewUrlParser: true, useUnifiedTopology:true, family:4}).then(()=>{
  console.log("db connected");
});

const secret='secret123';
const app=express()

app.use(cors({
  // origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(VotingRoutes);
app.use(CommunityRoutes);
function getUserFromToken(token){
  const userInfo = jwt.verify(token,secret);
    // if(err){
    //   console.log(err);
    //   res.sendStatus(500);
    // } else{
    return  User.findById(userInfo.id);
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const db=mongoose.connection;
db.on('error', console.log);

app.get('/', (req, res) => {
    res.send('ok');
  });

app.post('/register',  (req, res) => {
  const{email,username}= req.body;
  const password= bcrypt.hashSync(req.body.password,10);
  const user = new User({email, username, password});
  user.save().then(user=>{
    jwt.sign({ id: user._id }, secret, (err, token)=>{
      if(err){
        console.log(err);
        res.sendStatus(500);
      } else{
          //res.sendStatus(201).cookie('token', token).send();
          res.cookie('token', token).status(201).send();

      }
    });
    
  }).catch(e=>{
    console.log(e);
    res.sendStatus(500);
});
  
});

app.get('/user', (req,res)=>{
  const token=req.cookies.token;
  const userInfo = jwt.verify(token,secret);
    // if(err){
    //   console.log(err);
    //   res.sendStatus(500);
    // } else{
      getUserFromToken(token)
        .then(user=>{
        res.json(user.username);
    })
        .catch(err=>{
        console.log(err);
        res.sendStatus(500);
    
    });
     
  });
  
  
  
app.post('/login',(req,res)=>{
  const {username,password}=req.body;
  User.findOne({username}).then(user=>{
    if(user && user.username){
      const passOk=bcrypt.compareSync(password,user.password);
      if(passOk){
        jwt.sign({id:user._id},secret,(err,token)=>{
          res.cookie('token',token).send();
        });
      }
      else
      {
        res.status(422).json('Invalid username or password');
      }
    }
    else
    {
      res.status(422).json('Invalid username or password');
    }

  });
});

  app.post('/logout',  (req, res) => {
    res.cookie('token','').send();
  });

app.get('/comments', (req,res)=>{
 
  const {search,community}=req.query;
  //const search=req.query.search;
  let filters=search?{
    body:{$regex:'.*'+search+'.*'}
  }:{rootId:null};
  if(community){
    filters.community=community;
  }

  Comment.find(filters).sort({postedAt:-1}).then(comments =>{
    res.json(comments);
  });
  
});

app.get('/search', (req,res)=>{
 
  const {phrase}=req.query;
  //const search=req.query.search;
  
  Comment.find({body:{$regex:'.*'+phrase+'.*'}}).sort({postedAt:-1}).then(comments =>{
    Community.find({name:{$regex:'.*'+phrase+'.*'}}).then(communities=>{
      res.json({comments,communities});
    })
  });
  
});

app.get('/comments/root/:rootId',(req,res)=>{
  Comment.find({rootId:req.params.rootId}).sort({postedAt:-1}).then(comments=>{
    res.json(comments);
  })
})

app.get('/comments/:id',(req,res)=>{
  Comment.findById(req.params.id).then(comment=>{
    res.json(comment);
  });
})

app.post('/comments',(req,res)=>{
  const token=req.cookies.token;
  if(!token){
    res.sendStatus(401);
    return ;
  }
  getUserFromToken(token).then(userInfo=>{
    const {title,body,parentId,rootId,community}=req.body;
    const comment=new Comment({
      title,body,author:userInfo.username,postedAt:new Date(),parentId,rootId});
    comment.save().then(savedComment=>{
    res.json(savedComment);
    }).catch(console.log);
  })
    .catch(()=>{
    res.sendStatus(401);

  });
});


const port=5000;
app.listen(port,()=>{
  console.log("yay");
});