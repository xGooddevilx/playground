import fs from "fs";
import http from "http";
import url from "url";
import slugify from "slugify";

const replaceTemplate = (temp, product) => {
	let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
	output = output.replace(/{%IMAGE%}/g, product.image);
	output = output.replace(/{%PRICE%}/g, product.price);
	output = output.replace(/{%FROM%}/g, product.from);
	output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
	output = output.replace(/{%QUANTITY%}/g, product.quantity);
	output = output.replace(/{%DESCRIPTION%}/g, product.description);
	output = output.replace(/{%SLUG%}/g, product.slug);

	if (!product.organic)
		output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
	return output;
};

const tempOverview = fs.readFileSync(
	"./templates/template-overview.html",
	"utf-8"
);
const tempCard = fs.readFileSync("./templates/template-card.html", "utf-8");
const tempProduct = fs.readFileSync(
	"./templates/template-product.html",
	"utf-8"
);

const dataJson = fs.readFileSync("./data.json", "utf-8");
const dataObject = JSON.parse(dataJson);
const data = dataObject.map(product => ({
	...product,
	slug: slugify(product.productName, { lower: true }),
}));

const server = http.createServer((req, res) => {
	const { query, pathname } = url.parse(req.url, true);

	if (pathname === "/" || pathname === "/overview") {
		res.writeHead(200, { "content-type": "text/html" });

		const productCards = data
			.map(item => replaceTemplate(tempCard, item))
			.join("");
		const pageOutput = tempOverview.replace("{%PRODUCT_CARDS%}", productCards);

		res.end(pageOutput);
	} else if (pathname === "/product") {
		const productData = data.find(item => item.slug === query.slug);
		const productOutput = replaceTemplate(tempProduct, productData);

		res.writeHead(200, { "content-type": "text/html" });
		res.end(productOutput);
	} else {
		res.writeHead(404, { "content-type": "text/html" });
		res.end("<h1>Page Not Found | 404 </h1>")
	}
});

server.listen(3000, "localhost", () => {
	console.log("Server is listening on host 3000");
});
