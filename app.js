const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
  res.send('Hello!')
})

server.listen(port, (err) => {
  if (err) console.error('Error::', err);

  console.log(`Server is listening on port ${port}`);
})