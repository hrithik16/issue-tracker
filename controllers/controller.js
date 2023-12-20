const Projects = require("../models/project");
const Bugs = require("../models/bug");

module.exports.dashboard = async function (req, res) {
  try {
    const ProjectList = await Projects.find({}); // To display all the Projects
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
    const createdProject = await Projects.create({
      //To Add new Project in the DB
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
  let projectSpecificBug = await findSpecificBug(id); //To find bugs related to the project on which user have clicked

  const project = await findSpecificProject(id); //To find all the details of the project on which user have clicked

  return res.render("description", {
    project: project,
    bugs: projectSpecificBug,
  });
};

module.exports.addBug = async function (req, res) {
  try {
    const len = await Bugs.countDocuments({});
    const bug = await Bugs.create({
      //To Add new Project in the DB
      id: len + 1,
      title: req.body.title,
      description: req.body.description.trim(),
      author: req.body.author,
      label: req.body.label,
      project_id: Number(req.params.id),
    });
    console.log("New Bug Add Sucessfully", bug);
    return res.redirect("/");
  } catch (error) {
    console.error("Error creating project:", error);
  }
};

module.exports.addBugPage = async function (req, res) {
  let id = Number(req.params.id);
  const project = await findSpecificProject(id);
  return res.render("bugCreate", {
    project: project,
  });
};

module.exports.title = async function (req, res) {
  let searchParams = req.body.searchParams;
  let id = Number(req.params.id);

  const bug = await findSpecificBug(id, "title", searchParams);
  const project = await findSpecificProject(id);
  return res.render("description", {
    project: project,
    bugs: bug,
  });
};

module.exports.author = async function (req, res) {
  let searchParams = req.body.searchParams;
  let id = Number(req.params.id);

  const bug = await findSpecificBug(id, "author", searchParams);
  const project = await findSpecificProject(id);
  return res.render("description", {
    project: project,
    bugs: bug,
  });
};

module.exports.label = async function (req, res) {
  console.log(req.body);
  let label = req.body.label;

  let id = Number(req.params.id);

  const bug = await findSpecificBug(id, "label", label);
  const project = await findSpecificProject(id);
  return res.render("description", {
    project: project,
    bugs: bug,
  });
};

async function findSpecificProject(id) {
  const project = await Projects.find({ id: id });
  return project[0];
}

async function findSpecificBug(id, filter, value) {
  // Common function for fetching Bugs with specific author, label and title
  let query = {};
  if (filter === "") query = { project_id: id };
  else {
    query = { project_id: id, [filter]: value };
  }
  console.log("searched query is ", query);
  const bugList = await Bugs.find(query);
  return bugList;
}
