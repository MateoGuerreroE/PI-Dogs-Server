const { sequelize, Dog, Attitude, dog_attitude } = require("../src/DB/db");

describe("INICIALIZACION", () => {
  describe("Conexion a la base de datos", () => {
    test("Debe establecer correctamente la conexion", async () => {
      try {
        await sequelize.authenticate();
        expect(true).toBe(true);
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });

    test("La base de datos existe y permite realizar operaciones", async () => {
      try {
        await sequelize.query("SELECT 1 + 1");
        expect(true).toBe(true);
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
  });
});

describe("MODELOS", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });
  const sampleDog = {
    id: 1,
    name: "Pepe",
    height: "12",
    weight: "12",
    life_span: "12",
    image: "sample.jpg",
  };

  const sampleAttitude = { id: 5, name: "Juicioso" };

  describe("Los modelos estan creados correctamente", () => {
    test("El modelo Dog esta creado", () => {
      const Dog = sequelize.models.Dog;
      expect(Dog).toBeDefined();
    });
    test("El modelo Dog tiene las propiedades adecuadas", async () => {
      const newDog = await Dog.build(sampleDog);
      const newDogkeys = [
        "id",
        "name",
        "height",
        "weight",
        "life_span",
        "image",
      ];
      expect(Object.keys(newDog.toJSON())).toEqual(newDogkeys);
    });
    test("En caso de un valor no permitido en Dog, NO debe insertar, y debe responder con un mensaje de error", async () => {
      try {
        let newDog = { ...sampleDog, id: "pepe" };
        await Dog.create(newDog);
      } catch (error) {
        expect((await Dog.findAll()).length).toBe(0);
        expect(error.message).toBeDefined();
      }
      try {
        let newDog = { ...sampleDog, life_span: { is: "not much" } };
        await Dog.create(newDog);
      } catch (error) {
        expect((await Dog.findAll()).length).toBe(0);
        expect(error.message).toBeDefined();
      }
      try {
        let newDog = { ...sampleDog, image: null };
        await Dog.create(newDog);
      } catch (error) {
        expect((await Dog.findAll()).length).toBe(0);
        expect(error.message).toBe(
          "notNull Violation: Dog.image cannot be null"
        );
      }
    });
    test("El modelo Attitude esta creado", () => {
      const Attitude = sequelize.models.Attitude;
      expect(Attitude).toBeDefined();
    });
    test("El modelo Attitude tiene las propiedades adecuadas", async () => {
      const newAttitude = await Attitude.build(sampleAttitude);
      const attitudeKeys = ["id", "name"];
      expect(Object.keys(newAttitude.toJSON())).toEqual(attitudeKeys);
      expect(newAttitude.name).toEqual("Juicioso");
    });
    test("En caso de un valor no permitido en Attitude, NO debe insertar, y debe responder con un mensaje de error", async () => {
      try {
        let newAttitude = { ...sampleAttitude, id: "Michael" };
        await Attitude.create(newAttitude);
      } catch (error) {
        expect((await Attitude.findAll()).length).toBe(0);
        expect(error.message).toBeDefined();
      }
      try {
        let newAttitude = { ...sampleAttitude, name: null };
        await Attitude.create(newAttitude);
      } catch (error) {
        expect((await Attitude.findAll()).length).toBe(0);
        expect(error.message).toBe(
          "notNull Violation: Attitude.name cannot be null"
        );
      }
    });
  });

  describe("RELACIONES", () => {
    afterAll(async () => {
      await sequelize.sync({ force: true });
    });
    test("Debe existir una tabla relacional entre Dogs y Attitudes con el nombre dog_attitude", () => {
      const dog_attitude = sequelize.models.dog_attitude;
      expect(dog_attitude).toBeDefined();
    });
    test("La relacion entre Dog y Attitude debe ser Many to Many", async () => {
      try {
        await Attitude.create({ id: 1, name: "Docil" });
        await Attitude.create({ id: 2, name: "Jugueton" });
        let result = await Dog.create(sampleDog);
        await result.addAttitudes([1, 2]);
        let relationTable = await dog_attitude.findAll();
        expect(relationTable.length).toBe(2);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
