import http from "../api/http-common";
import IAnimalResponseData from "../types/IAnimalResponseData";
import IAnimalRequestData from "../types/IAnimalRequestData";
class AnimalService {
  getAll() {
    return http.get<Array<IAnimalResponseData>>("/animals");
  }

  get(id: string) {
    return http.get<IAnimalRequestData>(`/animals/${id}`);
  }

  create(animal: IAnimalRequestData) {
    return http.post<IAnimalResponseData>("/animals/create", animal);
  }

  updateStatus(id: number, status: {status: string}) {
    return http.patch<any>(`/animals/${id}/status`, status);
  }
}

export default new AnimalService();