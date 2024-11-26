let selectorCategorias = document.querySelector('#categorias select');
let row = document.querySelector("#recetas .row");

//VARIABLES MODAL
let tituloModal = document.querySelector(".modal-title");
let imagenModal = document.querySelector("#emergente img");
let lista = document.querySelector("#emergente ul");

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
        
        tituloModal.textContent = receta.meals[0].strMeal;
        
        imagenModal.src=receta.meals[0].strMealThumb;
        
        for (let index = 1; index <= 20; index++){
            const li = document.createElement("li");
            li.textContent = receta.meals[0]["strIngredient"+[index]];
            if (li.textContent != "") {
                lista.append(li);
            }  
        }
    });
    
}

document.addEventListener("DOMContentLoaded",()=>{
    cargarCategorias();
})