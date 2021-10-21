var btnOpenModal = document.querySelectorAll('.modal-open')
var btnCloseModal = document.querySelectorAll('.modal-close')
const btnSubmit = document.getElementById("contacto_submit")
const overlay = document.querySelector('.modal-overlay')
const modal = document.querySelector('.modal')

let inputNombre = document.getElementById("grid-nombre")
let inputEmail = document.getElementById("grid-email")
let inputTelefono = document.getElementById("grid-telefono")
let inputMensaje = document.getElementById("grid-mensaje")

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
    let contacto = {
        nombre: inputNombre.value,
        email: inputEmail.value,
        telefono: inputTelefono.value,
        mensaje: inputMensaje.value
    }

    alert(`Gracias por tu contacto, ${contacto.nombre}. Me comunicaré pronto!`)
    clearModal()
}

function clearModal() {
    inputNombre.value = ''
    inputEmail.value = ''
    inputTelefono.value = ''
    inputMensaje.value = ''
}