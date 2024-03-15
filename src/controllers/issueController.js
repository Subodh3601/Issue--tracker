import Issue from "../models/issue.js";
import Project from "../models/project.js";

// Controller for rendering the issue creation form
export const createIssueForm = (req, res) => {
  const projectId = req.params.id;
  res.render("createIssue", { projectId, title: "Create Issue" });
};

// Controller for creating a new issue
export const createIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, author, labels } = req.body;

    const issue = await Issue.create({
      title,
      description,
      author,
      labels,
    });

    // Find the project and update its issues array with the newly created issue
    const project = await Project.findByIdAndUpdate(
      id,
      { $push: { issues: issue._id } },
      { new: true }
    );

    // If project is not found, handle the error
    if (!project) {
      return res.status(404).send("Project not found");
    }

    // Redirect to the project detail page
    return res.redirect(`/project/${id}`);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};
