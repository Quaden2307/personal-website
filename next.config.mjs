/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent the site from being embedded in iframes (clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          // Prevent browsers from MIME-sniffing responses
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Don't leak full URLs to external sites you link to
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // The site doesn't use camera/mic/location — say so explicitly
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
