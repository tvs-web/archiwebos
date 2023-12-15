export function popup1() {
  const main = document.querySelector("main");
  const popupBack = document.createElement("div");
  popupBack.classList.add("popupBackground");
  const popup = document.createElement("div");
  popup.classList.add("popup");
  const popupIcones = document.createElement("div");
  popupIcones.classList.add("popupicones");
  const returnModal = document.createElement("button");
  returnModal.id = "returnmodal";
  const returnIcone = document.createElement("i");
  returnIcone.classList.add("fa-solid", "fa-arrow-left", "fa-2xl");
  const closeModal = document.createElement("button");
  closeModal.id = "closemodal";
  const closeIcone = document.createElement("i");
  closeIcone.classList.add("fa-solid", "fa-xmark", "fa-2xl");
  const title1 = document.createElement("h2");
  title1.textContent = "Galerie photo";

  const projects = document.querySelector("#portfolio .gallery");
  const cloneProjects = projects.cloneNode(true);
  cloneProjects.classList.add("newdispo");
  const popupBtn = document.createElement("input");
  popupBtn.type = "submit";
  popupBtn.value = "Ajouter une photo";
  popupBtn.classList.add("btnpopup");
  const trash = document.createElement("button");
  trash.id = "trash";
  console.log(cloneProjects);

  main.appendChild(popupBack);
  main.insertBefore(popupBack, main.firstChild);
  popupBack.appendChild(popup);
  popup.appendChild(popupIcones);
  popupIcones.appendChild(returnModal);
  returnModal.appendChild(returnIcone);
  popupIcones.appendChild(closeModal);
  closeModal.appendChild(closeIcone);
  popup.appendChild(title1);

  popup.appendChild(cloneProjects);
  popup.appendChild(popupBtn);
  cloneProjects.appendChild(trash);
}
export function popup2() {
  const main = document.querySelector("main");
  const popupBack2 = document.createElement("div");
  popupBack2.classList.add("popupBackground2");
  const title2 = document.createElement("h2");
  title2.textContent = "Ajout photo";

  const popup2 = document.createElement("div");
  popup2.classList.add("popup2");
  const popupIcones = document.createElement("div");
  popupIcones.classList.add("popupicones");
  const returnModal = document.createElement("button");
  returnModal.id = "returnmodal";
  const returnIcone = document.createElement("i");
  returnIcone.classList.add("fa-solid", "fa-arrow-left", "fa-2xl", "ajout");
  const closeModal2 = document.createElement("button");
  closeModal2.id = "closemodal";
  const closeIcone = document.createElement("i");
  closeIcone.classList.add("fa-solid", "fa-xmark", "fa-2xl");
  const cadrePhoto = document.createElement("div");
  cadrePhoto.classList.add("cadrephoto");
  const cadrePhotoFirst = document.createElement("div");
  cadrePhotoFirst.classList.add("cadrephotofirst");
  const imgIcone = document.createElement("i");
  imgIcone.classList.add("fa-regular", "fa-image");
  const btnAjoutPhoto = document.createElement("div");
  btnAjoutPhoto.id = "btnajoutphoto";
  const ajoutPhoto = document.createElement("label");
  ajoutPhoto.setAttribute("for", "ajoutphoto1");
  ajoutPhoto.id = "ajoutphoto";
  ajoutPhoto.textContent = "+ Ajout photo";
  const inputAjoutPhoto = document.createElement("input");
  inputAjoutPhoto.setAttribute("type", "file");
  inputAjoutPhoto.setAttribute("id", "ajoutphoto1");
  inputAjoutPhoto.setAttribute("value", "+ Ajout photo");
  inputAjoutPhoto.setAttribute("accept", "image/png, image/jpeg");
  const cadrePhotoText = document.createElement("p");
  cadrePhotoText.textContent = "jpg, png : 4 mo max";
  const cadrePhotoImg = document.createElement("img");
  cadrePhotoImg.id = "cadrephotoimg";
  // cadrePhotoImg.src = "./images/";
  cadrePhotoImg.alt = "image selectionnée";
  const formAjoutPhoto = document.createElement("form");
  formAjoutPhoto.id = "formAjoutPhoto";
  const labelTitre = document.createElement("label");
  labelTitre.setAttribute("for", "titre");
  labelTitre.textContent = "Titre";
  const titreInput = document.createElement("input");
  titreInput.setAttribute("type", "text");
  titreInput.setAttribute("id", "titre");
  titreInput.setAttribute("name", "titre");
  const labelCategorie = document.createElement("label");
  labelCategorie.setAttribute("for", "categorie");
  labelCategorie.textContent = "Catégorie";
  const categorieInput = document.createElement("select");
  categorieInput.setAttribute("id", "categorie");
  categorieInput.setAttribute("type", "text");
  categorieInput.setAttribute("name", "categorie");
  const optionCategorieInput = document.createElement("option");
  optionCategorieInput.value = "";
  const optionCategorieInput1 = document.createElement("option");
  optionCategorieInput1.textContent = "Objets";
  const optionCategorieInput2 = document.createElement("option");
  optionCategorieInput2.textContent = "Appartements";
  const optionCategorieInput3 = document.createElement("option");
  optionCategorieInput3.textContent = "Hotels & restaurants";
  const popupBtnAjout = document.createElement("button");
  popupBtnAjout.id = "valider";
  popupBtnAjout.textContent = "Valider";

  main.appendChild(popupBack2);
  main.insertBefore(popupBack2, main.firstChild);
  popupBack2.appendChild(popup2);
  popup2.appendChild(popupIcones);
  popupIcones.appendChild(returnModal);
  popupIcones.appendChild(closeModal2);
  returnModal.appendChild(returnIcone);
  closeModal2.appendChild(closeIcone);
  popup2.appendChild(title2);
  popup2.appendChild(cadrePhoto);
  cadrePhoto.appendChild(cadrePhotoFirst);
  cadrePhotoFirst.appendChild(imgIcone);
  cadrePhotoFirst.appendChild(cadrePhotoText);
  cadrePhotoFirst.appendChild(btnAjoutPhoto);
  btnAjoutPhoto.appendChild(ajoutPhoto);
  btnAjoutPhoto.appendChild(inputAjoutPhoto);
  cadrePhoto.appendChild(cadrePhotoImg);
  cadrePhotoFirst.appendChild(btnAjoutPhoto);
  cadrePhotoFirst.insertBefore(btnAjoutPhoto, cadrePhotoText);

  popup2.appendChild(formAjoutPhoto);
  formAjoutPhoto.appendChild(labelTitre);
  formAjoutPhoto.appendChild(titreInput);
  formAjoutPhoto.appendChild(labelCategorie);
  formAjoutPhoto.appendChild(categorieInput);
  categorieInput.appendChild(optionCategorieInput);
  categorieInput.appendChild(optionCategorieInput1);
  categorieInput.appendChild(optionCategorieInput2);
  categorieInput.appendChild(optionCategorieInput3);
  popup2.appendChild(popupBtnAjout);
}
