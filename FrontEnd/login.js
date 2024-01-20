// console.log(fetch(" http://localhost:5678/api/works"));
function identification() {
  const identifiant = document.getElementById("myLogin");
  const msgError = document.createElement("p"); /*p+msg si cond non ok(else)*/
  msgError.classList.add("msgerror");
  const sub = document.getElementById("sub"); /* id du bouton se connecter*/
  identifiant.appendChild(msgError); /*appartenace à "myLogin"*/
  identifiant.insertBefore(msgError, sub); /*position msg erreur dans"myLogin"*/

  identifiant.addEventListener("submit", async function (event) {
    event.preventDefault();
    const identifiant = {
      email: document.getElementById("email").value,
      password: document.getElementById("mdp").value,
    };
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    if (
      identifiant.password !== "S0phie" ||
      !emailRegExp.test(identifiant.email)
    ) {
      msgError.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
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
        }
      } catch (error) {
        console.error("Erreur lors de la requête", error);

        msgError.innerHTML = "Erreur de connexion";
      }
    }
  });
}
identification();
