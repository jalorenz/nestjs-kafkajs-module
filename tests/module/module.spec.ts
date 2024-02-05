import { Test } from "@nestjs/testing";
import { InjectConsumer, InjectProducer, KafkajsModule } from "../../lib/main";
import { Consumer, Producer } from "kafkajs";
import { KAFKAJS_MODULE_CONSUMER, KAFKAJS_MODULE_PRODUCER } from "../../lib/module/kafkajs-module";
import { Injectable } from "@nestjs/common";

jest.mock("kafkajs", () => ({
  Kafka: jest.fn().mockImplementation(() => ({
    producer: jest.fn().mockImplementation(() => ({
      connect: jest.fn(),
    })),
    consumer: jest.fn().mockImplementation(() => ({
      connect: jest.fn(),
    })),
  })),
}));

describe("KafkajsModule", () => {
  describe("Importing the module", () => {
    let producer: Producer;
    let consumer: Consumer;

    beforeAll(async () => {
      jest.clearAllMocks();

      const moduleRef = await Test.createTestingModule({
        imports: [
          KafkajsModule.register(
            {
              brokers: ["localhost:9092"],
            },
            "test-consumer",
          ),
        ],
      }).compile();

      consumer = moduleRef.get(KAFKAJS_MODULE_CONSUMER);
      producer = moduleRef.get(KAFKAJS_MODULE_PRODUCER);
    });

    it("consumer should be exported", () => {
      expect(consumer).toBeDefined();
    });

    it("producer should be exported", () => {
      expect(producer).toBeDefined();
    });
  });

  describe("Decorators", () => {
    @Injectable()
    class ExampleService {
      constructor(
        @InjectConsumer() public readonly consumer: Consumer,
        @InjectProducer() public readonly producer: Producer,
      ) {}
    }

    let exampleService: ExampleService;

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [
          KafkajsModule.register(
            {
              brokers: ["localhost:9092"],
            },
            "test-consumer",
          ),
        ],
        providers: [ExampleService],
      }).compile();

      exampleService = moduleRef.get(ExampleService);
    });

    it("consumer should be injected", () => {
      expect(exampleService.consumer).toBeDefined();
    });

    it("producer should be injected", () => {
      expect(exampleService.producer).toBeDefined();
    });
  });
});
