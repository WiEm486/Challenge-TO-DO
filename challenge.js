const HandleLocalStorage = (key, value, time) => {
  const currentTime = new Date().getTime();
  const expirationTime = currentTime + time;

  // Stocker la valeur et le temps d'expiration dans le localStorage
  window.localStorage.setItem(key, JSON.stringify({ value, expirationTime }));

  // Définir un timeout pour supprimer la clé lorsque le temps d'expiration est atteint
  setTimeout(() => {
    const item = JSON.parse(window.localStorage.getItem(key));
    if (item && new Date().getTime() >= item.expirationTime) {
      window.localStorage.removeItem(key);
    }
  }, time);
};

// Test de la fonction
HandleLocalStorage("year", "2024", 7000);

// Récupérer la valeur de "year" après 2 secondes (le temps d'expiration est inférieur à 2 secondes, donc la valeur devrait être supprimée)
setTimeout(() => {
  console.log(window.localStorage.getItem("year")); // Doit afficher null car la valeur a été supprimée après 7 secondes
}, 2000);
