var ProblemModel = require('../models/problemModel');
var redisClient = require('../modules/redisClient');

var sessionPath = '/oj_server/';

var getProblems = function() {
    return new Promise((resolve, reject) => {
        ProblemModel.find({}, function(err, problems) {
            if (err) {
                reject(err);
            } else {
                resolve(problems);
            }
        });
    });
}

var getTopProblems = function() {
    return getTopProblemsId()
        .then((topProblemsId) => {
            var ProblemIds = topProblemsId.map((ProblemId) => {
                return new Promise((resolve, reject) => {
                    ProblemModel.findOne({id: ProblemId}, function(err, problem) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(problem);
                        }
                    });
                }); 
            })

            return Promise.all(ProblemIds);
        })
      
}

var getTopProblemsId = function() {
    return redisClient.zrevrange(sessionPath + 'topProblems', 0, 3);
}

var getProblem = function(idNumber) {
    return new Promise((resolve, reject) => {
        // resolve(problems.find(problem => problem.id === id ));
        ProblemModel.findOne({id: idNumber}, function(err, problem) {
            if (err) {
                reject(err);
            } else {
                redisClient.zincrby(sessionPath +'topProblems', 1, idNumber);
                resolve(problem);
            }
        });
    });
}

var addProblem = function(newProblem) {
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({name: newProblem.name}, function(err, data) {
            if (data) {
                reject('Problem already exists');
            } else {
                // save to DB
                ProblemModel.count({}, function(err, num) {
                    newProblem.id = num + 1;
                    var mongoProblem = new ProblemModel(newProblem);
                    mongoProblem.save();
                    resolve(mongoProblem);
                });
            }
        })
    });
}


var deleteProblem = function(idNumber) {
    return new Promise((resolve, reject) => {
        ProblemModel.findOneAndRemove({id: idNumber}, function(err, problem) {
            if (err) {
                reject(err);
            } else {
                resolve(problem);
            }
        });
    });
}

module.exports = {
    getProblems: getProblems,
    getTopProblems: getTopProblems,
    getTopProblemsId: getTopProblemsId,
    getProblem: getProblem,
    addProblem: addProblem,
    deleteProblem: deleteProblem
}