import request from "supertest";
import app from "../../app/app";

describe("GIven a non esisting endpot", () => {
  describe("when blabla", () => {
    test("then it should rspind 404 endo", async () => {
      const response = await request(app).get("/unknowk-endpoint").expect(404);

      const body = response.body as { error: string };

      expect(body.error).toBe("Endpoint not found");
    });
  });
});
