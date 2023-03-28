import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        include: ['/**/*.test.ts'],
        /**
         * not to ESM ported packages
         */
        exclude: [
            'dist', '.idea', '.git', '.cache',
            '**/node_modules/**',
        ]
    }
})