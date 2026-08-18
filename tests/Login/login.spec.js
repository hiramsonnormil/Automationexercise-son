import test from "playwright/test";
import { SetupBeforeach } from "../../utils/beforeEach/beforeEach";
import { signup } from "../../helpers/accounts/signup";
import { Login } from "../../helpers/accounts/login";
import { incorrectCredentialCase } from "../../helpers/accounts/test-case/cases_acounts";

SetupBeforeach()

test("create acount", async({page})=>{
    await signup(page)
})

test("login", async({page})=>{
    await Login(page)
})

test("case 002, incorrect credential login", async({page})=>{
    await incorrectCredentialCase(page)
})
