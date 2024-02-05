import { Inject } from "@nestjs/common";
import { KAFKAJS_MODULE_CONSUMER } from "../module/kafkajs-module";

export const InjectConsumer = () => Inject(KAFKAJS_MODULE_CONSUMER);
