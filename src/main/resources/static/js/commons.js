export async function requestHTTP(url, method, params) {
    const response = await fetch(url, {
        method: method,
        body: params,
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    });
    
    if(response.status === 403) {
        alert("Token invalido");
        await fetch("./logout");
        location.href = "./mylogin";
        return;
    }

    const data = await response.json();

    return data;
}