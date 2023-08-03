const app = require('express')
const router = app.Router()

const { CreateCategory , CategoryByID , CategoryByName , deletecategory , updateCategory} = require("./controller")

router.post('/createCategory', CreateCategory)
router.get('/categorybyid/:CategoryId',CategoryByID)
router.get('/categorybyname/:CategoryName',CategoryByName)
router.delete('/deletecategory/:_id', deletecategory)
router.put('/updatecategory/:_id', updateCategory)

module.exports = router;