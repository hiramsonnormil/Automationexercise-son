import { expect } from "playwright/test";

/** steps
 * 
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'Login to your account' is visible
6. Enter incorrect email address and password
7. Click 'login' button
8. Verify error 'Your email or password is incorrect!' is visible
 */
// case 1 incorrect credential login

async function incorrectCredentialCase(page) {
  const locators = (page) => {
        return {
            linkLogin: page.getByRole('link', { name: 'Login' }),
            input_email: page.locator('[data-qa="login-email"]'),
            input_password: page.locator('[data-qa="login-password"]'),
        };
    };

    const locator = locators(page)
    await locator.linkLogin.click()
    try {
        await expect(page.getByText("Login to your account")).toBeVisible()
        await locator.input_email.type(process.env.EMAIL)
        await locator.input_password.type(process.env.INCORECTPASSWORD)
    } catch (error) {
        throw new Error("for some reason the login text is not visible" + error)
    }

    await page.locator('[data-qa="login-button"]').click()

    await expect(page.getByText("Your email or password is incorrect!")).toBeVisible()
    console.log("case pass")
}

async function logoutWithoutUserIdCase(page) {
    const response = await page.goto(`${process.env.SITE}/logout`)

    expect(response).not.toBeNull()
    expect(response.status()).toBeLessThan(500)
    await expect(page).not.toContainText("KeyError")
}




export{
    incorrectCredentialCase,
    logoutWithoutUserIdCase
}