import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // (Optional) Export as a standalone site
    // See https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files
    output: 'standalone', // Feel free to modify/remove this option
    serverExternalPackages: ['sharp', 'onnxruntime-node'],
};

export default nextConfig;