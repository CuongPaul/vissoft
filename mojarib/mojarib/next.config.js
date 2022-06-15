/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};
const { i18n } = require("./i18n.config");

module.exports = {
    nextConfig,
    i18n,
};
