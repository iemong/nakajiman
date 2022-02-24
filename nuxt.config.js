import { createClient } from 'contentful'
const path = require('path')
require('dotenv').config()

const client = createClient({
    space: process.env.NUXT_ENV_SPACE_ID,
    accessToken: process.env.NUXT_ENV_ACCESS_TOKEN
})

const fetchEntries = (content_type = 'post', options) =>
    client.getEntries({
        ...options,
        content_type
    })

module.exports = {
    ssr: false,
    target: 'static',
    generate: {
        fallback: true,
        async routes() {
            const posts = await fetchEntries()
            return [
                ...posts.items.map(post => ({
                    route: `/works/${post.sys.id}`
                }))
            ]
        }
    },
    /*
     ** Headers of the page
     */
    head: {
        title: 'KENTA NAKAJIMA',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=375' },
            { name: 'keywords', content: '' },
            {
                hid: 'description',
                name: 'description',
                content:
                    'デザイナーの中島健太のポートフォリオサイトです。ロジックとエモーションのバランスを大切にして、デザイン・設計を行っています。'
            },
            {
                hid: 'og:title',
                name: 'og:title',
                content: 'KENTA NAKAJIMA'
            },
            { hid: 'og:type', name: 'og:type', content: 'website' },
            {
                hid: 'og:url',
                name: 'og:url',
                content: 'kenta-nakajima.com'
            },
            {
                hid: 'og:site_name',
                name: 'og:site_name',
                content: 'website'
            },
            {
                hid: 'og:description',
                name: 'og:description',
                content:
                    'デザイナーの中島健太のポートフォリオサイトです。ロジックとエモーションのバランスを大切にして、デザイン・設計を行っています。'
            },
            {
                hid: 'og:image',
                name: 'og:image',
                content: 'kenta-nakajima.com/ogp.png'
            },
            {
                name: 'color-scheme',
                content: 'only light'
            }
        ],
        link: [
            { rel: 'icon', type: 'image/png', href: '/favicon_32x32.png' },
            {
                rel: 'apple-touch-icon',
                sizes: '152x152',
                href: '/apple-touch-icon-152x152.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                href: '/favicon_192x192.png',
                sizes: '192x192'
            }
        ]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },

    /*
     ** Global CSS
     */
    css: ['@/assets/stylus/base.styl'],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [],

    /*
     ** Nuxt.js modules
     */
    modules: [['@nuxtjs/style-resources'], ['@nuxtjs/dotenv']],

    styleResources: {
        stylus: ['~assets/stylus/base.styl']
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    },
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        root: path.resolve(__dirname),
        alias: {
            '@': path.resolve(__dirname),
            '~': path.resolve(__dirname)
        }
    }
}
