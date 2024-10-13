import React, { useEffect, useState } from "react";
import { Row, Col, Card, Image, Accordion, Modal, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import AnimalService from "../services/AnimalService";
import IAnimalResponseData from "../types/IAnimalResponseData";

const AnimalList: React.FC = () => {
  const [animals, setAnimals] = useState<IAnimalResponseData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showLoadingModal, setShowLoadingModal] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnimals = async () => {
       
      try {
        const response = await AnimalService.getAll();
        console.log("Response: ", response)
        if (response.data.length === 0) {
            toast.warn("Nenhum animal encontrado!");
        }
        setAnimals(response.data);
      } catch (error) {
        toast.error("Erro ao carregar os animais!");
        console.error("Erro ao carregar os animais:", error);
      } finally {
        setLoading(false);
        setShowLoadingModal(false);
      }
    };

    fetchAnimals();
  }, []);

  const handleStatusChange = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "AVAILABLE" ? "ADOPTED" : "AVAILABLE";
    try {
      const response = await AnimalService.updateStatus(id, {status: newStatus});
      if (response.status === 200) {
        setAnimals((prevAnimals) =>
          prevAnimals.map((animal) =>
            animal.id === id ? { ...animal, status: newStatus } : animal
          )
        );
        toast.success(`Status alterado para ${newStatus === "AVAILABLE" ? "Disponível" : "Adotado"}`);
      }
    } catch (error) {
      toast.error("Erro ao alterar o status do animal!");
      console.error("Erro ao alterar o status:", error);
    }
  };

  return (
    <div className="container mt-4">
      <Modal show={showLoadingModal} centered>
        <Modal.Body className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Carregando...</p>
        </Modal.Body>
      </Modal>

      <Row>
        {animals.map((animal) => (
          <Col key={animal.id} md={4} className="mb-4">
            <Card>
              <Card.Header>
                <Row>
                  <Col md={8}>
                    <Card.Title>{animal.name} ({animal.age == 0 ? 1 : animal.age} {animal.age > 1 ? "Anos" : "Ano"})</Card.Title>
                  </Col>
                  <Col md={4} className="text-end">
                    <input
                      type="checkbox"
                      checked={animal.status === "ADOPTED"}
                      onChange={() => handleStatusChange(animal.id, animal.status)}
                    />
                    <span>Adotado</span>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Image src={animal.urlImage} alt={animal.name} rounded fluid />
                <Accordion defaultActiveKey="0" className="mt-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Informações do Animal</Accordion.Header>
                    <Accordion.Body>
                      <p><strong>Categoria:</strong> {animal.category === "CAT" ? "Gato" : "Cão"}</p>
                      <p><strong>Data de Nascimento:</strong> {animal.birthDate}</p>
                      <p><strong>Status:</strong> {animal.status === "AVAILABLE" ? "Disponível" : "Adotado"}</p>
                      <p><strong>Descrição:</strong> {animal.description}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <ToastContainer  />
    </div>
  );
};

export default AnimalList;
