import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Desabilita ESLint durante o build para evitar erros de configuração
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Continua verificando tipos durante o build
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
