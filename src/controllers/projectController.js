import Project from "../models/project.js";
import Issue from "../models/issue.js";

// Controller to render the form page to create a project
export const projectForm = async (req, res) => {
  try {
    res.render("createProject", { title: "Create Project" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

// Controller to create a project
export const createProjects = async (req, res) => {
  try {
    const { name, author, description } = req.body;
    const project = await Project.create({
      name,
      author,
      description,
    });

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

// Controller to view project
export const viewProjects = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id).populate("issues");
    if (!project) {
      return res.status(404).send("Project not found");
    }

    const labels = project.issues.reduce((acc, issue) => {
      acc.push(...issue.labels);
      return acc;
    }, []);

    const uniqueLabels = [...new Set(labels)];

    return res.render("viewProject", {
      title: "View Project",
      project: project,
      labels: uniqueLabels,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

// Controller to delete a project and its associated issues
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).send("Project not found");
    }

    await Issue.deleteMany({ _id: { $in: project.issues } });

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

// Controller to handle project filter and search
export const filterProjects = async (req, res) => {
  try {
    const { id } = req.params;
    const { label, search, author } = req.query;

    const project = await Project.findById(id).populate({
      path: "issues",
      match: {
        $and: [
          { labels: label === "all" ? { $exists: true } : label },
          { title: { $regex: new RegExp(search, "i") } },
          { author: { $regex: new RegExp(author, "i") } },
        ],
      },
    });

    if (!project) {
      return res.status(404).send("Project not found");
    }

    const labels = [...new Set(project.issues.map((issue) => issue.labels).flat())];
    const filteredIssues = project.issues;

    return res.render("viewProjectFiltered", {
      title: "Filtered Project",
      project: project,
      filteredIssues: filteredIssues,
      labels: labels,
      filter: label,
      search: search,
      author: author,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};
