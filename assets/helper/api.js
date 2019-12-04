import { createClient } from 'contentful'


const client = createClient({
    space: process.env.NUXT_ENV_SPACE_ID,
    accessToken: process.env.NUXT_ENV_ACCESS_TOKEN
})

export const fetchEntries = (content_type='post') =>
    client.getEntries({
        content_type
    })