export async function logout() {
  try {
    localStorage.setItem("sessionExpired", "true");
    
    await fetch("/api/logout", { method: "POST", credentials: "include" });

    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  } catch (error) {
    console.error("Erro ao tentarlogout automático:", error);
    window.location.href = "/login";
  }
}
