var ProblemModel = require('../models/problemModel');

var getProblems = function() {
    // return new Promise((resolve, reject) => {
    //     resolve(problems);
    // });
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

var getProblem = function(idNumber) {
    return new Promise((resolve, reject) => {
        // resolve(problems.find(problem => problem.id === id ));
        ProblemModel.findOne({id: idNumber}, function(err, problem) {
            if (err) {
                reject(err);
            } else {
                resolve(problem);
            }
        });
    });
}

var addProblem = function(newProblem) {
    return new Promise((resolve, reject) => {
        // if (problems.find(problem => problem.name === newProblem.name)) {
        //     reject('problem already exists~');
        // } else {
        //     newProblem.id = problems.length + 1;
        //     problems.push(newProblem);
        //     resolve(newProblem);
        // }
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
    getProblem: getProblem,
    addProblem: addProblem,
    deleteProblem: deleteProblem
}