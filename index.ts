//import express, { Request, Response } from 'express'
import * as express from 'express'
import {Request, Response} from 'express'

const app = express()
const port = 3000

const HTTP_STATUSES = {
  OK_200 : 200,
  CREATED_201 : 201,
  NO_CONTENT_204 : 204,
  BAD_REQUEST_400 : 400,
  NOT_FOUND_404 : 404
}

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

const db = {
    styles : [
        {id: 1, title: 'Heavy Metal Rock'},
        {id: 2, title: 'Hard Rock'},
        {id: 3, title: 'Blues'},
        {id: 4, title: 'Classical Music'}
    ]
}

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!!! ')
})

app.get('/samurai', (req, res) => {
    res.send('Hello Samurai!!!!')
  })

app.get('/styles', (req, res) => { 
  const foundStyle = db.styles.
  filter(c => c.title.indexOf(req.query.title as string) > -1)
  if(!req.body.title){
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }
  res.json(foundStyle)
  
  }) 
  
  app.get('/styles:id', (req, res) => {
    const foundStyle =db.styles.find(c => c.id === +req.params.id)
    res.json(foundStyle)
  })
   


app.post('/styles', (req, res) => {
  if(!req.body.title){
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    return
  }

  const createdStyle = {      
    id: +(new Date()),
    title: req.body.title
  }
    db.styles.push(createdStyle)
    res
      .status(HTTP_STATUSES.CREATED_201)
      .json(createdStyle)
  })  

app.delete('/styles:id', (req, res) => {
    const foundStyle =db.styles.filter(c => c.id !== +req.params.id)

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
  })
  
app.put('/styles:id', (req, res) => {
  if(!req.body.title){
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    return
  }
    const foundStyle =db.styles.find(c => c.id === +req.params.id)
    

    if(!foundStyle){
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
      return
    }  
    foundStyle.title = req.body.title
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})  
     

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
