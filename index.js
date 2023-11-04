const express = require('express')
const port = 8000;
const path = require('path')

// const db = require('./config/connect');
//const project = require('./models/project');
const { type } = require('os');
//const { default: project } = require('./models/project');
const app = express()


const Projects = [
    {
      id: 1,
      name: 'Project 1',
      author: 'Author 1',
      description: 'Description 1',
    },
    {
      id: 2,
      name: 'Project 2',
      author: 'Author 2',
      description: 'Description 2',
    },
    {
      id: 3,
      name: 'Project 3',
      author: 'Author 3',
      description: 'Description 3',
    },
    // Add more project objects as needed
  ];


app.set('view engine', 'ejs')
app.set('views',path.join(__dirname, 'views'))
app.use(express.urlencoded())
app.use(express.static('assets'))


app.get('/', function(req, res){
    return res.render('home', {project: Projects})
})

app.get('/add', function(req, res){
    return res.render('create')
})

app.post('/add', function(req, res){
    let id = (Projects.length)+1

    let project = {
      id : id,
      name : req.body.name,
      description: req.body.description.trim(),
      author : req.body.author
    }
    console.log(project)
    Projects.push(project)
    return res.redirect('/')
})

app.post('/addBug/:id', function(req, res){
  let id = 0

  let bug = {
    id : id,
    title : req.body.title,
    description: req.body.description.trim(),
    author : req.body.author,
    label : req.body.label
  }
  console.log(bug)
  //Projects.push(project)
  return res.redirect('/')
})

app.get('/description/:id', function(req, res){
  console.log('delete requested')
  let id = Number(req.params.id)
  console.log(id, typeof(id))
  console.log(Projects.find(obj => obj.id === id))
  return res.render('description', {project: Projects.find(obj => obj.id === id)})
})


app.get('/createBug/:id', function(req, res){
  console.log('create bug triggered')
  let id = Number(req.params.id)
  console.log(id, typeof(id))
  return res.render('bugCreate', {project: Projects.find(obj => obj.id === id)})
})

app.listen(port, function(err){
    if(err){
        console.log('Error in running server: ',err);
    }
    console.log(`Server is running on port localhost:${port}`);
})