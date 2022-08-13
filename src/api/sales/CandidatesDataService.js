import axios from "axios";
import { API_URL } from "../../components/sales/common/Constants";

class CandidatesDataService {

    executeAllCandidatesDS(userName) {
        return axios.get(`${API_URL}/users/${userName}/all_listCandidates`)
     }

     getCandidateService(userName,id) {
        return axios.get(`${API_URL}/users/${userName}/candidates/${id}`)
     }

     removeCandidate(userName,id) {
        return axios.delete(`${API_URL}/users/${userName}/candidates/${id}`)
     }
 
     updateCandidate(userName,id, candidate) {
        return axios.put(`${API_URL}/users/${userName}/candidates/${id}`,candidate)
     }

     createCandidate(userName, candidate) {
        return axios.post(`${API_URL}/users/${userName}/candidates`,candidate)
     }

}

export default new CandidatesDataService();