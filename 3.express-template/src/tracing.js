import { NodeSDK } from '@opentelemetry/sdk-node'
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc'

import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { MongooseInstrumentation } from '@opentelemetry/instrumentation-mongoose'

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG)

const sdk = new NodeSDK({
    serviceName: 'students-api',
    traceExporter: new OTLPTraceExporter({
        url: 'http://localhost:4317',
        compression: 'gzip'
    }),
    instrumentations: [
      new MongooseInstrumentation(),
      new HttpInstrumentation(),
      // new MongoDBInstrumentation()
    ]
})

//encerrando quando houver qualquer fechamento da aplicação
process.on('beforeExit', async () => {
  await sdk.shutdown()
})

export const initializeTracing = async () => {
  return sdk.start()
}