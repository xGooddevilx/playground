import fs from "fs";

fs.writeFile("hello-world.txt", "Hello world", error => {
	if (error) {
		console.log("\x1b[31m%s\x1b[0m", "Failed to create the file");
		console.error(error);
        return;
	}
    console.log('File created successfully!')
});




fs.writeFileSync('goodbye-world','Goodbye world')
console.log('File created successfully synchronously');

