const Projects = require("../models/project");
const Bugs = require("../models/bug");

module.exports.dashboard = async function (req, res) {
  try {
    const ProjectList = await Projects.find({});
    return res.render("home", { project: ProjectList });
  } catch (error) {
    console.error("Error Fetching project:", error);
  }
};

module.exports.delete = async function () {
  try {
    await Projects.deleteMany({});
    await Bugs.deleteMany({})
    return res.render("home", { project: ProjectList });
  } catch (error) {
    console.error("Error Fetching project:", error);
  }
};

module.exports.addPage = function (req, res) {
  return res.render("create");
};

module.exports.add = async function (req, res) {
  try {
    const len = await Projects.countDocuments({});
    const createdProject = Projects.create({
      id: len + 1,
      name: req.body.name,
      description: req.body.description.trim(),
      author: req.body.author,
    });

    console.log("New project Add Sucessfully", createdProject);
    return res.redirect("/");
  } catch (error) {
    console.error("Error creating project:", error);
  }
};

module.exports.description = async function (req, res) {
  let id = Number(req.params.id);
  let projectSpecificBug = await findSpecificBug(id);


  const project = await findSpecificProject(id)

  console.log('the id serched is', id, project)
  

  return res.render("description", {
    project: project,
    bugs: projectSpecificBug,
  });
};

module.exports.addBug = function (req, res) {
  let id = Bugs.length + 1;
  let bug = {
    id: id,
    title: req.body.title,
    description: req.body.description.trim(),
    author: req.body.author,
    label: req.body.label,
    project_id: Number(req.params.id),
  };

  Bugs.countDocuments({}).then((data) => {
    Bugs.create({
      id: data + 1,
      title: req.body.title,
      description: req.body.description.trim(),
      author: req.body.author,
      label: req.body.label,
      project_id: Number(req.params.id),
    })
      .then(function (newBug) {
        console.log("New Bug Add Sucessfully", newBug);
        return res.redirect("/");
      })
      .catch((err) => {
        console.log("unable to add :", err);
      });
  });
};

module.exports.addBugPage = async function (req, res) {
  console.log("create bug triggered");
  let id = Number(req.params.id);
  console.log(id, typeof id);
  const project = await findSpecificProject(id)
  return res.render("bugCreate", {
    project: project,
  });
};

module.exports.title = async function (req, res) {
  let searchParams = req.body.searchParams;
  let id = Number(req.params.id);
  console.log("search triggered");
  console.log(searchParams);

  const bug = await findSpecificBug(id, 'title', searchParams)
  const project = await findSpecificProject(id)
  console.log(bug)
  return res.render("description", {
    project: project,
    bugs: bug,
  });
};

module.exports.author = async function (req, res) {
  let searchParams = req.body.searchParams;
  let id = Number(req.params.id);
  console.log("search triggered");
  console.log(searchParams);
  
  const bug = await findSpecificBug(id, 'author', searchParams)
  const project = await findSpecificProject(id)
  console.log(bug)
  return res.render("description", {
    project: project,
    bugs: bug,
  });
};

module.exports.label = async function (req, res) {
  console.log(req.body);
  let label = getKeysWithValueOne(req.body);
  console.log(label);

  let id = Number(req.params.id);

  const bug = await findSpecificBug(id, 'label', label)
  const project = await findSpecificProject(id)
  console.log(bug)
  return res.render("description", {
    project: project,
    bugs: bug,
  });
};

function getKeysWithValueOne(obj) {
  const keysWithValueOne = [];
  for (let key in obj) {
    if (obj[key] === "1") {
      keysWithValueOne.push(key);
    }
  }
  return keysWithValueOne;
}

async function findSpecificProject(id) {
  const project = await Projects.find({ id: id })
  return project[0]
}

async function findSpecificBug(id, filter, value){
  let query = {}
    if (filter === '')
      query = {project_id: id}

    else 
      query = {project_id: id, [filter]: value}

    console.log(query)
    const bugList = await Bugs.find(query)
    return bugList
}
