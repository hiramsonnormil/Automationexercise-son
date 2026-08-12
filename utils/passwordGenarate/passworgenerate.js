function passwordRandom(length = 12) {
    const caracteres =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

    let senha = "";

    for (let i = 0; i < length; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[indice];
    }
    console.log(`the generate password is ${senha}`)
    return senha;
}

export{passwordRandom}