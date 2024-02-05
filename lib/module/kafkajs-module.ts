import { DynamicModule, Module } from "@nestjs/common";
import { Kafka, KafkaConfig } from "kafkajs";

const KAFKAJS_MODULE_KAFKA = "KAFKAJS_MODULE_KAFKA";
export const KAFKAJS_MODULE_PRODUCER = "KAFKAJS_MODULE_PRODUCER";
export const KAFKAJS_MODULE_CONSUMER = "KAFKAJS_MODULE_CONSUMER";

@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class KafkajsModule {
  static register(config: KafkaConfig, consumerGroup: string): DynamicModule {
    return {
      module: KafkajsModule,
      providers: [
        {
          provide: KAFKAJS_MODULE_KAFKA,
          useFactory: async () => {
            return new Kafka(config);
          },
        },
        {
          provide: KAFKAJS_MODULE_PRODUCER,
          useFactory: async (kafka: Kafka) => {
            const producer = kafka.producer();
            await producer.connect();
            return producer;
          },
          inject: [KAFKAJS_MODULE_KAFKA],
        },
        {
          provide: KAFKAJS_MODULE_CONSUMER,
          useFactory: async (kafka: Kafka) => {
            const consumer = kafka.consumer({ groupId: consumerGroup });
            await consumer.connect();
            return consumer;
          },
          inject: [KAFKAJS_MODULE_KAFKA],
        },
      ],
      exports: [KAFKAJS_MODULE_PRODUCER, KAFKAJS_MODULE_CONSUMER],
    };
  }
}
