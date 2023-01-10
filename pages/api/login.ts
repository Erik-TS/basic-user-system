import fs from 'fs/promises'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const reqBody = JSON.parse(req.body)
    const login = {
        email: reqBody.email,
        password: reqBody.password
    }

    const fileChunk = await fs.readFile("./dataset/users.json", 'utf-8')
    const users = JSON.parse(fileChunk)
    let found = false

    for (let u of users) {
        if (u.email == login.email && u.password == login.password) {
            const response = JSON.stringify(u)
            found = true
            res.status(200).send(response)
            break
        }
    }

    if(!found) res.status(400).send("User wasn't found!")
}