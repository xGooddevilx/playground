import { CirclePlusIcon, EditIcon, TrashIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import {
	Button,
	Stack,
	Offcanvas,
	Form,
	ListGroup,
	Row,
	Col,
	Container,
} from "react-bootstrap";

type Recipe = {
	name: string;
	ingredients: string;
};

function App() {
	const [showForm, setShowForm] = useState<boolean>(false);
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [formData, setFormData] = useState<Recipe>({
		name: "",
		ingredients: "",
	});

	const handleShow = () => setShowForm(true);
	const handleClose = () => {
		setShowForm(false);
		setFormData({ name: "", ingredients: "" });
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!formData.name || !formData.ingredients) return;

		setRecipes(prev => [...prev, formData]);
		handleClose();
	};

	const handleDelete = (index: number) => {
		const updated = recipes.filter((_, i) => i !== index);
		setRecipes(updated);
	};

	const hasItems = recipes.length === 0;
	return (
		<div>
			<Stack
				direction="horizontal"
				className="p-3 bg-primary text-white justify-content-between"
			>
				<h1 className="mb-0">NodeFood</h1>
				<Button variant="light" onClick={handleShow}>
					<CirclePlusIcon className="me-2" />
					Add Recipe
				</Button>
			</Stack>
			<Container>
				<div className="p-3">
					{hasItems ? (
						<p className="text-muted text-center">No recipes yet.</p>
					) : (
						<ListGroup>
							{recipes.map((recipe, index) => (
								<ListGroup.Item key={index}>
									<Row className="align-items-center">
										<Col>
											<strong>{recipe.name}</strong>
											<br />
											<small>{recipe.ingredients}</small>
										</Col>
										<Col xs="auto">
											<Button
												variant="outline-secondary"
												size="sm"
												className="me-2"
											>
												<EditIcon />
											</Button>
											<Button
												variant="outline-danger"
												size="sm"
												onClick={() => handleDelete(index)}
											>
												<TrashIcon />
											</Button>
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					)}
				</div>
			</Container>

			<Offcanvas show={showForm} onHide={handleClose} placement="end">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Add Recipe</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter recipe name"
								name="name"
								value={formData.name}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Ingredients</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								placeholder="List ingredients"
								name="ingredients"
								value={formData.ingredients}
								onChange={handleChange}
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Save Recipe
						</Button>
					</Form>
				</Offcanvas.Body>
			</Offcanvas>
		</div>
	);
}

export default App;
