import { genererWorks } from "./popup.js";
import { filtreBtn } from "./popup.js";
import { popup1 } from "./popup.js";
import { popup2 } from "./popup.js";
import { connexion } from "./popup.js";

//---------------------------RECUPERATION DES TRAVAUX DEPUIS LE BACKEND------------------------------
async function callApi() {
  const url = "http://localhost:5678/api/works/";
  const reponse = await fetch(url);
  // console.log(reponse);
  const works = await reponse.json();
  // console.log(works);
  genererWorks(works);
  callfiltre();

  async function callfiltre() {
    const url = "http://localhost:5678/api/categories/";
    const reponsef = await fetch(url);
    // console.log(reponsef);

    const categories = await reponsef.json();
    // console.log(categories);
    filtreBtn(categories);
    boutontous();
    boutonobjets();
    boutonappartements();
    boutonhotels_restaurants();
  }
  // -----------------gestion des boutons-------------------------

  function boutontous() {
    const boutonTous = document.querySelector(".btn_tous");
    boutonTous.addEventListener("click", function () {
      console.log("tt");
      genererWorks(works);
    });
  }
  function boutonobjets() {
    const boutonObjets = document.querySelector(".btn_objets");
    boutonObjets.addEventListener("click", function () {
      const worksObjets = works.filter(function (work) {
        return work.category.name === "Objets";
      });
      genererWorks(worksObjets);
    });
  }
  function boutonappartements() {
    const boutonAppartements = document.querySelector(".btn_appartements");
    boutonAppartements.addEventListener("click", function () {
      const worksAppartements = works.filter(function (work) {
        return work.category.name === "Appartements";
      });
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
      genererWorks(worksHotels_restaurants);
    });
  }
}
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
      console.log(imageUrl);
      const cadrePhotoImg = document.getElementById("cadrephotoimg");
      cadrePhotoImg.src = imageUrl;
      cadrePhotoFirst.style.display = "none";
      cadrePhotoImg.style.display = "block";
    }
  });
}
async function valider() {
  const boutonValider = document.getElementById("valider");
  const titreAjout = document.getElementById("titre");
  const categorieAjout = document.getElementById("categorie");
  const inputAjoutPhoto = document.getElementById("ajoutphoto1");
  const cadrePhotoImg = document.querySelector("#cadrephotoimg");

  boutonValider.classList.add("gris");
  titreAjout.addEventListener("change", verifajout);
  inputAjoutPhoto.addEventListener("change", verifajout);
  categorieAjout.addEventListener("change", verifajout);
  function verifajout() {
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

          localStorage.setItem("token", tokens);
          console.log(localStorage);
        } else {
          console.error("Erreur lors de la requête POST à l'API");
        }
      } catch (error) {
        console.error("Erreur lors de la requête POST à l'API:", error);
      }
    }
  });
}
const tokens = localStorage.getItem("token");

callApi();

connexion();
modifier();
