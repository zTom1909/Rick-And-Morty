const app = require("../src/app");
const session = require("supertest");
const agent = session(app);

const loginUsers = require("../src/utils/users");

describe("Test de Rutas", () => {
  describe("GET /rickandmorty/character/:id", () => {
    it("Responde con status: 200", async () => {
      const res = await agent.get("/rickandmorty/character/1");
      expect(res.statusCode).toBe(200);
    });

    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
      const res = await agent.get("/rickandmorty/character/1");
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("name");
      expect(res.body).toHaveProperty("species");
      expect(res.body).toHaveProperty("gender");
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("origin");
      expect(res.body).toHaveProperty("image");
    });

    it("Si hay un error responde con status: 500", async () => {
      const res = await agent.get("/rickandmorty/character/1124");
      expect(res.statusCode).toBe(500);
    });
  });

  describe("GET /rickandmorty/login", () => {
    const { email, password } = loginUsers[0];

    it("Si se envia la información correcta, retornará un objeto con una propiedad access en true", async () => {
      const res = await agent.get(`/rickandmorty/login?email=${email}&&password=${password}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("access");
      expect(res.body.access).toBeTruthy();
    });

    it("Si se envia la información incorrecta, retornará un objeto con una propiedad access en true", () => {
      const responsesArray = [
        agent.get(`/rickandmorty/login?email=${email}&&password=123`),
        agent.get(`/rickandmorty/login?email=asd&&password=${password}`),
        agent.get(`/rickandmorty/login?email=asd&&password=123`),
      ];

      Promise.all(responsesArray).then((responses) =>
        responses.forEach((res) => {
          expect(res.statusCode).toBe(400);
          expect(res.body).toHaveProperty("access");
          expect(res.body.access).toBeFalsy();
        })
      );
    });
  });

  describe("POST /rickandmorty/fav", () => {
    it("Lo que se envíe por body debe ser devuelto en un arreglo", async () => {
      const req = {
        id: 1,
        name: "Rick Sanchez",
      };

      const res = await agent.post("/rickandmorty/fav").send(req);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([req]);
    });

    it("Si vuelves a enviar un nuevo elemento por body, este debe ser devuelto en un arreglo que incluye un elemento enviado previamente.", async () => {
      const req1 = {
        id: 1,
        name: "Rick Sanchez",
      };
      const req2 = {
        id: 2,
        name: "Morty Smith",
      };

      const initialState = await agent.get("/rickandmorty/fav");

      const res = await agent.post("/rickandmorty/fav").send(req1);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([...initialState.body, req1]);

      const res2 = await agent.post("/rickandmorty/fav").send(req2);
      expect(res2.statusCode).toBe(200);
      expect(res2.body).toEqual([...res.body, req2]);
    });
  });

  describe("DELETE /rickandmorty/fav/:id", () => {
    it("Si no existe un personaje con el ID indicado, se retornará un array con los mismos personajes", async () => {
      const initialCharacters = await agent.get("/rickandmorty/fav");

      const res = await agent.delete("/rickandmorty/fav/50");
      expect(res.body).toEqual(initialCharacters.body);
    });

    it("Si existe un personaje con el ID indicado, se retornará un array con el personaje eliminado", async () => {
      const req2 = {
        id: 2,
        name: "Morty Smith",
      };

      const res = await agent.delete("/rickandmorty/fav/1");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([req2]);

      const res2 = await agent.delete("/rickandmorty/fav/2");
      expect(res2.statusCode).toBe(200);
      expect(res2.body).toEqual([]);
    });

    it("Si se utiliza DELETE /rickandmorty/fav/*, eliminar a todos los personajes", async () => {
      const charactersArray = [
        { id: 1, name: "Character 1" },
        { id: 2, name: "Character 2" },
        { id: 3, name: "Character 3" },
      ];

      const char1 = await agent
        .post("/rickandmorty/fav")
        .send(charactersArray[0]);
      expect(char1.statusCode).toBe(200);
      const char2 = await agent
        .post("/rickandmorty/fav")
        .send(charactersArray[1]);
      expect(char2.statusCode).toBe(200);
      const char3 = await agent
        .post("/rickandmorty/fav")
        .send(charactersArray[2]);
      expect(char3.statusCode).toBe(200);

      const getRes = await agent.get("/rickandmorty/fav");
      expect(getRes.statusCode).toBe(200);
      expect(getRes.body).toEqual(charactersArray);

      const res = await agent.delete("/rickandmorty/fav/*");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });
  });
});
