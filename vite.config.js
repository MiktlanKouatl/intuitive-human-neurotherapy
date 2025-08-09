import { defineConfig } from 'vite'

export default defineConfig({
  // base: '/intuitive-brain-map/' // descomentar si se despliega en un subdirectorio
  server: {
    host: true // Abre el servidor en la red local
  },
  build: {
    outDir: '../dist', // Coloca los archivos de build en una carpeta dist/ en la raíz del proyecto
    emptyOutDir: true, // Limpia el directorio de salida antes de construir
    sourcemap: true // Genera sourcemaps para depuración
  }
});
