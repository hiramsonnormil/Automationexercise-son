import { test } from '@playwright/test';
import { passwordRandom } from '../../utils/passwordGenarate/passworgenerate';
import { emailRandom } from '../../utils/passwordGenarate/emailgenerate';
import { expect } from '@playwright/test';

const accountLocator = (page) => ({
    url: page.getByRole('link', { name: 'Login' }),

    input_name: page.locator('[data-qa="signup-name"]'),
    input_email: page.locator('[data-qa="signup-email"]'),
    input_bnt: page.locator('[data-qa="signup-button"]'),

    // Account Information
    titleMr: page.locator('[data-qa="title"]').nth(0),
    titleMrs: page.locator('[data-qa="title"]').nth(1),

    name: page.locator('[data-qa="name"]'),
    email: page.locator('[data-qa="email"]'),
    password: page.locator('[data-qa="password"]'),

    // Date of Birth
    day: page.locator('[data-qa="days"]'),
    month: page.locator('[data-qa="months"]'),
    year: page.locator('[data-qa="years"]'),

    // Options
    newsletter: page.locator("#newsletter"),
    specialOffers: page.locator("#optin"),

    // Address Information
    firstName: page.locator('[data-qa="first_name"]'),
    lastName: page.locator('[data-qa="last_name"]'),
    company: page.locator('[data-qa="company"]'),
    address: page.locator('[data-qa="address"]'),
    address2: page.locator('[data-qa="address2"]'),
    country: page.locator('[data-qa="country"]'),
    state: page.locator('[data-qa="state"]'),
    city: page.locator('[data-qa="city"]'),
    zipcode: page.locator('[data-qa="zipcode"]'),
    mobileNumber: page.locator('[data-qa="mobile_number"]'),

    // Submit
    createAccount: page.locator('[data-qa="create-account"]'),
});

async function AddresInformation(page, city= "my city", country = "Canada", firstName = "my first name", lastName = "my last name", company = "my company", address = "my address", address2 = "my address2", state = "my state", zipcode = "12345", mobileNumber = "1234567890") {
    const accountlocationInfo = accountLocator(page);
    await accountlocationInfo.firstName.type(firstName)
    await accountlocationInfo.lastName.type(lastName)
    await accountlocationInfo.company.type(company)
    await accountlocationInfo.address.type(address)
    await accountlocationInfo.address2.type(address2)
    await accountlocationInfo.country.selectOption(country)
    await accountlocationInfo.state.type(state)
    await accountlocationInfo.city.type(city)
    await accountlocationInfo.zipcode.type(zipcode)
    await accountlocationInfo.mobileNumber.type(mobileNumber)
}

async function isUserEmaiAlreadyExits(page) {
    const emailAlreadyExits = page.getByText("Email Address already exist");
    return await emailAlreadyExits.isVisible()

}
async function loginsucess(page) {
    await expect(page).toHaveURL(/account_created/);

    const success = page.locator('[data-qa="account-created"]');

    await expect(success).toBeVisible();
    await expect(success).toContainText('Account Created!');
    await expect(success).toHaveCSS('color', 'rgb(0, 128, 0)');
}

async function signup(page,{ identity="male", day=1, month = 2, year=2004,newsletter = true, EmailExistCase = false} ={}) {
    const account = accountLocator(page);
    await account.url.click();

    await account.input_name.type("my name")

    if(EmailExistCase){
        await account.input_email.type(process.env.EMAIL)
        await account.input_bnt.click()
        const emailExist = await isUserEmaiAlreadyExits(page)

        if(emailExist == true){
            console.log("email already exist, stop test continuation")
            return
        }
    } else {
        await account.input_email.type(emailRandom())
    }

    await account.input_bnt.click()

    if(identity != "male"){
        await account.titleMrs.click()
    }await account.titleMr.click()

    await account.password.type(passwordRandom())

    await account.day.selectOption(String(day))
    await account.month.selectOption(String(month))
    await account.year.selectOption(String(year))

   if(newsletter != true){
     console.log("declined newsletter")
   } await account.newsletter.click()

   await account.specialOffers.click()

   await AddresInformation(page)

   await account.createAccount.click()
   await loginsucess(page)
}


export { signup };