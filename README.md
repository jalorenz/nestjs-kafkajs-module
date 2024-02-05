# nestjs-kafkajs-module

## Usage

```typescript
import { KafkajsModule } from "nestjs-kafkajs-module";
import { KafkaConfig } from "kafkajs";

const config: KafkaConfig = {
  clientId: "example",
  brokers: ["localhost:9092"],
};

@Module({
  imports: [
    KafkajsModule.register(config, "exampleConsumerGroup"),
  ],
})
export class AppModule {}
```

```typescript
import { Injectable } from "@nestjs/common";
import { InjectConsumer, InjectProducer } from "nestjs-kafkajs-module";
import { Consumer, Producer } from "kafkajs";

@Injectable()
class ExampleService {
    constructor(
      @InjectConsumer() private readonly consumer: Consumer,
      @InjectProducer() private readonly producer: Producer,
    ) {}
}
```

## Roadmap

- [x] Expose module to be able to inject Kafka.js producer and consumer in Nest.js application
- [ ] Add CI
- [ ] Add semantic versioning, publish to npm
- [ ] Build decorator for consumers
