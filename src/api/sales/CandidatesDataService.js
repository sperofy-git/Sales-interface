import axios from "axios";

class CandidatesDataService {

    executeAllCandidatesDS(name) {
        return axios.get(`http://localhost:8080/users/${name}/all_listCandidates`)
     }

     removeCandidate(name,id) {
        return axios.delete(`http://localhost:8080/users/${name}/candidates/${id}`)
     }
 

}

export default new CandidatesDataService();