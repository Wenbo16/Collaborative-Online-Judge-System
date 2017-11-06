var ProblemModel = require('../models/problemModel');

var getPosts = function(idNumber) {
    return new Promise((resolve, reject) => {
        // resolve(problems.find(problem => problem.id === id ));
        ProblemModel.findOne({id: idNumber}, function(err, problem) {
            if (err) {
                console.log('error')
                reject(err);
            } else {
                resolve(problem.posts);
            }
        });
    });
}


module.exports = {
    getPosts: getPosts
}