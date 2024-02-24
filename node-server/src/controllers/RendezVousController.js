const { getRendezVous,createRendezVous, count, findRendezVousById } = require("../services/RendezVousService");

class RendezVousController {
  async getRendezVous(req, res) {
    const params = req.params;
    try {
      const data = await getRendezVous(params.pageNumber,params.pageSize,params.id);
      const nombreRendezVous = await count(params.id)
      const nombrePage = Math.ceil(nombreRendezVous/params.pageSize)
      res.json({ message: 'GET request successful', data, nombrePage});
    } catch (error) {
      console.error('Error in getService:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  createRendezVous(req,res){
    const body = req.body
    try{
        const rendezVous = createRendezVous(body);
        res.json({ message: 'POST request successful', rendezVous });
    } catch(error){
      console.error('Error in getService:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async findRendezVousById(req,res){
    const params = req.params;
    try{
        const rendezVous = await findRendezVousById(params.id);
        // console.log(rendezVous)
        res.json({ message: 'GET request successful', rendezVous });
    } catch(error){
      console.error('Error in getService:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  
  }
}

module.exports = new RendezVousController();
