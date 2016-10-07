
window.addEventListener("load",cargarPagina);
var  contenedor = document.getElementById("contenedor");
var  contenedorLista = document.getElementById("contenedorLista");
var  textoSpan = document.getElementById("lista-trello");
var  formTrello= document.getElementById("form-trello");
var  inputTexto= document.getElementById("inputTexto");
var  botonform = document.getElementById("botonForm");
var contador = 1;

function cargarPagina() {	
	textoSpan.addEventListener("click",formVisible);
	botonform.addEventListener("click", creandoLista );	
}
function formVisible() {
	textoSpan.style.display="none";
	formTrello.style.display="block";
	contenedorLista.classList.add("form-ingreso","dragdrop");
	inputTexto.focus();
}
function creandoLista(e){
	e.preventDefault();	
	formTrello.style.display="none";
	agregarLista(inputTexto,this);
	crearColumna(textoSpan, formTrello);
	inputTexto.value="";
}
function agregarLista(nombre,botonForm) {
	var contenedorPadre = botonForm.parentElement.parentElement;
	var linklista = document.createElement("div");
	var titleLista = document.createElement("div");
	titleLista.textContent= nombre.value;
	contenedorPadre.insertBefore(titleLista,contenedorPadre.childNodes[0]);
	linklista.innerHTML="AñadirTarjeta...";
	contenedorPadre.insertBefore(linklista,contenedorPadre.childNodes[1]);
	linklista.classList.add("linkLista");
	titleLista.classList.add("titleLista");
	linklista.addEventListener("click", crearTarjeta);
}
function crearTarjeta(){
	this.style.display="none";
	agregarNewTarjeta(this.parentElement);
}
function agregarNewTarjeta(padre){
	var newform = document.createElement("form");
	var textArea= document.createElement("textArea");
	var botonAnadir = document.createElement("button");
	newform.appendChild(textArea).classList.add("textAreaform");
	newform.appendChild(botonAnadir).classList.add("boton-form");
	padre.appendChild(newform);
	botonAnadir.innerText="Añadir";
	botonAnadir.type="button";
	newform.classList.add("form-ingreso");
	textArea.focus();
	botonAnadir.addEventListener("click",crear);
}	
function crear(){
	guardarNewTarjeta(this.parentElement.parentElement, this.previousSibling);
	this.parentElement.classList.remove("aparece");
	this.parentElement.classList.add("ocultar");
	this.previousElementSibling.classList.add("aparece");
	this.previousElementSibling.classList.remove("ocultar");
	contador++;
}
function guardarNewTarjeta(padre,textArea){
	var nombreTarjeta= document.createElement("div");
	nombreTarjeta.innerText=textArea.value;
	padre.insertBefore(nombreTarjeta,padre.lastChild);
	nombreTarjeta.classList.add("tarjetaStyle");
	padre.appendChild(nombreTarjeta.previousElementSibling);
	padre.lastElementChild.style.display = "block";
	
	/*Drag-drop*/
	nombreTarjeta.setAttribute("draggable","true");
	nombreTarjeta.setAttribute("id","movile"+contador);
	nombreTarjeta.addEventListener("dragstart", empiezaArrastrar);
	padre.addEventListener("dragover", arrastrarSobre);
	padre.addEventListener("drop", soltar);
	nombreTarjeta.addEventListener("dragend", terminaArrastrar);
}

function crearColumna(nuevaLista, formulario) {
	var nuevaColumna = document.createElement("div");
	nuevaColumna.classList.add("columnaLista", "lista-trello","form-ingreso","dragdrop");
	nuevaLista.style.display = "block";
	nuevaColumna.appendChild(nuevaLista);
	nuevaColumna.appendChild(formulario);
	contenedor.appendChild(nuevaColumna);
}
/* drag and drop */
function empiezaArrastrar(e) {
	e.dataTransfer.setData("text", this.id);
	this.classList.add("newStyletarjeta");
	var newClassdragdop = document.getElementsByClassName("dragdrop");
	for (var i = 0; i < newClassdragdop.length; i++) {
		newClassdragdop[i].classList.remove("animated","bounce","pulse");
	}
}
function arrastrarSobre(e) {
	e.preventDefault();
	this.classList.add("animated","pulse");
}
function soltar(e) {
	var idArrastrado = e.dataTransfer.getData("text");
	var elementoArrastrado = document.getElementById(idArrastrado);
	var temporal = this.innerHTML;
	this.insertBefore(elementoArrastrado,this.childNodes[1]);
	this.classList.add("animated","swing");
	
}
function terminaArrastrar(e) {
	this.classList.remove("newStyletarjeta");
}
