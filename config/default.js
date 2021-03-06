const { config } = require("dotenv");
config();

module.exports = {
  project: "web-onefx-boilerplate",
  server: {
    port: process.env.PORT || 4009,
    staticDir: "./dist",
    delayInitMiddleware: false,
    cookie: {
      secrets: ["insecure plain text", "insecure secret here"]
    },
    noSecurityHeadersRoutes: {
      "/api-gateway/": true,
      "/api/": true
    },
    noCsrfRoutes: {
      "/api-gateway/": true,
      "/api/": true
    }
  },
  ssm: {
    enabled: false
  },
  gateways: {
    logger: {
      enabled: true,
      level: "debug"
    }
  },
  analytics: {
    googleTid: "UA-43072488-3"
  },
  csp: {
    "default-src": ["none"],
    "manifest-src": ["self"],
    "style-src": [
      "self",
      "unsafe-inline",
      "https://fonts.googleapis.com/css",
      "https://use.fontawesome.com/releases/v5.0.13/",
      "https://translate.googleapis.com/",
      "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/",
      "https://checkout.stripe.com/v3/",
      "https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.4.2/tocbot.css"
    ],
    "frame-src": [
      "https://www.slideshare.net/",
      "https://checkout.stripe.com/"
    ],
    "connect-src": [
      "self",
      "https://checkout.stripe.com/api/",
      "https://tianpan.co/api-gateway/"
    ],
    "child-src": ["self"],
    "font-src": [
      "self",
      "https://fonts.gstatic.com/",
      "https://use.fontawesome.com/releases/v5.0.13/",
      "data: https://use.fontawesome.com/releases/v5.0.13/"
    ],
    "img-src": ["*"],
    "media-src": ["self"],
    "object-src": ["self"],
    "script-src": [
      "self",
      "https://www.google-analytics.com/",
      "https://translate.google.com/",
      "https://translate.googleapis.com/",
      "https://cdn.jsdelivr.net/particles.js/2.0.0/",
      "https://checkout.stripe.com/checkout.js",
      "https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.4.2/tocbot.min.js"
    ]
  },
  apiGatewayUrl:
    process.env.API_GATEWAY_URL || "http://localhost:4009/api-gateway/"
};
