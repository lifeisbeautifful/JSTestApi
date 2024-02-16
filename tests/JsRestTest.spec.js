const {test, chromium, Page, BrowserContext, expect} = require("@playwright/test")
import CRUDTestUserData from "./CRUDTestData";

test.describe.serial("CRUD operations positive tests", () => {
    
    test("Get user data", async({request}) => {
        let result = await request.get("https://reqres.in/api/users/2");
        let resultJson = await result.json();

        let resData = await resultJson.data;
        let resSupport = await resultJson.support;

        expect(result.ok()).toBeTruthy();
        expect(result.status()).toEqual(200);
        expect(resData.id).toEqual(2);
        expect(resData.email).toEqual("janet.weaver@reqres.in");
        expect(resData.first_name).toEqual("Janet");
        expect(resData.last_name).toEqual("Weaver");
        expect(resData.avatar).toEqual("https://reqres.in/img/faces/2-image.jpg");
        expect(resSupport).toEqual(expect.objectContaining({
            "url": "https://reqres.in/#support-heading",
            "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
        }))
    })


    test("Successful registration", async({request}) => {
        let registerUrl = new CRUDTestUserData().registerUrl;
        let registerUserCreds = new CRUDTestUserData().registerUserCreds.data;
        let response = new CRUDTestUserData().registerUserCreds.response;

        let result = await request.post(registerUrl,registerUserCreds);
        let resData = await result.json();
  
        expect(result.status()).toEqual(200);
        expect(resData).toEqual(expect.objectContaining(response))
    })

    test("Update user", async({request}) => {
        let updateData = new CRUDTestUserData().updateUserData;

        let result = await request.put("https://reqres.in/api/users/2", updateData.request)
        let resultJson = await result.json();

        expect(result.ok()).toBeTruthy();
        expect(result.status()).toEqual(200);
        expect(resultJson).toEqual(expect.objectContaining(updateData.request.data));
    })

    test("Delete user", async({request}) => {
        let result = await request.delete("https://reqres.in/api/users/2");
        
        expect(result.status()).toBe(204);
        expect(result.statusText()).toEqual("No Content");
        expect(result.data).toBeUndefined();
    })
})