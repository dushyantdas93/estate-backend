import express from "express"
const router = express.Router()

router.get("/test", (req, res) => {
    res.send("its works!")
    console.log("router works")
    
}
)

export default router