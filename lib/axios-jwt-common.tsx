import axios from 'axios'
import { getSession } from 'next-auth/react'

export const ApiClient = () => {
    const instance = axios.create()
    instance.interceptors.request.use(async (request) => {
        const session = await getSession()

        if (session) {
            request.headers.common = {
                Authorization: `${session.accessToken}`
            }
        }
        return request
    })

    instance.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            console.log(`error`, error)
        }
    )

    return instance
}


