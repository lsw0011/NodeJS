const assert = require('assert');
const bodyParser = require('body-parser');
const express = require('express');
const { Db, MongoClient, Server, ObjectID } = require('mongodb');
const app = express();



const appContainer = ( db ) => {

    app.set('view engine', 'ejs')
    app.set('views', 'views')

    app.use(bodyParser.urlencoded({ extended: false }));
    
    app.post('/new', (req, res) => {
        insertDoc(req.body, () => res.redirect('/new'))
    })
    
    app.get('/new', (req, res) => {
        res.render('new')
    })
    
    app.get('/doc/:id', (req, res) => {
        retrieveDoc(req.params.id, (doc)=> res.send(doc))
    })
    
    app.get('/', (req, res) => {
        retrieveDocs((docs) => res.render('home', {docs: docs}))
    })

    const insertDoc = (doc, callback) => {
        db.collection('insults').insertOne(doc, (err) => {
            callback()
        })
    }

    const retrieveDocs = (callback) => {
        db.collection('insults').find({}).toArray((err, docs) => {
            callback(docs)
        })
    }

    const retrieveDoc = (id, callback) => {
        const objectId = new ObjectID(id)
        db.collection('insults').findOne({'_id':objectId}, (err, doc) => {
            callback(doc)
        })
    }

    app.listen(5500, () => {
        console.log('listening on port 6000')
    })
}


const client = new MongoClient('mongodb://localhost:27017')

client.connect((err) => {
    const db = client.db('test');
    appContainer(db)
})
