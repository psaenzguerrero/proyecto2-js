let selectorCategorias = document.querySelector('#categorias select');
const url = "https://www.themealdb.com/api/json/v1/1/categories.php";


function cargarDatos(url){
    fetch(url).
    then(response => response.json()).
    then(datos =>{
        return datos;
    });
}

function cargarCategorias(){
    fetch(url).
    then(respuesta => respuesta.json()).
    then(datos => {
        datos.categories.forEach(dato => {
            selectorCategorias.innerHTML +=`
            <option value="${dato.strCategory}">${dato.strCategory}</option>
            `;
        });
    })
}

function mostrarRecetas(cat){
    const url ="https://www.themealdb.com/api/json/v1/1/filter.php?c="+cat;
    console.log(url)
}

document.addEventListener("DOMContentLoaded",()=>{
    cargarCategorias();
})