import ModelRoom from "../models/ModelRoom.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.nama + '-' + file.originalname);
    }
})

export const uploads = multer({storage: storage});

export const getRooms = async(req, res) => {
    try {
        const response = await ModelRoom.findAll();

        if(!response[0]) return res.status(404).json({message: "Room masih kosong!"});

        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getRoomsById = async(req, res) => {
    try {
        const response = await ModelRoom.findAll({where: {id_room: req.params.id}});

        if(!response[0]) return res.status(404).json({message: "Room masih kosong!"});

        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createRoom = async(req, res) => {
    try {
       const {nama, desc, harga} = req.body;
       if(nama === '') return res.status(400).json({message: 'Nama room tidak boleh kosong!'})
       if(desc === '') return res.status(400).json({message: 'Desc room tidak boleh kosong! '})
       if(harga === '') return res.status(400).json({message: 'Harga tidak boleh kosong!'})

       if(req.file){
        await ModelRoom.create({
            nama_room: nama,
            desc_room: desc,
            harga: harga,
            image: `${req.protocol}://${req.get('host')}/public/images/${req.file.filename}`
        })
       }

       return res.status(201).json({message: "Room berhasil di simpan!"})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}