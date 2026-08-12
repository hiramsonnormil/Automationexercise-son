import test, { expect } from "playwright/test";

async function verifyAllProduct(page) {
    const productCount = await page.locator('.single-products').count()

    return productCount
}

async function listAllProduct(page) {
    // Verify that home page is visible successfully
    try {
        await expect(page.getByRole('link', {name : 'home'}))
        console.log("home page sucessful rendering")
    } catch (error) {
        console.log('for some reason the home page the home page is not rendering')
    }

    await page.getByRole('link', {name: "products"}).click()

   // count product card

   const qntProduct = verifyAllProduct(page)

   if(qntProduct > 10){
      console.log('minimum product rendering trully')
   }else(error)=>{
    throw new Error(error)
   }
   
}