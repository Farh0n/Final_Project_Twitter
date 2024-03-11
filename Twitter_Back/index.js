const express = require('express');
const path = require('path');
const app = express();
const PORT = 3002;
const postgres = require('postgres');
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (_, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });


  // -------- user api's -----
app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
      }
  
      // Query the database for user
      const users = await sql`
        SELECT * FROM users
        WHERE username = ${username} AND password = ${password}
      `;
  
      if (users.length === 0) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Extract user details
      const user = users[0]; // Assuming username is unique
  
      // If user is found, return success message along with user details
      // res.status(200).json({ message: 'Login successful', user });
      res.send(user);
    } catch (error) {
      console.error('Error occurred during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/signup',async(req,res)=>{
    const{username,password,email,firstname} = req.body;
    try{
        const result = await sql`INSERT INTO users (username,password,email,first_name) values (${username},${password},${email},${firstname}) RETURNING *`;
        res.status(201).send(result[0]);
    }catch(error) {
        console.error('Error adding user: ',error);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/user/:id',async(req,res)=>{
  const userId = +req.params.id;
  const{email,firstname} = req.body;
  try{
    const result = await sql`UPDATE users SET email= ${email}, first_name= ${firstname} WHERE id=${userId} RETURNING *`;
    res.status(200).send(result[0]);
  }catch(error){
    console.error("Errot Updating user : " + error);
    res.status(500).send('Internal server error');
  }
});


// --------- Tweet api's ------

app.post('/tweet/new',async(req,res)=>{
  const{userId,username,content,imageUrl}=req.body;
  try{
    const result = await sql`INSERT INTO tweets(user_id,username,content,image_url) values(${userId},${username},${content},${imageUrl}) RETURNING *`;
    res.status(201).send(result[0]);
  }catch(error) {
    console.error('Error adding Tweet: ',error);
        res.status(500).send('Internal Server Error');
  }
});

app.get('/tweets',async(req,res)=>{
  try{
    const tweets = await sql`SELECT * FROM tweets`;
    res.send(tweets);
  }catch(error){
    res.send("Internal server error for getting tweets :" + error);
  }
});

app.get('/tweets/:id',async(req,res)=>{
  try{
    const user_id= req.params.id;
    const tweets = await sql`SELECT * FROM tweets WHERE user_id=${user_id}`;
    res.send(tweets);
  }catch(error){
    res.send('Internal server error, get user tweets');
  }
});





// ------- Comment api's ---------
app.post('/comment/new',async(req,res)=>{
  const{tweetId,username,commentDate,commentContent}=req.body;
  try{
    const result = await sql`INSERT INTO comments(tweet_id,username,comment_date,comment_content) values(${tweetId},${username},${commentDate},${commentContent}) RETURNING *`;
    res.status(201).send(result[0]);
  }catch(error) {
    console.error('Error adding Tweet: ',error);
        res.status(500).send('Internal Server Error');
  }
});

app.get('/comments/:id',async(req,res)=>{
  try{
    const tweet_id = req.params.id;
    const comments = await sql`SELECT * FROM comments WHERE tweet_id=${tweet_id}`;
    res.send(comments);
  }catch(error){
    res.send("Internal server error for getting comments :" + error);
  }
});

app.listen(PORT, () => {
    console.log(`Server is at http://localhost:${PORT}`);
  });