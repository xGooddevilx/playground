import fs from "fs";

fs.writeFile("hello-world.txt", "Hello world", error => {
	if (error) {
		console.log("\x1b[31m%s\x1b[0m", "Failed to create the file");
		console.error(error);
		return;
	}
	console.log("File created successfully!");
});

const textContent = fs.readFileSync("hello-world.txt", "utf-8");
fs.writeFileSync("goodbye-world.txt", `This is input text = ${textContent}`);

fs.readFile("./hello-world.txt", "utf-8", (error, data) => {
	if (error) return;
    fs.writeFile('./goodbye-world.txt','Content of this file is changed!!',"utf-8",(error)=>{
        if(error) console.log('Failed to write in the file');
    })
});
