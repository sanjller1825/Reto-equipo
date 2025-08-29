import dotenv from dotenv

const apiKey = process.env.API_KEY;
const button = document.getElementById("buscar");

button.addEventListener("click", () => {
  const ciudad = document.getElementById("ciudad").value.trim();

  if (!ciudad) {
    document.getElementById("resultado").innerHTML = "<p>⚠️ Ingresa una ciudad.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)}&appid=${apiKey}&units=metric&lang=es`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("Respuesta API:", data); // Para depuración

      if (data.cod === "404") {
        document.getElementById("resultado").innerHTML = "<p>❌ Ciudad no encontrada.</p>";
      } else if (data.cod === 401) {
        document.getElementById("resultado").innerHTML = "<p>❌ API Key inválida.</p>";
      } else if (data.cod === 200) {
        document.getElementById("resultado").innerHTML = `
          <h3>${data.name}, ${data.sys.country}</h3>
          <p>🌡️ Temperatura: ${data.main.temp}°C</p>
          <p>☁️ Clima: ${data.weather[0].description}</p>
        `;
      } else {
        document.getElementById("resultado").innerHTML = "<p>⚠️ Error desconocido al obtener datos.</p>";
      }
    })
    .catch(err => {
      console.log("Error fetch:", err);
      document.getElementById("resultado").innerHTML = "<p>⚠️ Error al obtener datos. Revisa la consola.</p>";
    });
});
/*
    button.addEventListener("click", () => {
      const ciudad = document.getElementById("ciudad").value;
      if (!ciudad) {
        document.getElementById("resultado").innerHTML = "<p>⚠️ Ingresa una ciudad.</p>";
        return;
      }

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`)
        .then(res => res.json())
        .then(data => {
          if (data.cod === "404") {
            document.getElementById("resultado").innerHTML = "<p>❌ Ciudad no encontrada.</p>";
            return;
          }
          document.getElementById("resultado").innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>🌡️ Temperatura: ${data.main.temp}°C</p>
            <p>☁️ Clima: ${data.weather[0].description}</p>
          `;
        })
        .catch(err => {
          document.getElementById("resultado").innerHTML = "<p>⚠️ Error al obtener datos.</p>";
          console.log(err);
        });
    });*/