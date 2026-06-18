export default defineNuxtConfig({
    compatibilityDate: '2026-06-18',
    css: [
        '@/assets/scss/main.scss',
    ],
    modules: [
        '@nuxt/eslint',
        '@pinia/nuxt',
    ],
    devtools: {enabled: true},
    // vite 최적화 설정 추가
    vite: {
        optimizeDeps: {
            include: [
                '@vue/devtools-core',
                '@vue/devtools-kit',
            ]
        }
    }
})
