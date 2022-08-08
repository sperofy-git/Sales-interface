import axios from "axios";

class CandidatesDataService {

    executeAllCandidatesDS(userName) {
        return axios.get(`http://localhost:8080/users/${userName}/all_listCandidates`)
     }

     getCandidateService(userName,id) {
        return axios.get(`http://localhost:8080/users/${userName}/candidates/${id}`)
     }

     removeCandidate(userName,id) {
        return axios.delete(`http://localhost:8080/users/${userName}/candidates/${id}`)
     }
 
     updateCandidate(userName,id, candidate) {
        return axios.put(`http://localhost:8080/users/${userName}/candidates/${id}`,candidate)
     }

     createCandidate(userName, candidate) {
        return axios.post(`http://localhost:8080/users/${userName}/candidates`,candidate)
     }

}

export default new CandidatesDataService();