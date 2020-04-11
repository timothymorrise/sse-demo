// seeRouter.js
// ==============================

// imports
const express = require('express');
const seeRouter = express.Router();
let { nests, clients} = require('../data')

// middleware functions
    // get
const eventsHandler = (req,res,next) => {
    console.log("events fires")
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-Cache'
    };
    res.writeHead(200, headers);
    
    console.log("nests:", nests)
    const data = `data: ${JSON.stringify(nests)}\n\n`; // package data and send back
    res.write(data);

    const clientId = Date.now(); // generate client id;
    const newClient = { 
        id: clientId, 
        res
    };
    clients.push(newClient); // push to the clients array
    console.log("pushed to clients", clients)
    req.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(c => c.id !== clientId);
    });
}

const sendEventsToAll = newNest => { // iterate clients and write res to send out
    clients.forEach(c => c.res.write(`data: ${JSON.stringify(newNest)}\n\n`))
}

    // post
async function addNest(req, res, next) {
    console.log("add firing")
    const newNest = req.body;
    console.log("new nest", newNest)
    nests.push(newNest);
    
    res.json(newNest) // send as a POST
    return sendEventsToAll(newNest);// invoke iterate to and send
}

// apply middleware/endpoints
seeRouter.post('/nests', addNest);
seeRouter.get('/events', eventsHandler);
seeRouter.get('/status', (req,res) => res.json({clients: clients.length}))

// exports
module.exports = seeRouter