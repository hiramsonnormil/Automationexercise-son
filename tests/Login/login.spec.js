import test from "playwright/test";
import { SetupBeforeach } from "../../utils/beforeEach/beforeEach";
import { signup } from "../../helpers/accounts/signup";
import { Login } from "../../helpers/accounts/login";
import { incorrectCredentialCase, logoutWithoutUserIdCase } from "../../helpers/accounts/test-case/cases_acounts";

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


test("login in logout ", async({page})=>{
    await Login(page, true)
})

test("case 003, logout without user session", async({page})=>{
    await logoutWithoutUserIdCase(page)
})


test("case 4 , already email case", async({page})=>{
    await signup(page,{EmailExistCase:true})
})

