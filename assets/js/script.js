
// pt-1) llamados de request, getUser y  getRepo

const baseUrl = 'https://api.github.com/users/';

const request = async (url) => {
      const results = await fetch(url);
      const response =  await results.json();
      return response
}


const getUser = async (nombre) => {   
   
   const url = `${baseUrl}${nombre}`;
   return request(url);
}


const getRepo = async (nombre,pagina,repoPagina) => {
   const url = `${baseUrl}${nombre}/repos?page=${pagina}&per_page=${repoPagina}`;
   return request(url);

}

// pt-3) promesa, traer info.
Promise.all([getRepo(nombre,pagina,repoPagina),getUser(nombre)])
.then(values =>{
   console.log(values)
})
.catch(error =>{
   console.log(error)
})



// pto 2, 4 y 5)  traer resultados.
let boton = document.getElementById("boton");
boton.addEventListener('click', async (event) => {
   event.preventDefault();
   
   const nombre = document.getElementById("nombre").value;
   const repoPagina = document.getElementById("repoPagina").value;
   const pagina = document.getElementById("pagina").value
    
    try {
      let user = await getUser(nombre)
      let post = await getRepo(nombre,pagina,repoPagina)

      if(user.message=="Not Found"){
         alert("usuario no existe")
         document.getElementById("datosUsuario").innerHTML="";
      }else{

    
    let datosUsuario = document.getElementById("datosUsuario"); 
    datosUsuario.innerHTML=`
            <h2>Datos Usuario</h2>
            <img src="${user.avatar_url}"  width="200px" alt="..." >
            <p >Nombre de Usuario: ${user.name}</p>
            <p>Nombre de Login: ${user.login}</p>
            <p>Cantidad de repositorios: ${user.public_repos}</p>
            <p>Localidad: ${user.location}</p>
            <p>Tipo de usuario: ${user.type}</p>
            ` ;

    let listaUsuario = document.getElementById("listaUsuario");
    listaUsuario.innerHTML=`<h2>Nombre de Repositorios<h2>`
    post.forEach(element => { 
      const p = document.createElement('p');
       p.innerHTML= `<a href="${element.html_url}">${element.name}</a>`;
       listaUsuario.appendChild(p)
   
  });      
}

     
    } catch (err) {
        console.log(err);
    }
});

