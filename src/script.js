var btnOpenModal = document.querySelectorAll('.modal-open')
var btnCloseModal = document.querySelectorAll('.modal-close')
var experienceBlock = document.getElementById('experiencia-laboral')
const btnSubmit = document.getElementById('contacto_submit')
const overlay = document.querySelector('.modal-overlay')
const modal = document.querySelector('.modal')

let inputNombre = document.getElementById('grid-nombre')
let inputEmail = document.getElementById('grid-email')
let inputTelefono = document.getElementById('grid-telefono')
let inputMensaje = document.getElementById('grid-mensaje')

setup()

function setup(modal) {
  openModal()
  closeModal()
  btnSubmit.onclick = sendContact

  window.onclick = function (event) {
    if (event.target == modal) {
        closeModal()
    }
  }
}

function openModal() {
  for (var i = 0; i < btnOpenModal.length; i++) {
    btnOpenModal[i].addEventListener('click', function (event) {
        event.preventDefault()
        toggleModal()
    })
  }
  overlay.addEventListener('click', toggleModal)
}

function closeModal() {
  for (var i = 0; i < btnCloseModal.length; i++) {
    btnCloseModal[i].addEventListener('click', toggleModal)
  }
}

function toggleModal() {
  const body = document.querySelector('body')
  const modal = document.querySelector('.modal')
  modal.classList.toggle('opacity-0')
  modal.classList.toggle('pointer-events-none')
  body.classList.toggle('modal-active')
}

function sendContact() {
  inputRemoveWarning(inputNombre, inputEmail)
  if(inputNombre.value !="" && inputEmail.value !="") {
    let contacto = {
        nombre: inputNombre.value,
        email: inputEmail.value,
        telefono: inputTelefono.value,
        mensaje: inputMensaje.value
    }
    alert(`Gracias por tu contacto, ${contacto.nombre}. Me comunicaré pronto!`)
    console.log(contacto)
    window.localStorage.setItem(`${contacto.email}`, JSON.stringify(contacto))
    clearModal()
  } else {
    inputRemoveWarning(inputNombre, inputEmail)
    errorMsg(inputNombre, inputEmail)
  }
}

function clearModal() {
  inputNombre.value = ""
  inputEmail.value = ""
  inputTelefono.value = ""
  inputMensaje.value = ""
}

function errorMsg(name, email) {
  if(name.value == ""){
      inputAddWarning(name)
  } 

  if (email.value == "") {
      inputAddWarning(email)
  }
  alert(`Ingresa tu informacion de contacto!`)
}

function inputAddWarning(input) {
  input.classList.add('border-red-500')
}

function inputRemoveWarning(name, email) {
  if (name.classList.contains('border-red-500')) {
      name.classList.remove('border-red-500')
  }

  if (email.classList.contains('border-red-500')) {
      email.classList.remove('border-red-500')
  }
}

function getLaboralExperience() {
 fetch("http://pw2021-apinode-aleetchevers.alejandraetchev.repl.co/experiencia-laboral")
  .then((response) => response.json()) 
  .then((experiencias) => {
    createLaboralExperienceSection(experiencias)
  });
}

function createLaboralExperienceSection(experiencias) {
  var div = document.createElement("div")
  div.classList.add("text-gray-500")

  experiencias['experiencia-laboral'].forEach(function (experiencia) {
    var divExperiencia = document.createElement("div")
    divExperiencia.classList.add("text-gray-500", "pt-6", "mt-6")
  
    var empresa = document.createElement("h3");
    empresa.classList.add("text-blue-300", "font-bold")
    empresa.textContent = experiencia.empresa;
    divExperiencia.appendChild(empresa)

    var section1 = document.createElement("section")
    section1.classList.add("mb-6")

    var fechas = document.createElement("div")
    fechas.classList.add("lg:inline-block", "lg:w-3/12", "lg:align-top", "italic", "mb-2")
    var fechaInicio = document.createElement("p")
    fechaInicio.textContent = experiencia.fechaInicio
    var fechaFin = document.createElement("p")
    fechaFin.textContent = experiencia.fechaFin
    
    fechas.appendChild(fechaInicio)
    fechas.appendChild(fechaFin)
    section1.appendChild(fechas)

    var puesto = document.createElement("div")
    puesto.classList.add("lg:inline-block", "lg:w-8/12", "w-full")
    puesto.textContent = experiencia.puesto
    section1.appendChild(puesto)
    
    divExperiencia.appendChild(section1)

    var section2 = document.createElement("section")
    section2.classList.add("mb-6")

    var acercaDe = document.createElement("div")
    acercaDe.classList.add("lg:inline-block", "lg:w-3/12", "lg:align-top", "italic", "mb-2")
    acercaDe.textContent = 'Acerca de : '
    section2.appendChild(acercaDe)

    var descripcion = document.createElement("div")
    descripcion.classList.add("lg:inline-block", "lg:w-8/12", "w-full")
    descripcion.textContent = experiencia.descripcion
    section2.appendChild(descripcion)

    divExperiencia.appendChild(section2)

    if(experiencia.empresa == "EagerWorks") {
      var section3 = document.createElement("section")
      section3.classList.add("mb-6")

      var divHerramientas = document.createElement("div")
      divHerramientas.classList.add("lg:inline-block", "lg:w-3/12", "lg:align-top", "italic", "mb-2")
      divHerramientas.textContent = 'Herramientas : '
      section3.appendChild(divHerramientas)

      var herramientas = document.createElement("div")
      herramientas.classList.add("lg:inline-block", "lg:w-8/12", "w-full")
      
      let lista_herramientas = ['Rails', 'GitHub', 'Ruby', 'Bootstrap', 'Circle CI', 'Clickup|Trello', 'HTML|CSS']
      for (var i = 0; i < lista_herramientas.length; i++) {
        var span = document.createElement("span")
        span.classList.add('rounded-xl', 'bg-blue-300', 'text-gray-500', 'px-3')
        span.textContent = lista_herramientas[i]
        herramientas.appendChild(span)
      }
      section3.appendChild(herramientas)
      divExperiencia.appendChild(section3)
    }
    div.appendChild(divExperiencia)
  })
  experienceBlock.appendChild(div)
}

document.addEventListener("DOMContentLoaded", function () {
  getLaboralExperience()
})