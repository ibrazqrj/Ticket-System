import axios from "axios";

const API_URL = "http://localhost:8080/api/projects";

const getAllProjects = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.get(API_URL, {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  });
};

const createProject = (projectData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.post(API_URL, projectData, {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  });
};

const deleteProject = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  });
};

const ProjectService = {
  getAllProjects,
  createProject,
  deleteProject,
};

export default ProjectService;
