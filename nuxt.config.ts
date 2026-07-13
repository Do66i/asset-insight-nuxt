// nuxt.config.ts

export default defineNuxtConfig({
    compatibilityDate: '2026-06-18',

    future: {
        compatibilityVersion: 4,
    },

    css: [
        '@/assets/css/main.scss',
    ],

    modules: [
        '@nuxt/eslint',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate'
    ],

    // 설명: 특정 주소 진입 시 서버 단 SSR을 차단하고 pure CSR 모드로 구동시키는 라우트 규칙 설계
    routeRules: {
        '/login': { ssr: false },
        '/signup': { ssr: false },
        '/portfolio/**': { ssr: false },
    },

    pinia: {
        storesDirs: ['./app/stores/**'],
    },

    piniaPluginPersistedstate: {},
    devtools: { enabled: true },

    vite: {
        optimizeDeps: {
            include: [
                '@vue/devtools-core',
                '@vue/devtools-kit',
            ]
        }
    }
});
