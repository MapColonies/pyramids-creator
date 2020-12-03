import { InternalServerError } from './errors';

export class KafkaError extends InternalServerError {
  public constructor(error: Error) {
    super(error);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, KafkaError.prototype);
  }
}

export class KafkaConnectionError extends KafkaError {
  public constructor(message: string, stack?: string) {
    super({
      name: 'ERR_KAFKA_CONNECTION',
      message: `Failed to connect to kafka: ${message}`,
      stack,
    });

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, KafkaConnectionError.prototype);
  }
}

export class KafkaSendError extends KafkaError {
  public constructor(
    messageTokafka: string,
    errorMessage: string,
    errorStack?: string
  ) {
    super({
      name: 'ERR_KAFKA_MESSAGE',
      message: `Failed to send message to kafka: ${errorMessage}. Message=${messageTokafka}`,
      stack: errorStack,
    });

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, KafkaSendError.prototype);
  }
}

export class KafkaDisconnectError extends KafkaError {
  public constructor(message: string, stack?: string) {
    super({
      name: 'ERR_KAFKA_DISCONNECT',
      message: `Failed to disconnect from kafka: ${message}`,
      stack,
    });

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, KafkaDisconnectError.prototype);
  }
}
