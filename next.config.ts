import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // (Optional) Export as a standalone site
    // See https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files
    output: 'standalone', // Feel free to modify/remove this option
    
    // Webpack configuration to handle transformers library
    webpack: (config, { isServer }) => {
        // Don't run transformers on the server
        if (isServer) {
            config.externals.push('@xenova/transformers');
        } else {
            // Client-side configuration
            config.resolve.alias = {
                ...config.resolve.alias,
                "sharp$": false,
                "onnxruntime-node$": false,
            };
        }
        return config;
    },
    
    // Indicate that these packages should not be bundled by webpack
    experimental: {
        serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
        // Better ESM support
        esmExternals: 'loose',
    },
};