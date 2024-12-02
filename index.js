let selectorCategorias = document.querySelector('#categorias select');
let row = document.querySelector("#recetas .row");

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
//
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
        for (let index = 1; index <= 20; index++){
            const li = document.createElement("li");
            li.textContent = receta.meals[0]["strIngredient"+[index]]+receta.meals[0]["strMeasure"+[index]];
            if (li.textContent != "") {
                lista.append(li);
                document.getElementById("guardar").addEventListener("click", () => {
                    // Guarda el valor de una variable en el localStorage
                    const variableAguardar = receta.meals[0].idMeal; 
                    localStorage.setItem("variableGuardada", variableAguardar);
                    
                }); 
            } 
            
            // NO ME FUNCIONA PREGUNTAR

            // document.getElementById("guardar").addEventListener("click", () => {
            //     // Obtener la lista actual de objetos desde localStorage
            //     let objetosGuardados = JSON.parse(localStorage.getItem("listaObjetos")) || [];
    
            //     // Agregar el nuevo objeto
            //     objetosGuardados.push(nuevoObjeto);
    
            //     // Guardar nuevamente en localStorage
            //     localStorage.setItem("listaObjetos", JSON.stringify(objetosGuardados));
    
            //     alert("Objeto guardado en localStorage");
            // });
        }
    });
    
}

document.addEventListener("DOMContentLoaded",()=>{
    cargarCategorias();
})