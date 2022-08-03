import axios from "axios";

class CandidatesDataService {

    executeAllCandidatesDS() {
        return axios.get('http://localhost:8080/all_listCandidates')
     }
 

}

export default new CandidatesDataService();