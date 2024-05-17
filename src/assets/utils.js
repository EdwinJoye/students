console.log("PRESENCE DE UTILS");

// FONCTION POUR RECUPERER LA LISTE DES ETUDIANTS
const fetchStudentList = () => {
  fetch("/get/students")
    .then((response) => response.json())
    .then((data) => {
      const studentList = document.getElementById("student-list");
      studentList.innerHTML = "";
      data.forEach((student) => {
        const studentDiv = document.createElement("div");
        studentDiv.classList.add("student-item");
        const nameDiv = document.createElement("div");
        const birthDiv = document.createElement("div");
        const deleteButton = document.createElement("button");

        nameDiv.textContent = student.name;
        birthDiv.textContent = student.birth;

        deleteButton.textContent = "X";
        deleteButton.onclick = () => deleteStudent(student.id);

        studentDiv.appendChild(nameDiv);
        studentDiv.appendChild(birthDiv);
        studentDiv.appendChild(deleteButton);

        studentList.appendChild(studentDiv);
      });
    })
    .catch((error) =>
      console.log("Erreur lors de la récupération des données")
    );
};

window.onload = fetchStudentList;

// FONCTION POUR SUPPRIMER UN ETUDIANT
const deleteStudent = (studentId) => {
  fetch(`/delete/student/${studentId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      fetchStudentList();
    })
    .catch((error) =>
      console.error("Erreur lors de la suppression de l'étudiant :", error)
    );
};

export { fetchStudentList, deleteStudent };
