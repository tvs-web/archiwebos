import { popup0 } from "./popup.js";
import { popup1 } from "./popup.js";
import { popup2 } from "./popup.js";
// Récupération des pièces depuis l'API
await fetch("http://localhost:5678/api/works")
  .then(function (response) {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
  })
  .catch(function (error) {
    return;
  });
//Récupération des travaux  stockés dans le localStorage
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

//---------------implementation de la gallery dans le DOM---------------
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

//---------------------------RECUPERATION DES TRAVAUX DEPUIS LE BACKEND------------------------------
async function callApi() {
  const url = "http://localhost:5678/api/works/";
  const reponse = await fetch(url);
  const works = await reponse.json();
  genererWorks(works);
  popup0();
  boutontous();
  boutonobjets();
  boutonappartements();
  boutonhotels_restaurants();

  // -----------------gestion des boutons-------------------------

  function boutontous() {
    const boutonTous = document.querySelector(".btn_tous");
    boutonTous.addEventListener("click", function () {
      document.querySelector(".gallery").innerHTML = "";
      genererWorks(works);
    });
  }
  function boutonobjets() {
    const boutonObjets = document.querySelector(".btn_objets");
    boutonObjets.addEventListener("click", function () {
      const worksObjets = works.filter(function (work) {
        return work.category.name === "Objets";
      });
      document.querySelector(".gallery").innerHTML = "";
      genererWorks(worksObjets);
    });
  }
  function boutonappartements() {
    const boutonAppartements = document.querySelector(".btn_appartements");
    boutonAppartements.addEventListener("click", function () {
      const worksAppartements = works.filter(function (work) {
        return work.category.name === "Appartements";
      });
      document.querySelector(".gallery").innerHTML = "";
      genererWorks(worksAppartements);
    });
  }
  function boutonhotels_restaurants() {
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
}

callApi();
const tokens = localStorage.getItem("token");

function connexion() {
  // const tokens = localStorage.getItem("token");
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
    divMesProjets.classList.add("entete1");
    //changement de "login" en "logout" + redirection sur page index
    document.getElementById("login").innerHTML = "logout";

    document.getElementById("login").href = "index.html";

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
  const popupBack = document.querySelector(".popupBackground");
  const popupBack2 = document.querySelector(".popupBackground2");
  boutonFermer.addEventListener("click", function (event) {
    popupBack.style.display = "none";
    popupBack2.style.display = "none";
  });
}

function modifier() {
  localStorage.getItem("token");

  const boutonModifier = document.getElementById("modif");
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
  const figs = document.querySelectorAll(".fig");
  figs.forEach(function (fig) {
    const btnTrash = fig.querySelector("#trash");
    btnTrash.addEventListener("click", async function () {
      const parentFig = btnTrash.closest("figure");
      parentFig.remove();
      const workId = works.find(
        (work) => work.imageUrl === fig.querySelector("img").src
      ).id;
      try {
        const trashResponse = await fetch(
          `http://localhost:5678/api/works/${workId}`,
          {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + tokens,
            },
          }
        );

        if (trashResponse.ok) {
          alert("Projet supprimé avec succès !!");
          const trashResponseData = await trashResponse.text();
          const token = trashResponseData.token;
          // mise à jour localStorage
          localStorage.setItem("token", tokens);
        } else {
          console.error("Erreur lors de la requête DELETE à l'API");
        }
      } catch (error) {
        console.error("Erreur lors de la requête DELETE à l'API:", error);
      }
    });
  });
}
async function ajouter() {
  const url = "http://localhost:5678/api/works/";
  const reponse = await fetch(url);
  const boutonAjouter = document.querySelector(".btnpopup");
  const popupBack = document.querySelector(".popupBackground");

  boutonAjouter.addEventListener("click", function (event) {
    event.preventDefault();
    popupBack.style.display = "none";
    popup2();
    ajouterphoto();
    valider();
    fermer();
    fermerFenetre();
    b_return();
  });
}
function b_return() {
  const boutonReturn = document.getElementById("returnmodal");
  const popupBack2 = document.querySelector(".popupBackground2");
  const popupBack = document.querySelector(".popupBackground");

  boutonReturn.addEventListener("click", function (event) {
    event.preventDefault();
    popupBack2.style.display = "none";
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
    const fileLenght = 4 * 1024 * 1024;
    if (file.size > fileLenght) {
      alert("la taille de l'image > 4Mo");
      return;
    }
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const cadrePhotoImg = document.getElementById("cadrephotoimg");
      cadrePhotoImg.src = imageUrl;
      cadrePhotoFirst.style.display = "none";
      cadrePhotoImg.style.display = "block";
    }
  });
}
async function valider() {
  const boutonValider = document.getElementById("valider");
  let titreAjout = document.getElementById("titre");
  const categorieAjout = document.getElementById("categorie");
  const inputAjoutPhoto = document.getElementById("ajoutphoto1");
  const cadrePhotoImg = document.querySelector("#cadrephotoimg");

  boutonValider.classList.add("gris");
  titreAjout.addEventListener("change", verifajout);
  inputAjoutPhoto.addEventListener("change", verifajout);
  categorieAjout.addEventListener("change", verifajout);
  function verifajout() {
    ajouterphoto();

    if (
      titreAjout.value !== "" &&
      categorieAjout.value !== "" &&
      cadrePhotoImg.src !== ""
    ) {
      boutonValider.classList.add("vert");
    } else {
      boutonValider.classList.remove("vert");
    }
  }
  boutonValider.addEventListener("click", async function () {
    if (boutonValider.classList.contains("vert")) {
      const title = titreAjout.value;
      const image = inputAjoutPhoto.files[0];
      const categorie = categorieAjout.value;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", categorie);
      formData.append("image", image);
      try {
        const response = await fetch("http://localhost:5678/api/works", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + tokens,
          },
          body: formData,
        });
        if (response.ok) {
          alert("Projet ajouté avec succès !!");

          const responseData = await response.json();
          const token = responseData.token;
          localStorage.setItem("token", tokens);
        } else {
          console.error("Erreur lors de la requête POST à l'API");
        }
      } catch (error) {
        console.error("Erreur lors de la requête POST à l'API:", error);
      }
    }
  });
}

modifier();
