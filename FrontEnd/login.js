console.log(fetch(" http://localhost:5678/api/works"));
function identification() {
  const identifiant = document.getElementById("myLogin");
  const msgError = document.createElement("p");
  msgError.classList.add("msgerror");
  const sub = document.getElementById("sub");
  identifiant.appendChild(msgError);
  identifiant.insertBefore(msgError, sub);

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

      // identifiant.password === ""
      // email.value === ""
    ) {
      msgError.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
      // identifiant.appendChild(msgError);
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
          const token = responseData.token;
          console.log(token);
          localStorage.setItem("token", token);

          window.location.href = "index.html";
        } else {
          console.log(response);
          console.error("erreur lors de la requête:", response.status);
          msgError.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
          // identifiant.appendChild(msgError);
          // alert("Erreur dans l’identifiant ou le mot de passe");
        }
      } catch (error) {
        console.error("Erreur lors de la requête", error);
        // alert("Erreur dans l’identifiant ou le mot de passe");
        msgError.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
      }
    }
  });
}
identification();
// ---------------------------------------
// const msgError = document.createElement("p");
// msgError.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
// identifiant.appendChild(msgError);
