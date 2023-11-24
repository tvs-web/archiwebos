console.log(fetch(" http://localhost:5678/api/works"));
function identification() {
  const identifiant = document.getElementById("myLogin");
  identifiant.addEventListener("submit", async function (event) {
    event.preventDefault();
    const identifiant = {
      email: document.getElementById("email").value,
      password: document.getElementById("mdp").value,
    };
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    console.log(identifiant);
    console.log(identifiant.password.length);
    if (
      identifiant.password.length < 4 ||
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
          const responseData = await response.json();
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
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMDQ3ODcyNiwiZXhwIjoxNzAwNTY1MTI2fQ.oX-BCV6NVvJ85ByZHxFR2mg0aNt51X7uoZHHAcpbS1I";
    localStorage.setItem("token", token);
    console.log(token);
    // localStorage.setItem("password", password);
    // localStorage.setItem("email", email);
  });
}
identification();
// ---------------------------------------

// ----------------------------------------------------------------
// function identification() {
//   const identifiant = document.getElementById("myLogin");
//   identifiant.addEventListener("submit", async function (event) {
//     event.preventDefault();

//     let email = document.getElementById("email").value;
//     let password = document.getElementById("mdp").value;
//     let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");

//     if (password.length < 8 || !emailRegExp.test(email)) {
//       alert("Erreur dans l’identifiant ou le mot de passe");
//       return;
//     } else {
//       window.location.href = "index.html";
//     }

//     localStorage.setItem("mot de passe", password);
//     localStorage.setItem("email", email);
//   });
// }
// identification();
