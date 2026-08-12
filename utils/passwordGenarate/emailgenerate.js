function emailRandom(length = 6) {
    const caracteres =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

    let numbers = "";
    const email = "@gmail.com";


    for (let i = 0; i < length; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        numbers += caracteres[indice];
    }
    const emailgen = numbers + email
    console.log(`the generate password is ${emailgen}`)
    return emailgen
}

export{emailRandom}