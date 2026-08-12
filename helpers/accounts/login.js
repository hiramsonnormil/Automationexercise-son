import test from "playwright/test";
import { expect } from "playwright/test";
import { configDotenv } from "dotenv";
import { ECDH } from "node:crypto";
configDotenv()

const locators = (page) => {
    return {
        input_email: page.locator('[data-qa="login-email"]'),
        input_password: page.locator('[data-qa="login-password"]'),
    };
};

async function Login(page) {
    const urlLogin = page.getByRole('link', { name: 'Login' })
    await urlLogin.click()
    const locator = locators(page);
    await page.waitForLoadState("load");
    await locator.input_email.fill(process.env.EMAIL)
    await locator.input_password.fill(process.env.PASSWORD)

    await page.locator('[data-qa="login-button"]').click()

    // verificando se o login foi feito com sucesso, usando o locator de href="/logout" que so aparece com conta logado

    try {
        await expect(page.getByRole('link', { name: 'logout' })).toBeVisible();
        console.log("Login completed successfully")
    } catch (error) {
        throw new error("For some reason, the login process was not completed successfully")
    }
}

export{Login}