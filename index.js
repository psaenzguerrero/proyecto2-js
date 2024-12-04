let selectorCategorias = document.querySelector('#categorias select');
let row = document.querySelector('#recetas .row');

//VARIABLES MODAL
let tituloModal = document.querySelector(".modal-title");
let imagenModal = document.querySelector("#emergente img");
let lista = document.querySelector("#emergente ul");
let textoModal = document.querySelector("#emergente p");

// FUNCION GENEREAL PARA OBTENER DATOS DE LA API PASANDOLE LA URL
function obtenerDatos(url){
    return fetch(url).
    then(respuesta => respuesta.json())
}
//CARGAR CATEGORIA / OPTIONS DEL SELECT
function cargarCategorias(){
    const url1 = "https://www.themealdb.com/api/json/v1/1/categories.php";
    obtenerDatos (url1)
    .then(datos => {
        datos.categories.forEach(dato => {
            selectorCategorias.innerHTML +=`
            <option value="${dato.strCategory}">${dato.strCategory}</option>
            `;
        });
    })
}
function mostrarRecetasDeLaCategoria(cat){
    row.innerHTML=``;
    const url2 ="https://www.themealdb.com/api/json/v1/1/filter.php?c="+cat;
    obtenerDatos(url2).
    then(recetas => {
        recetas.meals.forEach(receta=>{
            
            row.innerHTML += `
                 
            <div class="col-md-4">
                <div class="card text-white bg-info mb-3">
                    <div class="card-header">
                        <img src="${receta.strMealThumb}" class="img-fluid" alt="">
                    </div>
                    <div class="card-body">
                      <h4 class="card-title">${receta.strMeal}</h4>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" 
                            data-bs-target="#emergente"
                            onclick="mostarReceta(${receta.idMeal})">
                            VER MAS ->
                        </button>
                    </div>
                  </div>
            </div>
            `; 
        })
    })
}
function mostarReceta(idReceta){

    const url3 = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+idReceta;
    console.log(tituloModal);
    obtenerDatos(url3)
    .then(receta =>{
        console.log(receta);   
        tituloModal.textContent = receta.meals[0].strMeal;      
        imagenModal.src=receta.meals[0].strMealThumb;
        textoModal.textContent= receta.meals[0].strInstructions;
        //Formador de ingredientes
        lista.innerHTML="";
        for (let index = 1; index <= 20; index++){           
            const li = document.createElement("li");
            li.textContent = receta.meals[0]["strIngredient"+[index]]+receta.meals[0]["strMeasure"+[index]];
            if (li.textContent != "" && li.textContent != null && li.textContent != 0) {
                lista.append(li);
            } 
        }

        // const botonAccion = document.querySelector(".modal-footer > button");
        // console.log(botonAccion.getAttribute("class"));
        
        const todosloscard = document.querySelectorAll(".col-md-4");
        const todoslosmodales = document.querySelectorAll("#emergente");
        todosloscard.forEach(card=> {
            todoslosmodales.forEach(modal => {
                console.log(card)
            const botonAccion = modal.querySelector(".modal-footer > button");
            console.log(botonAccion);
            botonAccion.addEventListener("click", () =>{
                let separar = botonAccion.getAttribute("class").split(" "); 
                console.log(separar)
                let enqueesta = separar[separar.length -1];
                console.log(enqueesta);
                if(enqueesta === "guardar"){
                    // Recupera el arreglo actual desde localStorage o crea uno vacío si no existe
                    let idsGuardados = JSON.parse(localStorage.getItem("idsGuardados")) || [];
    
                    // Obtiene el idMeal actual
                    const variableAguardar = receta.meals[0].idMeal;
    
                    // Verifica si el idMeal ya está en el arreglo
                    if (!idsGuardados.includes(variableAguardar)) {
    
                        // Si no existe, lo agrega
                        idsGuardados.push(variableAguardar);
    
                        // Guarda el arreglo actualizado en localStorage
                        localStorage.setItem("idsGuardados", JSON.stringify(idsGuardados));
                    } 
                    botonAccion.removeAttribute("class");
                    botonAccion.setAttribute("class","btn btn-primary eliminar");
                    botonAccion.textContent = "Eliminar";
                    console.log(botonAccion.getAttribute("class"));
                }else{
                    let array = JSON.parse(localStorage.getItem("idsGuardados")) || [];
    
               
                    array = array.filter(item => item != idReceta);
                    console.log(array);
                    console.log(idReceta);
                    if (array.length > 0) {
                        localStorage.setItem("idsGuardados", JSON.stringify(array));
                    } else {
                        // Si el array queda vacío, eliminar la clave en localStorage
                        localStorage.removeItem("idsGuardados");
                    }
                    console.log(botonAccion);
                    botonAccion.removeAttribute("class");
                    console.log(botonAccion);
                    botonAccion.setAttribute("class","btn btn-primary guardar");
                    console.log(botonAccion);
                    botonAccion.textContent = "Añadir";
                    console.log(botonAccion.getAttribute("class"));
                }
            })   
            });    
        });


    });
    
}
function mostrarF(idReceta){
    const url3 = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+idReceta;

    console.log(tituloModal);

    obtenerDatos(url3)

    .then(receta =>{
        row.innerHTML += `
                 
                    <div class="col-md-4">
                        <div class="card text-white bg-info mb-3">
                            <div class="card-header">
                                <img src="${receta.meals[0].strMealThumb}" class="img-fluid" alt="">
                            </div>
                            <div class="card-body">
                            <h4 class="card-title">${receta.meals[0].strMeal}</h4>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" 
                                    data-bs-target="#emergente"
                                    onclick="mostarRecetaF(${receta.meals[0].idMeal})">
                                    VER MAS ->
                                </button>
                            </div>
                        </div>
                    </div>
                    `; 
    })
}
function mostarRecetaF(idReceta){

    const url3 = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+idReceta;

    console.log(tituloModal);

    obtenerDatos(url3)

    .then(receta =>{

        tituloModal.textContent = receta.meals[0].strMeal;
        imagenModal.src=receta.meals[0].strMealThumb;
        textoModal.textContent= receta.meals[0].strInstructions;
        lista.innerHTML="";
        for (let index = 1; index <= 20; index++){
            
            const li = document.createElement("li");
            li.textContent = receta.meals[0]["strIngredient"+[index]]+receta.meals[0]["strMeasure"+[index]];
            if (li.textContent != "" && li.textContent != null && li.textContent != 0) {
                lista.append(li);
            } 
        }
        const botonAccion = document.querySelector(".modal-footer > button");
        console.log(botonAccion.getAttribute("class"));
        
        
        botonAccion.addEventListener("click", () =>{
            let separar = botonAccion.getAttribute("class").split(" "); 
            console.log(separar)
            let enqueesta = separar[separar.length -1];
            console.log(enqueesta);
            if(enqueesta === "guardar"){
                // Recupera el arreglo actual desde localStorage o crea uno vacío si no existe
                let idsGuardados = JSON.parse(localStorage.getItem("idsGuardados")) || [];

                // Obtiene el idMeal actual
                const variableAguardar = receta.meals[0].idMeal;

                // Verifica si el idMeal ya está en el arreglo
                if (!idsGuardados.includes(variableAguardar)) {

                    // Si no existe, lo agrega
                    idsGuardados.push(variableAguardar);

                    // Guarda el arreglo actualizado en localStorage
                    localStorage.setItem("idsGuardados", JSON.stringify(idsGuardados));
                } 
                botonAccion.removeAttribute("class");
                botonAccion.setAttribute("class","btn btn-primary eliminar");
                botonAccion.textContent = "Eliminar";
                console.log(botonAccion.getAttribute("class"));
            }else{
                let array = JSON.parse(localStorage.getItem("idsGuardados")) || [];

           
                array = array.filter(item => item != idReceta);
                console.log(array);
                console.log(idReceta);
                if (array.length > 0) {
                    localStorage.setItem("idsGuardados", JSON.stringify(array));
                } else {
                    // Si el array queda vacío, eliminar la clave en localStorage
                    localStorage.removeItem("idsGuardados");
                }
                console.log(botonAccion);
                botonAccion.removeAttribute("class");
                console.log(botonAccion);
                botonAccion.setAttribute("class","btn btn-primary guardar");
                console.log(botonAccion);
                botonAccion.textContent = "Añadir";
                console.log(botonAccion.getAttribute("class"));
            }
        })
    })
}

document.addEventListener("DOMContentLoaded",()=>{
    if (window.location.href == "file:///C:/Users/EAG/Desktop/proyecto2-js/index.html") {
        cargarCategorias();
    }
    
})