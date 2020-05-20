
class Model {
    findByID(id, Dictionary) {
        var iter = 0;
        for (var key of Dictionary.keys()) {
            if (iter === id) {
                return key;
            }
            iter++;
        }
    }

    getVariants(size, Dictionary, trueV){
        var variants = new Array();
        var insert = Math.floor(Math.random() * Math.floor(size));
        for(var i = 0; i < size; i++){
            if(i === insert){
                variants[i] = trueV;
            }
            else{
                var temp = Math.floor(Math.random() * Math.floor(Dictionary.size));
                variants[i] = Dictionary.get(this.findByID(temp, Dictionary));
            }
        }
        return variants;
    }

    getRandomId(Dictionary){
        return Math.floor(Math.random() * Math.floor(Dictionary.size));
    }
}
export default Model