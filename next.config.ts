import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // i18n: {
  //   locales: ["en", "vi"],
  //   defaultLocale: "vi",
  // },
 
  /* config options here */
  images:{
    remotePatterns:[{
      protocol:"https",
      hostname:"cdn.sanity.io"
      },
      
    ],
    
    
  },

  
};

export default nextConfig;
