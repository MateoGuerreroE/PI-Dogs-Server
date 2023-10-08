const { sequelize, Attitude, Dog } = require("../src/DB/db");
const server = require("../src/server");
const session = require("supertest");
const agent = session(server);

const sampleDog = {
  weight: {
    imperial: "75 - 110",
    metric: "34 - 50",
  },
  height: {
    imperial: "22 - 27",
    metric: "56 - 69",
  },
  id: 210,
  name: "Rottweiler",
  bred_for: "Cattle drover, guardian, draft",
  breed_group: "Working",
  life_span: "8 - 10 years",
  temperament:
    "Steady, Good-natured, Fearless, Devoted, Alert, Obedient, Confident, Self-assured, Calm, Courageous",
  reference_image_id: "r1xXEgcNX",
  image: {
    id: "r1xXEgcNX",
    width: 736,
    height: 595,
    url: "https://cdn2.thedogapi.com/images/r1xXEgcNX.jpg",
  },
};

describe("RUTAS TEMPERAMENTS", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });
  describe("Rutas GET", () => {
    test("GET /temperaments agrega desde la API los temperamentos a la base de datos", async () => {
      try {
        await agent.get("/temperaments").expect(200);
        const result = await Attitude.findAll();
        expect(Boolean(result.length)).toBe(true);
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
    test("GET /temperaments agrega desde la API los temperamentos a la base de datos sin repetir y en orden alfabetico", async () => {
      try {
        const result = await Attitude.findAll();
        expect(result.length).toBe(124);
        expect(result[0].name).toBe("Active");
        expect(result[65].name).toBe("Inquisitive");
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
  });
});

describe("ROUTAS DOGS", () => {
  describe("Ruta POST", () => {
    test("POST /dogs debe tomar los datos del body y crear un nuevo Dog en la base de datos", async () => {
      await agent.post("/dogs").send(sampleDog).expect(200);
      const result = await Dog.findAll();
      expect(result[0].name).toEqual(sampleDog.name);
    });
  });
});
