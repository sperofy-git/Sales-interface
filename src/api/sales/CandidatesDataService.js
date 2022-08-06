import axios from "axios";

class CandidatesDataService {

    executeAllCandidatesDS(name) {
        return axios.get(`http://localhost:8080/users/${name}/all_listCandidates`)
     }
 

}

export default new CandidatesDataService();