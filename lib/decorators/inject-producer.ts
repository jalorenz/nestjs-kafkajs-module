import { Inject } from "@nestjs/common";
import { KAFKAJS_MODULE_PRODUCER } from "../module/kafkajs-module";

export const InjectProducer = () => Inject(KAFKAJS_MODULE_PRODUCER);
