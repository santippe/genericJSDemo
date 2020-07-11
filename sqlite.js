//import express from 'express';
const sqlite3 = require('sqlite3');
//import db from 'sqlite';
//import Promise from 'bluebird';

const express = require('express');
const port = process.env.PORT || 3000;

let app = express();
let db = new sqlite3.Database(':memory:');
db.exec("CREATE TABLE [Post]( ID INTEGER DEFAULT 0)");

console.log('Query started..');
let lastTimeout;
app.get('/posts', async (req, res, next) => {
    clearTimeout(lastTimeout);
    try {                
        //const posts = await db.all('SELECT * FROM Post LIMIT 10');
        let smt=db.prepare("SELECT * FROM POST LIMIT 10 :p1");
        smt.bind()
        res.send(posts);        
        console.log('Query done');
    } catch (err) {
        //next(err);
    }
    lastTimeout = exitFromServer();
});
app.listen(port,()=>{
    lastTimeout = exitFromServer();
});
function exitFromServer(){
    return setTimeout(()=>{
        console.log('process terminated');
        process.exit()
    },30000);
}   