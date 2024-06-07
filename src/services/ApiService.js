import RestService, {URLS} from "./RestService";

class ApiService {

    static async getTestProducts() {
        try {
            return await RestService.ajax(
                `${URLS.testproducts}`,
                "GET",
                null,
                null
            );
        } catch (error) {
            console.error("Failed to fetch classroom adaptation:", error);
        }
    }


}

export default ApiService;