const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const { students } = require("./src/Data/Data.js");
const dayjs = require("dayjs");
const localizedFormat = require("dayjs/plugin/localizedFormat");

dayjs.extend(localizedFormat);
dayjs.locale("fr");

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;
const HOST = process.env.APP_LOCALHOST || "127.0.0.1";

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join("./src")));

// ROUTE POUR ACCEDER A LA PAGE HOME
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "view", "home.html"));
});

// ROUTE POUR AJOUTER DES ETUDIANTS
app.post("/add/student", (req, res) => {
  const { name, birth } = req.body;
  console.log("Données reçues depuis le formulaire :", { name, birth });
  if (name && birth) {
    students.push({ name, birth });
    res.redirect("/students");
    console.log("L'étudiant a bien été ajouté :", { name, birth });
  } else {
    res.status(400).send("Un problème est survenu");
    console.log("Un problème est survenu lors de l'ajout de l'étudiant :", {
      name,
      birth,
    });
  }
});

// ROUTE POUR AFFICHER LA PAGE STUDENTS
app.get("/students", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "view", "students.html"));
});

// ROUTE POUR AFFICHER LES INFOS DES ÉTUDIANTS
app.get("/get/students", (req, res) => {
  const formattedStudents = students.map((student) => ({
    id: student.id,
    name: student.name,
    birth: dayjs(student.birth).locale("fr").format("D MMMM YYYY"),
  }));
  res.json(formattedStudents);
});

// ROUTE POUR SUPPRIMER LES ETUDIANTS
app.delete("/delete/student/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const index = students.findIndex((student) => student.id === studentId);

  if (index !== -1) {
    students.splice(index, 1);
    res.json({ message: "L'étudiant a bien été supprimé" });
  } else {
    res.status(404).json({ message: "L'étudiant n'a pas été trouvé" });
  }
});

app.listen(PORT, HOST, () => {
  console.log("Le serveur à bien démarré !");
});
