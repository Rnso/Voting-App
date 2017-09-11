import express from 'express'
import { MongoClient, ObjectID } from 'mongodb'
import assert from 'assert'
import config from '../config'

let mdb;
MongoClient.connect(config.mongodbUri, (err, db) => {
    assert.equal(null, err)

    mdb = db
})
const router = express.Router()

router.get('/getallpolls', (req, res) => {
    mdb.collection("polls").find().toArray((err, polls) => {
        res.send(polls)
    })

})

router.post('/register', (req, res) => {
    mdb.collection('users').findOne({ email: req.body.email }).then(user => {
        if (user == null) {
            mdb.collection("users").insert(req.body).then((result) => {
                res.send(result.ops)
            })
        }
        else {
            res.send('Already Signed up')
        }
    })
})

router.post('/login', (req, res) => {
    mdb.collection('users').findOne({ email: req.body.email, pwd: req.body.pwd }).then(result => {
        res.send(result)
    })
})

router.post('/changepassword', (req, res) => {
    mdb.collection('users').update({ _id: ObjectID(req.body.userId), pwd: req.body.old_pwd }, { $set: { pwd: req.body.new_pwd } }).then(result => {
        res.send(result)
    })
})

router.post('/getpolls/:userId', (req, res) => {
    mdb.collection("users").findOne({ _id: ObjectID(req.params.userId) }, { polls_id: 1 }).then((result) => {
        mdb.collection("polls").find({ _id: { $in: result['polls_id'] } }).toArray((err, polls) => {
            res.send(polls)
        })
    })

})

router.post('/deletePolls', (req, res) => {
    mdb.collection("polls").remove({ _id: ObjectID(req.body.pollsId) }).then(result => {
        mdb.collection("users").update({ _id: ObjectID(req.body.userId) }, { $pull: { polls_id: ObjectID(req.body.pollsId) } }).then(result => {
            mdb.collection("polls").find().toArray((err, polls) => {
                res.send(polls)
            })
        })
    })

})

router.post('/createpolls', (req, res) => {
    mdb.collection("polls").insert({ title: req.body.title, options: req.body.options }).then((result) => {
        mdb.collection("users").update({ _id: ObjectID(req.body.userId) }, { $push: { polls_id: ObjectID(result.ops[0]._id) } }).then(result1 => {
            res.send(result1.ops)
        })
    })

})

router.post('/updatepollvote', (req, res) => {
    mdb.collection("polls").update({ _id: ObjectID(req.body.pollId), "options.option": req.body.vote }, { $inc: { "options.$.votes": 1 } }).then((result) => {
        res.send(result.ops)
    })
})


export default router