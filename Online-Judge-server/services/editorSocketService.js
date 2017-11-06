var redisClient = require('../modules/redisClient');
var Promise = require('bluebird')

const TIMEOUT_IN_SECONDS = 3600;


module.exports = function(io) {

    // collaboration sessions
    let collaborations = [];

    let sessionPath = '/oj_server/';
    // var socketIdToSessionId = [];

    io.on('connection', (socket) => {
        var sessionId = socket.handshake.query['sessionId'];

        if (sessionId in collaborations) {

            console.log('push new participant: ' + socket.id);
            collaborations[sessionId]['participants'].push(socket.id);

        } else {

             redisClient.get(sessionPath + sessionId)
                        .then((data) => {
                            if (data) {
                                console.log('session terminated previously, pulling back...');
                                collaborations[sessionId] = {
                                    'cachedInstructions': JSON.parse(data),
                                    'participants': []
                                };
                            } else {
                                console.log('Nobody did this before, creating new session');
                                collaborations[sessionId] = {
                                    'cachedInstructions': [],
                                    'participants': []
                                }
                            }
                            collaborations[sessionId]['participants'].push(socket.id);
                            console.log('Nobody did this before, push new participant: ' + socket.id);
                        }).catch((err) => { 
                            console.error("ERROR", err); 
                        });
        }

        // add change event listener
        socket.on('change', delta => {
            console.log('change ' + sessionId + ' ' + delta);

            // store each change event data
            if (sessionId in collaborations) {
                collaborations[sessionId]['cachedInstructions'].push(
                    ['change', delta, Date.now()]
                );
            }
            forwardEvent(socket.id, 'change', delta);
        });

        socket.on('cursorMove', cursor => {
            console.log('cursorMove ' + sessionId + ' ' + cursor);
            cursor = JSON.parse(cursor);
            cursor['socketId'] = socket.id;
            forwardEvent(socket.id, sessionId, 'cursorMove', JSON.stringify(cursor));
        });


        socket.on('restoreBuffer', () => {
            console.log('restore buffer to session: ' + sessionId );
            let cachedInstructions = collaborations[sessionId]['cachedInstructions'];
            for (let i = 0; i < cachedInstructions.length; i++) {
                socket.emit(cachedInstructions[i][0], cachedInstructions[i][1]);
            }

        });



        socket.on('disconnect', () => {

            console.log('socket ' + socket.id + ' disconnected from session: ' + sessionId);
            // let foundAndRemoved = false;
            
                
            // delete this user in participants
            let participants = collaborations[sessionId]['participants'];
            let index = participants.indexOf(socket.id);
            
            if (index >= 0) {

                participants.splice(index, 1);
                // foundAndRemoved = true;
                console.log('sessionId is still opening');

                if (participants.length === 0) {
                    console.log('last participant left, saving to Redis');

                    let key = sessionPath + sessionId;
                    let value = JSON.stringify(collaborations[sessionId]['cachedInstructions']);
                    // save the last version of your code
                    
                     redisClient.set(key, value)
                                .then(()=>{
                                    redisClient.redisPrint;
                                }).catch((err) => { 
                                    console.error("ERROR", err); 
                                });
                    redisClient.expire(key, TIMEOUT_IN_SECONDS);
                    delete collaborations[sessionId];
                }
            } else {
                console.error('WARNING: NOT A PARTICIPANT!');
            }

            // if (!foundAndRemoved) {
            //     console.log('WARNING: NOT A PARTICIPANT!');
            // }
        });

    })


    var forwardEvent = function(socketId, sessionId, eventName, dataString) {
        let participants = collaborations[sessionId]['participants'];
        console.log(collaborations);
        for (let i = 0; i < participants.length; i++) {
            if ( socketId != participants[i]) {
                io.to(participants[i]).emit(eventName, dataString);
            }
        }
    }
}