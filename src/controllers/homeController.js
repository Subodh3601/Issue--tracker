import Project from "../models/project.js";

// Controller to go to the Home
export const home = async (req, res) => {
  try {
    // Fetch all projects
    const projects = await Project.find();

    return res.render("home", {
      title: "Home",
      projects: projects,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};
