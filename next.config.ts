import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	sassOptions: {
		additionalData: `$var: red;`,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "40ad8e7c-peleton.s3.timeweb.cloud",
				// port: '', // можно удалить, если не используется
				// pathname: '/**', // раскомментируйте если нужны все пути
			},
		],
	},
};

export default nextConfig;
