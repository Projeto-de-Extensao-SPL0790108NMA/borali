import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeVerifyCodeUseCase } from '@/use-cases/factories/make-verify-code-use-case'
import { InvalidVerificationCodeError } from '@/use-cases/errors/invalid-verification-code-error'
import { VerifyCodeBody } from './schema'

export async function verifyCode(
  request: FastifyRequest<{ Body: VerifyCodeBody }>,
  reply: FastifyReply
) {
  const { email, code } = request.body

  try {
    const verifyCodeUseCase = makeVerifyCodeUseCase()

    await verifyCodeUseCase.execute({
      email,
      code,
    })

    return reply.status(200).send()
  } catch (err) {
    if (err instanceof InvalidVerificationCodeError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
