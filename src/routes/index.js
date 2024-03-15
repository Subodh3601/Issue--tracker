import express from "express";

import { home } from "../controllers/homeController.js";
import { projectForm, createProjects, viewProjects, filterProjects, deleteProject } from "../controllers/projectController.js";
import { createIssueForm, createIssue } from "../controllers/issueController.js";



const router = express.Router();

// Route to home
router.get("/", home);

// Route to render project form
router.get("/project/create", projectForm);

// Route to handle project creation
router.post("/project/create", createProjects);

// Route to view project
router.get("/project/:id", viewProjects);

// Route to filter issues and search
router.get("/projects/:id/filter", filterProjects);

// Route to handle project deletion
router.post("/projects/:id/delete", deleteProject);

// Route to render issue creation form
router.get("/projects/:id/issues/new", createIssueForm);

// Route to handle creation of new issue
router.post("/projects/:id/issues", createIssue);

export default router;
