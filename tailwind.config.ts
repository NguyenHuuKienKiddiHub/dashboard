// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                primary: '#18AD4A',
                // Tự đặt tên cho dải màu của bạn, ví dụ 'kiddihub'
                kiddihub: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#18AD4A',
                    500: '#18AD4A', // <--- MÀU CHÍNH CỦA BẠN NẰM Ở MỨC 500
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                    950: '#052e16',
                }
            }
        }
    }
}