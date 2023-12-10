import express from 'express'
import { getRooms, getRoomsById, createRoom, uploads } from '../controllers/RoomControllers.js'

const router = express.Router()

router.get('/', getRooms)
router.get('/:id', getRoomsById)
router.post('/create', uploads.single('file'),createRoom)

export default router;