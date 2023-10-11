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
  id: 500,
  name: "Pinscher",
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

    test("POST /dogs debe asociar al Dog agregado los temperamentos como un array", async () => {
      const { dataValues } = await Dog.findOne({
        where: { id: sampleDog.id },
        include: Attitude,
      });
      expect(dataValues.Attitudes.length).toBe(10);
      expect(dataValues.Attitudes[0].name).toBe("Alert");
    });
  });
  describe("Rutas GET", () => {
    test("GET /dogs debe retornar TODOS los dogs", async () => {
      const result = await agent.get("/dogs");
      expect(result._body.length).toBeTruthy();
      expect(result._body.length).toBeGreaterThan(100);
    });

    test("GET /dogs debe retornar los dogs de la base de datos, y luego los de la API", async () => {
      await agent.post("/dogs").send(sampleDog);
      const result = await agent.get("/dogs");
      expect(result._body[0].id).toEqual(sampleDog.id);
      expect(result._body[1].id).toBe(1);
    });

    test("GET /dogs/name?='...' debe traer el dog que este por name y devolver un error en caso que no exista", async () => {
      const result = await agent.get('/dogs/name?="Barbet"');
      expect(result._body.name).toBe("Barbet");
      expect(result._body.id).toBe(26);
      expect(Object.keys(result._body).length).toBe(9);
      const result2 = await agent.get('/dogs/name?="Pepe"');
      expect(result2._body.error).toBeDefined();
    });

    test("GET /dogs/name?='...' debe traer un DOG de la base de datos si lo encuentra", async () => {
      const result = await agent.get('/dogs/name?="Pinscher"');
      expect(result._body.name).toBe("Pinscher");
      expect(result._body.id).toBe(500);
    });

    test("GET /dogs/:id debe traer un DOG de la API o base de datos por su id", async () => {
      const result = await agent.get("/dogs/13");
      expect(result._body.name).toBe("American Eskimo Dog (Miniature)");
      const result2 = await agent.get("/dogs/500");
      expect(result2._body.name).toEqual(sampleDog.name);
    });
  });
});
