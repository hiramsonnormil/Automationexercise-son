import test from "playwright/test";
import { SetupBeforeach } from "../../utils/beforeEach/beforeEach";
import { signup } from "../../helpers/accounts/signup";
import { Login } from "../../helpers/accounts/login";

SetupBeforeach()

test("create acount", async({page})=>{
    await signup(page)
})

test("login", async({page})=>{
    await Login(page)
})

