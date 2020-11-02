const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')
const fs = require('fs')
const { type } = require('os')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

let port = 4000
    
io.on('connect', socket => {
    try {
        const data = fs.readFileSync('./data/NFL_20190106_LAC@BAL.gt', 'UTF-8');
        let lines = data.split(/\r?\n/);
        // start of the game
        lines = lines.slice(2145)
        setInterval(() => {
            if (typeof lines != 'undefined' && lines.length) {
                const line = lines.shift();
                console.log('Processing ', line.substr(0, 120)+'...');
                if (typeof line != 'undefined') {
                    const obj = JSON.parse(line)
                    io.emit(obj.topic, {'message' : line})
                }
            }
        }, 1500, lines);
    }
    catch (e) {
        console.log(e);
    }
})

nextApp.prepare().then(() => {
    app.get('*', (req, res) => {
        return nextHandler(req, res);
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
