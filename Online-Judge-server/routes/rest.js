var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var problemService = require('../services/problemService');
var postService = require('../services/postService');
// get /api/v1/problems
// get /api/v1/problems/2
// post /api/v1/problems

router.get('/problems', function (req, res) {
    problemService.getProblems()
        .then(problems => res.json(problems));
});

router.get('/top-problems', function (req, res) {
    problemService.getTopProblems()
        .then(topProblems => {
            console.log("topProblems:" + topProblems);
            res.json(topProblems)
        });
});

router.get('/problems/:id', function(req, res) {
    let id = req.params.id;
    // '+' transforms id from string to number
    problemService.getProblem(+id)
        .then(problem => res.json(problem));
});

router.post('/problems', jsonParser, function(req, res) {
    problemService.addProblem(req.body)
        .then(problem => {
            res.json(problem);
        },
        error => {
            res.status(400).send('Problem name already exists');
        });
});

router.delete('/problems/delete/:id', function(req, res) {
    let id = req.params.id;
    // '+' transforms id from string to number
    problemService.deleteProblem(+id)
        .then(problem => res.json(problem));
});



router.get('/problems/discuss/:id', function(req, res) {
    let id = req.params.id;
    postService.getPosts(+id)
        .then(posts => {
            res.json(posts)
        });
});


module.exports = router;