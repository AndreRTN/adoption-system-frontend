import { useState, ChangeEvent, FormEvent } from "react";
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import IAnimalRequestData from "../types/IAnimalRequestData";
import AnimalService from "../services/AnimalService";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Modal, Spinner } from "react-bootstrap";  
import { format } from "date-fns"; 
  
interface Errors {
    name?: string;
    description?: string;
    urlImage?: string;
    category?: string;
    currentBirthDate?: string;
    status?: string;
  }


function RegisterScreen() {

    const [formData, setFormData] = useState<IAnimalRequestData>({
        name: "",
        description: "",
        urlImage: "",
        category: "",
        birthDate: "",
        currentBirthDate: null,
        status: ""
      });
    
      const [errors, setErrors] = useState<Errors>({});
      const [loading, setLoading] = useState(false);
      const [showLoadingModal, setShowLoadingModal] = useState(false);

const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      category: value
    }));
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      status: value
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prevData) => ({
      ...prevData,
      currentBirthDate: date
    }));
  };

  const changeLoading = (show: boolean) => {
    setLoading(show)
    setShowLoadingModal(show)
  }
  const validateForm = (data: IAnimalRequestData): Errors => {
    const errors: Errors = {};
    if (!data.name || data.name.length < 2 || data.name.length > 30) {
      errors.name = "Nome deve ter entre 2 a 30 caracteres.";
    }
    if (!data.description) {
      errors.description = "Descrição é obrigatória";
    }
    if (!data.urlImage) {
      errors.urlImage = "URL da imagem é obrigatória.";
    }
    if (!data.category) {
      errors.category = "Categoria é obrigatória.";
    }
    if (!data.currentBirthDate) {
      errors.currentBirthDate = "Data de nascimento é obrigatória.";
    }
    if (!data.status) {
      errors.status = "Status é obrigatório.";
    }
    return errors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    
    if (Object.keys(validationErrors).length === 0) {
        
     changeLoading(true)
      console.log("Form Submitted:", formData);
      const formDataToSend: IAnimalRequestData = {
        ...formData,
        birthDate: formData.currentBirthDate ? format(formData.currentBirthDate, "dd/MM/yyyy") : "" 
      }
      AnimalService.create(formDataToSend).then((response: any) => {
       
        toast.success("Animal cadastrado com sucesso!"); 
        console.log("Response: ", response.data)
      }).catch((e: Error) => {
        toast.error("Erro ao cadastrar o animal.");
        console.log("Error:", e)
      }
      ).finally(() => changeLoading(false))

    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
    <Form onSubmit={handleSubmit} className="container mt-4">
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={(event) => handleChange(event as any)}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formDescription">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={formData.description}
            onChange={(event) => handleChange(event as any)}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formUrlImage">
          <Form.Label>URL da imagem</Form.Label>
          <Form.Control
            type="url"
            name="urlImage"
            value={formData.urlImage}
            onChange={(event) => handleChange(event as any)}
            isInvalid={!!errors.urlImage}
          />
          <Form.Control.Feedback type="invalid">
            {errors.urlImage}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formCategory">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={formData.category}
            onChange={(event) => handleCategoryChange(event as any)}
            isInvalid={!!errors.category}
          >
            <option value="">Seleciona a categoria</option>
            <option value="DOG">Cão</option>
            <option value="CAT">Gato</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.category}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formBirthDate">
          <Form.Label style={{color: errors.currentBirthDate && "red"}}>Data de nascimento</Form.Label>
          <InputGroup>
            <DatePicker
              
              selected={formData.currentBirthDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className="form-control"
            />
          </InputGroup>
         
        </Form.Group>
        
      </Row>



      <Row className="mb-3">
        <Form.Group as={Col} controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={formData.status}
            onChange={(event) => handleStatusChange(event as any)}
            isInvalid={!!errors.status}
          >
            <option value="">Selecione o status</option>
            <option value="AVAILABLE">Disponível</option>
            <option value="ADOPTED">Adotado</option>
          </Form.Control>
         
        </Form.Group>

        
      </Row>

      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>

    {/* Modal de Carregamento */}
    <Modal show={showLoadingModal} backdrop="static" keyboard={false} centered>
        <Modal.Body className="text-center">
          <Spinner animation="border" />
          <p>Carregando...</p>
        </Modal.Body>
      </Modal>

      
      <ToastContainer />
  
    </>
    
  )
}

export default RegisterScreen