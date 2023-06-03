/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	typescript: {
		// Necessary for building with nextauth due to authOptions being an invalid route export type
		// Remove once NextAuth (Auth.js moving forward) better integrates this with Next.js 13!
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
