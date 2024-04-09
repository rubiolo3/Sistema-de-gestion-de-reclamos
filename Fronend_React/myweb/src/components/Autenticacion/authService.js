const API_URL = 'http://localhost:8080/'; // Reemplaza con la URL de tu backend

// Función para realizar la autenticación y obtener el token
export const login = async (usuario, password) => {
  const requestBody = { usuario, password };
  console.log('Datos enviados al backend:', requestBody);

  const response = await fetch(`${API_URL}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (response.ok) {
    const token=await response.text();
    return token;
  } else {
    throw new Error('Credenciales inválidas');
  }
};