import { Request } from "express"

interface TypedRequest<T> extends Request {
  body: T
}

export { TypedRequest }
