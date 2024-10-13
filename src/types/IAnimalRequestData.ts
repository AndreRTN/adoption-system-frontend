export default interface IAnimalRequestData {
    name: string,
    description: string,
    urlImage: string,
    category: string,
    birthDate: string,
    currentBirthDate: Date | null
    status: string,
  }