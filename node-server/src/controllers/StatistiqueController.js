const { tempsMoyenTravailEmploye } = require("../services/StatistiqueService");


class StatistiqueController {
    async tempsMoyenTravailEmploye(req, res) {
        try {
            const data = await tempsMoyenTravailEmploye();
            res.status(200).json({
                data
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new StatistiqueController();
