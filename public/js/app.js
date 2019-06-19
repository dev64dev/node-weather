console.log("Client side JAVASCRIPT...");

fetch('http://localhost:3000?address=boston').then((response)=>{
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            console.log(data.location);
            console.log(data.forecast);
        }
    });
});