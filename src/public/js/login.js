const form = document.getElementById('loginForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key) => obj[key] = value);
    fetch('api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            result.json()
                .then(json => {
                    console.log(); ("Login realizado con exito!");
                    localStorage.setItem('authToken', json.access_token);
                    localStorage.setItem('USER_ID', json.id);
                    console.log(document.cookie);
                    alert("Login realizado con exito!");
                    window.location.replace('/users');
                    console.log("Cookies generadas:");


                })
        } else if (result.status === 401) {
            console.log(result);
            alert("Login invalido revisa tus credenciales!");
        }
    })

})