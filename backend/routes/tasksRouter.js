const tasksController = require('../controllers/tasksController')
const router = require("express").Router();


router.post('/',tasksController.createTask);
router.post('/remove', tasksController.removeTask);
router.post('/deleteall', tasksController.deleteAll);
router.get('/', tasksController.getTasks);

module.exports = router;