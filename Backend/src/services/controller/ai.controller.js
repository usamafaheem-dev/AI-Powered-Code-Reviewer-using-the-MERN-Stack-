
import genAiModel from "../ai.service.js"



export const aiReviewGet = async (req, res) => {
    try {
        const code = req.body.code;
        if (!code) {
            return res.status(404).send("code is required")
        }

        const response = await genAiModel(code)
        res.status(200).send({
            response: response,
            success: true
        })
    } catch (error) {
        res.status(500).send({
            error: error,
            success: false
        })
    }
}