// await fetch("http://localhost:5678/api/users/login")
//   .then(function (response) {
//     if (response.status !== 200) {
//       throw new Error(response.status);
//     }
//   })
//   .catch(function (error) {
//     console.log("Erreur:", error);
//     return;
//   });

console.log(fetch(" http://localhost:5678/api/works"));
function identification() {
  const identifiant = document.getElementById("myLogin");
  identifiant.addEventListener("submit", async function (event) {
    event.preventDefault();
    const identifiant = {
      email: document.getElementById("email").value,
      motDePasse: document.getElementById("mdp").value,
    };
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    console.log(identifiant);
    console.log(identifiant.motDePasse.length);
    if (
      identifiant.motDePasse.length < 8 ||
      !emailRegExp.test(identifiant.email)
    ) {
      // alert("Erreur dans l’identifiant ou le mot de passe");
      return;
    } else {
      const chargeUtile = JSON.stringify(identifiant);
      console.log(chargeUtile);
      try {
        const response = await fetch("http://localhost:5678/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: chargeUtile,
        });
        console.log(response);
        if (response.ok) {
          const responseData = (await response).text();
          console.log(responseData);
          window.location.href = "index.html";
        } else {
          console.log(response);

          console.error("erreur lors de la requête:", response.status);
          alert("Erreur dans l’identifiant ou le mot de passe");
        }
      } catch (error) {
        console.error("Erreur lors de la requête", error);
        alert("Erreur dans l’identifiant ou le mot de passe");
      }
    }
    // localStorage.setItem("mot de passe", motDePasse);
    // localStorage.setItem("email", email);
  });
}
identification();

// ----------------------------------------------------------------
// function identification() {
//   const identifiant = document.getElementById("myLogin");
//   identifiant.addEventListener("submit", async function (event) {
//     event.preventDefault();

//     let email = document.getElementById("email").value;
//     let motDePasse = document.getElementById("mdp").value;
//     let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");

//     if (motDePasse.length < 8 || !emailRegExp.test(email)) {
//       alert("Erreur dans l’identifiant ou le mot de passe");
//       return;
//     } else {
//       window.location.href = "index.html";
//     }

//     localStorage.setItem("mot de passe", motDePasse);
//     localStorage.setItem("email", email);
//   });
// }
// identification();
