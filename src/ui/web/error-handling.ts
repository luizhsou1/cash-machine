import { NextFunction, Request, Response } from 'express'

interface HttpErrorReturn {
  error: string
  message: string
  stack: string | undefined
}

const mapError = (err: Error): HttpErrorReturn => ({
  error: err.name,
  message: err.message,
  stack: process.env.NODE_ENV === 'prod' ? err.stack : undefined
})

export const errorHandling = (err: any, req: Request, res: Response, next: NextFunction): Response => {
  if (process.env.NODE_ENV === 'prod') {
    delete err.stack
  }

  if (err.name === 'ValidationError') {
    return res.status(422).json(mapError(err))
  }

  // Erros da camada de infra/repository, devem ser tratados/modificados para PesistenceError,
  // devendo ser retornado erro 500, por isso não tem 'if' para este tipo de erro.
  return res.status(500).json(mapError(err))
}
