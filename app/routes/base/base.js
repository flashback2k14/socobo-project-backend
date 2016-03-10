module.exports = function(express) {
  var base = express.Router();
  
  base.get("/", function(req, res) {
    console.log("Socobo Project Backend is ready to Rock!");
    res.send("Socobo Project Backend is ready to Rock!");
  });
  
  return base;
}