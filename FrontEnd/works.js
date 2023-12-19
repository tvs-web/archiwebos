import { popup1 } from "./popup.js";
import { popup2 } from "./popup.js";
// Récupération des pièces depuis l'API
await fetch("http://localhost:5678/api/works/")
  .then(function (response) {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
  })
  .catch(function (error) {
    return;
  });
//Récupération des travaux eventuellement stockées dans le localStorage
let workes = window.localStorage.getItem("works");
if (workes === null) {
  // Récupération des pièces depuis l'API
  const url = "http://localhost:5678/api/works/";
  const reponse = await fetch(url);
  const works = await reponse.json();
  // Transformation des pièces en JSON
  const valeursWorks = JSON.stringify(works);
  // Stockage des informations dans le localStorage
  window.localStorage.setItem("works", valeursWorks);
} else {
  workes = JSON.parse(workes);
}
//---------------------------RECUPERATION DES TRAVAUX DEPUIS LE BACKEND------------------------------
async function callApi() {
  const url = "http://localhost:5678/api/works/";
  const reponse = await fetch(url);
  const works = await reponse.json();
  genererWorks(works);

  function genererWorks(works) {
    document.querySelector(".gallery").innerHTML = "";

    for (let i = 0; i < works.length; i++) {
      const projects = document.querySelector(".gallery");
      const figure = works[i];
      const projectsFigure = document.createElement("figure");
      projectsFigure.classList.add("fig");
      const projectsImage = document.createElement("img");
      projectsImage.src = figure.imageUrl;
      const projectsfigcaption = document.createElement("figcaption");
      projectsfigcaption.textContent = figure.title;
      const trash = document.createElement("button");
      trash.id = "trash";
      const trashIcone = document.createElement("i");
      trashIcone.className = "fa-regular fa-trash-can";
      trashIcone.style.color = "white";
      trashIcone.style.position = "relative";

      projectsFigure.appendChild(projectsImage);
      projectsFigure.appendChild(projectsfigcaption);
      projects.appendChild(projectsFigure);
      projectsFigure.appendChild(trashIcone);
      projectsFigure.appendChild(trash);
      trash.appendChild(trashIcone);
    }
  }
  //--------------------------------------------------------------

  const filtres = document.querySelector(".filtres");
  const buttonTous = document.createElement("button");
  buttonTous.classList.add("btn_tous");
  buttonTous.textContent = "Tous";
  const buttonObjets = document.createElement("button");
  buttonObjets.classList.add("btn_objets");
  buttonObjets.textContent = "Objets";
  const buttonAppartements = document.createElement("button");
  buttonAppartements.classList.add("btn_appartements");
  buttonAppartements.textContent = "Appartements";
  const buttonHotels_Restaurants = document.createElement("button");
  buttonHotels_Restaurants.classList.add("btn_hotels_restaurants");
  buttonHotels_Restaurants.textContent = "Hotels & restaurants";
  filtres.appendChild(buttonTous);
  filtres.appendChild(buttonObjets);
  filtres.appendChild(buttonAppartements);
  filtres.appendChild(buttonHotels_Restaurants);
  // ----------------GESTION DES BOUTONS-------------------------

  const boutonTous = document.querySelector(".btn_tous");
  boutonTous.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(works);
  });

  const boutonObjets = document.querySelector(".btn_objets");
  boutonObjets.addEventListener("click", function () {
    const worksObjets = works.filter(function (work) {
      return work.category.name === "Objets";
    });
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(worksObjets);
  });

  const boutonAppartements = document.querySelector(".btn_appartements");

  boutonAppartements.addEventListener("click", function () {
    const worksAppartements = works.filter(function (work) {
      return work.category.name === "Appartements";
    });
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(worksAppartements);
  });

  const boutonHotels_restaurants = document.querySelector(
    ".btn_hotels_restaurants"
  );
  boutonHotels_restaurants.addEventListener("click", function () {
    const worksHotels_restaurants = works.filter(function (work) {
      return work.category.name === "Hotels & restaurants";
    });
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(worksHotels_restaurants);
  });
}
callApi();

function connexion() {
  const tokens = localStorage.getItem("token");
  const filtres = document.querySelector(".filtres");
  const entete = document.querySelector(".entete");
  const header = document.querySelector("header");
  const title = document.querySelector("h1");
  const nav = document.querySelector("nav");

  if (tokens !== null && tokens !== "") {
    filtres.classList.remove("filtres");
    const divHeader = document.createElement("div");
    divHeader.classList.add("header");

    // creation div pour insertion mode edit sur projet
    const divMesProjets = document.createElement("div");
    // console.log(divMesProjets);
    divMesProjets.classList.add("entete1");
    // header.insertBefore(divMesProjets, portfolio.firstChild);

    // creation icone et paragraphe mode edit
    const enteteIcone = document.createElement("i");
    enteteIcone.className = "fa-regular fa-pen-to-square";
    const enteteEdit = document.createElement("p");
    enteteEdit.textContent = "mode edition";

    header.appendChild(entete);
    entete.appendChild(enteteIcone);
    entete.appendChild(enteteEdit);
    header.appendChild(divHeader);
    divHeader.appendChild(title);
    divHeader.appendChild(nav);

    const portfolio = document.getElementById("portfolio");
    const mesProjets = document.createElement("div");
    mesProjets.classList.add("mesprojets");
    const h2MesProjets = document.getElementById("projets");
    const cloneEnteteIcone = enteteIcone.cloneNode(true);
    const enteteModif = document.createElement("a");
    enteteModif.textContent = " " + "modifier";
    enteteModif.href = "#";
    enteteModif.id = "modif";
    portfolio.appendChild(divMesProjets);
    portfolio.appendChild(mesProjets);
    divMesProjets.appendChild(cloneEnteteIcone);
    divMesProjets.appendChild(enteteModif);
    portfolio.insertBefore(mesProjets, portfolio.firstChild);
    portfolio.insertBefore(divMesProjets, portfolio.children[1]);
    mesProjets.appendChild(divMesProjets);
    mesProjets.appendChild(h2MesProjets);
  } else {
    entete.remove("entete");
    header.classList.add("login");
  }
}
connexion();
localStorage.clear();
function fermer() {
  const boutonFermer = document.getElementById("closemodal");
  console.log(boutonFermer);
  const popupBack = document.querySelector(".popupBackground");
  const popupBack2 = document.querySelector(".popupBackground2");
  boutonFermer.addEventListener("click", function (event) {
    popupBack.style.display = "none";
    popupBack2.style.display = "none";
  });
}

function modifier() {
  const boutonModifier = document.getElementById("modif");
  const popupBack = document.querySelector(".popupBackground");
  boutonModifier.addEventListener("click", function (event) {
    event.preventDefault();
    popup1();
    fermer();
    trash();
    ajouter();
    fermerFenetre();
  });
}

async function trash() {
  const url = "http://localhost:5678/api/works/";
  const reponse = await fetch(url);
  const works = await reponse.json();
  console.log(works);

  // ----------------------------------------------------

  const figs = document.querySelectorAll(".fig");
  figs.forEach(function (fig) {
    const btnTrash = fig.querySelector("#trash");
    btnTrash.addEventListener("click", function () {
      const parentFig = btnTrash.closest("figure");
      parentFig.remove();
      console.log(works);
    });
  });
}
async function ajouter() {
  const url = "http://localhost:5678/api/works/";
  const reponse = await fetch(url);
  const works = await reponse.json();
  console.log(works);

  // ----------------------------------
  const boutonAjouter = document.querySelector(".btnpopup");
  const popupBack = document.querySelector(".popupBackground");
  const popupBack2 = document.querySelector(".popupBackground2");

  boutonAjouter.addEventListener("click", function (event) {
    event.preventDefault();
    popupBack.style.display = "none";
    popup2();
    ajouterphoto();
    valider();
    ajouterwork();
    fermer();
    fermerFenetre();
    b_return();
  });
}
function b_return() {
  const boutonReturn = document.getElementById("returnmodal");
  console.log(boutonReturn);
  const popupBack2 = document.querySelector(".popupBackground2");
  const popupBack = document.querySelector(".popupBackground");
  boutonReturn.addEventListener("click", function (event) {
    event.preventDefault();
    popupBack2.style.display = "none";
    alert("rrr");
    popup1();
    fermerFenetre();
    trash();
    ajouter();
    fermer();
  });
}

function fermerFenetre() {
  const popupBack = document.querySelector(".popupBackground");
  const popupBack2 = document.querySelector(".popupBackground2");
  popupBack.addEventListener("click", function (event) {
    if (event.target === popupBack) {
      popupBack.style.display = "none";
    }
  });
  popupBack2.addEventListener("click", function (event) {
    if (event.target === popupBack2) {
      popupBack2.style.display = "none";
    }
  });
}
function ajouterphoto() {
  const cadrePhotoFirst = document.querySelector(".cadrephotofirst");
  const ajoutPhoto = document.getElementById("ajoutphoto1");
  ajoutPhoto.addEventListener("change", function () {
    const file = this.files[0];
    const fileLenght = 1 * 1024 * 1024;
    if (file.size > fileLenght) {
      alert("la taille de l'image > 4Mo");
      return;
    }
    console.log(ajoutPhoto);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const cadrePhotoImg = document.getElementById("cadrephotoimg");
      cadrePhotoImg.src = imageUrl;
      cadrePhotoFirst.style.display = "none";
      cadrePhotoImg.style.display = "block";
    }
  });
}
function valider() {
  const cadrePhotoImg = document.getElementById("cadrephotoimg");
  const boutonValider = document.getElementById("valider");
  let titreAjout = document.getElementById("titre");
  const categorieAjout = document.getElementById("categorie");
  boutonValider.classList.add("gris");

  // Ajouter des écouteurs d'événements pour les champs de saisie
  cadrePhotoImg.addEventListener("input", verifajout);
  titreAjout.addEventListener("input", verifajout);
  categorieAjout.addEventListener("input", verifajout);

  function verifajout() {
    // Vérifier si tous les champs requis sont remplis
    if (
      cadrePhotoImg.value !== "" &&
      titreAjout.value !== "" &&
      categorieAjout.value !== ""
    ) {
      // Si oui, activer le bouton (rendre le texte vert)
      boutonValider.classList.add("vert");
      // boutonValider.classList.remove("gris"); // Rétablir la couleur par défaut

      // boutonValider.disabled = false;
    } else {
      // Sinon, désactiver le bouton (rendre le texte à sa couleur par défaut)
      boutonValider.classList.remove("vert");
      // Rétablir la couleur par défaut
      // boutonValider.disabled = true;
    }
  }
}
async function ajouterwork() {
  const url = "http://localhost:5678/api/works/";
  const reponse = await fetch(url);
  const works = await reponse.json();
  // genererWorks(works);

  console.log(works);
}

modifier();
