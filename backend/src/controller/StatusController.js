import Status from "../model/StatusModel.js";

export default class StatusController {
    static async getAllStatus(req, res, next) {
        try {
            const statuss = await Status.find({})
            return res.status(200).json({
                statuss,
                status: 200
            })
        }
        catch (err) {
            return res.status(500).json({
                message : `Fail when get all role : ${err}`
            })
        }
    }

    static async addStatus(req, res, next) {
        try 
        {
            const {name} = req.body
            const status = new Status({
                name
            })
            await status.save()
            return res.status(201).json({
                status : 201,
                status
            })
        }
        catch(err)
        {
            return res.status(500).json({
                message : `Fail when add status : ${err}`
            })
        }
    }
}