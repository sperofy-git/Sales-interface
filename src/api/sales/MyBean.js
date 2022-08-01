import axios from "axios";

class MyBean {

    executeMyBean() {
       return axios.get('http://localhost:8080/my-bean/path-variable/Srirama')
    }

    executeHello() {
        return axios.get('http://localhost:8080/hello')
     }

}

export default new MyBean();