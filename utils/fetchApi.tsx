import Swal from "sweetalert2"

interface ParamsFetch {
  path: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: Record<string, any>
  alerts?: boolean
  customErrorFatal?: string
}
export interface HttpResponse<T> {
  message: string
  data: T
  status: number
  errors: string[]
}
export const fetchApi = async <T extends Record<string, any>>({
  path,
  data,
  method = 'GET',
  alerts = true,
  customErrorFatal,
}: ParamsFetch): Promise<T> => {
  try {
    const token = window.localStorage.getItem('token') ?? ''

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API!}${path}`, {
      method,
      headers: { authorization: `Bearer ${token}` },
      ...(data !== undefined && {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }),
    })
    const dataResponse: HttpResponse<T> = await response.json()

    const { status, errors, message, data: payload } = dataResponse
    if (errors && status === 400) {
      if (alerts) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errors[0],
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
      else {
        console.log(errors[0])
      }
      return {} as T
    }
    if (message && status >= 400) {
      if (alerts) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errors[0],
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
      else console.log(message)
      return {} as T
    }
    return payload
  } catch (error: any) {
    console.log(customErrorFatal ?? error.message)
    // alert(customErrorFatal ?? 'Error de comunicación con el servidor')
    throw error
  }
}
