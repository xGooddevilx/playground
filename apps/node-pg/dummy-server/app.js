import http from 'http'

const server = http.createServer((req,res)=>{
    res.setHeader('Content-type',"text/plain") // it would be default content type
    res.end('Hello Nodejs')
})


server.listen(3000,"localhost",()=>{
    console.log('Server is listening on port 3000');
})

