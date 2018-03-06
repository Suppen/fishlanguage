"use strict";

/**************************
 * Import important stuff *
 **************************/

const path = require("path");
const webpack = require("webpack");

/**********************
 * The webpack config *
 **********************/

const webpackConfig = {
	mode: process.env.NODE_ENV === "production" ? "production" : "development",
	entry: path.join(__dirname, "src", "index.jsx"),
	output: {
		filename: "bundle.js",
		path: path.join(__dirname, "build")
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	],
	module: {
		rules: [
			{
				// CSS
				test: /\.css$/i,
				use: ["style-loader", "css-loader"]
			},
			{
				// SCSS
				test: /\.scss$/i,
				use: ["style-loader", "css-loader", "sass-loader"]
			},
			{
				// JS and JSX
				test: /\.jsx?$/i,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["react", "es2016"]
						}
					}
				]
			}
		]
	}
};

/*************
 * Export it *
 *************/

module.exports = webpackConfig;
