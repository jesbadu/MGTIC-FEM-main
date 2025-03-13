// Constructor de estudiante
function Student(matricula, nombre, grupo){
    this.matricula = matricula;
    this.nombre = nombre;
    this.grupo = grupo;
}

// Obtener inputs del HTML
const inputMatricula = document.getElementById("txtMatricula");
const inputNombre = document.getElementById("txtNombre");
const inputGrupo = document.getElementById("txtGrupo");

// Obtener estudiantes guardados o inicializar arreglo vacío
let students = JSON.parse(localStorage.getItem("students")) || [];

// Registrar nuevo estudiante
function register(){
    if(inputMatricula.value === ""){
        alert("Ingresar la matrícula");
        return;
    }
    
    if(inputNombre.value === ""){
        alert("Ingresar el nombre");
        return;
    }

    if(inputGrupo.value === ""){
        alert("Ingresar el grupo");
        return;
    }

    let newStudent = new Student(inputMatricula.value, inputNombre.value, inputGrupo.value);

    students.push(newStudent);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();

    inputMatricula.value = "";
    inputNombre.value = "";
    inputGrupo.value = "";
}

// Mostrar los estudiantes registrados en pantalla
function displayStudents() {
    const tbody = document.querySelector("table tbody"); // Selecciona el <tbody>
    tbody.innerHTML = ""; // Limpia la tabla antes de renderizar

    let rows = ""; // Almacena las filas antes de insertarlas

    students.forEach((student, index) => {
        rows += `
            <tr>
                <td>${student.matricula}</td>
                <td>${student.nombre}</td>
                <td>${student.grupo}</td>
                <td class="text-center">
                    <button onclick="deleteStudent(${index})" class="btn btn-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar ${student.nombre}" aria-label="Eliminar ${student.nombre}">
                        <ion-icon name="trash-outline"></ion-icon>
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.insertAdjacentHTML("beforeend", rows); // Inserta el HTML una sola vez
}

// Eliminar un estudiante
function deleteStudent(index){
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

// Borrar todos los datos del ls
function clearStorage(){
    localStorage.removeItem("students");
    students = [];
    displayStudents();
}

// Mostrar estudiantes
document.addEventListener('DOMContentLoaded', function () {
    event.preventDefault(); // Evita que el formulario se envíe y recargue la página
    // Mostrar estudiantes
    displayStudents();
      
  });
