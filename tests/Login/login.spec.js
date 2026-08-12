import test from "playwright/test";
import { SetupBeforeach } from "../../utils/beforeEach/beforeEach";
import { login } from "../../helpers/accounts/signup";

SetupBeforeach()

test("create acount", async({page})=>{
    await login(page)
})

