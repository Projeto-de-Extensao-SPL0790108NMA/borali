import { fastifyCors } from "@fastify/cors"
import { fastifyJwt } from "@fastify/jwt"
import { fastifyMultipart } from "@fastify/multipart"
import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui"
import { fastify } from "fastify"
import { env } from "./env"
import { fastifyCookie } from "@fastify/cookie"
import { usersRoutes } from "./http/controllers/users/routes"
import { authRoutes } from "./http/controllers/auth/routes"
import { eventsRoutes } from "./http/controllers/events/routes"
import { ZodError } from "zod"
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod"
import { serializeDates } from "./utils/serialize-dates"

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  origin: [
    'http://localhost:3000',
    'https://boralimanaus.com.br',
    'https://www.boralimanaus.com.br'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Borali Backend',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'https://api.boralimanaus.com.br',
        description: 'Production server'
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false
  }
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(fastifyMultipart, {
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
})

app.addHook('preSerialization', async (_request, _reply, payload) => {
  if (payload && typeof payload === 'object') {
    return serializeDates(payload)
  }
  return payload
})

app.register(usersRoutes)
app.register(authRoutes)
app.register(eventsRoutes)

app.get('/health', async (_, reply) => {
  return reply
    .status(200)
    .send({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV
    })
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
