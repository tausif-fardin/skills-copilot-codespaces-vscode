// Create web server
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let comments = [
    {
        id: 1,
        comment: "This is a comment"
    },
    {
        id: 2,
        comment: "This is another comment"
    }
];

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));

    if (!comment) {
        res.status(404).send('The comment with the given ID was not found');
    } else {
        res.json(comment);
    }
});

// Add a new comment
app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        comment: req.body.comment
    };

    comments.push(comment);
    res.json(comment);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));

    if (!comment) {
        res.status(404).send('The comment with the given ID was not found');
    } else {
        comment.comment = req.body.comment;
        res.json(comment);
    }
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));

    if (!comment) {
        res.status(404).send('The comment with the given ID was not found');
    } else {
        const index = comments.indexOf(comment);
        comments.splice(index, 1);
        res.json(comment);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});